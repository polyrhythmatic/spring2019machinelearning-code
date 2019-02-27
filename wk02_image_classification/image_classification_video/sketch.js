var classifier;
var video;

var thing = "";

function setup(){
  createCanvas(390, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  classifier = ml5.imageClassifier("MobileNet", video, modelReady);
}

function draw() {
  background(255);
  image(video, 0, 0)
  fill(255);
  textSize(32);
  text(thing, 10, 100)
}

function modelReady(){
  console.log("model is ready!")
  classifyVideo();
}

function classifyVideo(){
  classifier.predict(results);
}

function results(error, results){
  if(error) {
    console.log(error);
  } else {
    thing = results[0].className;
    classifyVideo();
  }
}