let video;
let yolo;
let status;
let objects = [];

var charRNN;
var textInput;
var lengthSlider;
var tempSlider;
var generate;
var output;
var lengthLabel;
var tempLabel;
var txt;

var isDrawing = true;

function setup() {
  createCanvas(320, 240);
  charRNN = ml5.charRNN('../models/woolf/', modelReady);

  lengthLabel = createP()
  lengthSlider = createSlider(10, 500, 100, 1);
  lengthSlider.input(updateSliders);

  tempLabel = createP();
  tempSlider = createSlider(0, 2, 0.5, 0.01)
  tempSlider.input(updateSliders);

  generate = createButton("Generate");
  generate.mousePressed(generateText);

  createP("Output:");
  output = createDiv();
  updateSliders();

  video = createCapture(VIDEO);
  video.size(320, 240);

  yolo = ml5.YOLO(video, startDetecting);

  video.hide();
}

function updateSliders() {
  lengthLabel.html("Length: " + lengthSlider.value());
  tempLabel.html("Temperature: " + tempSlider.value());
}

function modelReady() {
  console.log("Model is ready!");
}

function draw() {
  if(isDrawing) {
    image(video, 0, 0, width, height);
    for (let i = 0; i < objects.length; i++) {
      noStroke();
      fill(0, 255, 0);
      text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);
      noFill();
      strokeWeight(4);
      stroke(0, 255, 0);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
  }
}

function generateText() {
  console.log("Generating...")

  if(objects.length > 0) {
    isDrawing = false;
    for(var i = 0; i < objects.length; i ++) {
      if(i === 0){
        txt = "i see a ";
      } else {
        txt += "and a ";
      }
      txt += objects[i].label + " ";
    }

    var data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    charRNN.generate(data, gotData);
  }
}

function gotData(err, result) {
  if(err) {
    console.log(err);
  } else {
    console.log("Done!");
    output.html(txt + result.sample);
  }
}

function startDetecting() {
  console.log("YOLO model is loaded!")
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}
