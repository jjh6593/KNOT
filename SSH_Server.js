var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ssh = require('ssh2').Client;

server.listen(22);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  var conn = new ssh();
  conn.on('ready', function() {
    socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
    conn.shell(function(err, stream) {
      if (err) return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
      socket.on('data', function(data) {
        stream.write(data);
      });
      stream.on('data', function(d) {
        socket.emit('data', d.toString('binary'));
      }).on('close', function() {
        conn.end();
      });
    });
  }).on('close', function() {
    socket.emit('data', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
  }).on('error', function(err) {
    socket.emit('data', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
  }).connect({
    host: 'SSH_SERVER', // Replace with your SSH server IP
    port: 22,
    username: 'SSH_USERNAME', // Replace with your SSH username
    password: 'SSH_PASSWORD' // Replace with your SSH password
  });
});

