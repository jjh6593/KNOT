const express = require('express');
const socketio = require('socket.io');
const ssh2 = require('ssh2').Client;
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const server = require('http').createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static(__dirname + '/public'));
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist/')));

io.on('connection', (socket) => {
  let conn = new ssh2();
  
  socket.on('ssh-connect', (data) => {
    conn.connect({
      host: data.host,
      port: data.port,
      username: data.username,
      password: data.password
    });
  });

  conn.on('ready', () => {
    socket.emit('ssh-ready');
    
    conn.shell((err, stream) => {
      if (err) throw err;

      socket.on('ssh-command', (command) => {
        stream.write(command + '\n');
      });

      stream.on('data', (data) => {
        socket.emit('ssh-data', data.toString());
      });
    });
  });

  conn.on('error', (error) => {
    socket.emit('ssh-error', error);
  });

  conn.on('end', () => {
    socket.emit('ssh-end');
  });

  socket.on('disconnect', () => {
    conn.end();
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
