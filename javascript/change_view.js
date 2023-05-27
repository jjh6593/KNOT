let home = document.getElementById("home");
let web_console = document.getElementById("web_console");
let reference = document.getElementById("reference");
let about = document.getElementById("about");
function show_home() {
    home.style.display = "flex";
    web_console.style.display = "none";
    reference.style.display = "none";
    about.style.display = "none";
}

function show_console() {
    home.style.display = "none";
    web_console.style.display = "flex";
    reference.style.display = "none";
    about.style.display = "none";
}

function show_reference() {
    home.style.display = "none";
    web_console.style.display = "none";
    reference.style.display = "flex";
    about.style.display = "none";
}

function show_about() {
    home.style.display = "none";
    web_console.style.display = "none";
    reference.style.display = "none";
    about.style.display = "block";

    initMap();
    loadMapScript();
}

function loadMapScript() {
	const mapScript = document.createElement("script");
	mapScript.src = "javascript/map_script.js";
	document.body.appendChild(mapScript);
}