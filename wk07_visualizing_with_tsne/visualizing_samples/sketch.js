var positions;
var fileNames;
var sounds = [];
var radius = 5;

function preload() {
  positions = loadJSON("positions.json");
  fileNames = loadJSON("files.json", function(){
    for(var i = 0; i < fileNames[0].length; i ++) {
      sounds.push(loadSound(fileNames[0][i]));
    }
    console.log("Sounds loaded!")
  });

  console.log("JSON loaded!")
}

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  positions = positions[0];
}

function draw() {
  background(50);
  for(var i = 0; i < positions.length; i ++) {
    fill(255);
    var x = (positions[i][0] + 1) * width/2
    var y = (positions[i][1] + 1) * height/2;

    if(dist(mouseX, mouseY, x, y) < radius) {
      if(!sounds[i].isPlaying()) {
        sounds[i].play();
      }
      fill(255, 0, 0);
    }

    circle(x, y, 2* radius);
  }
}