var classifier = ml5.imageClassifier("MobileNet", modelLoaded);
var img;

function setup() {
  img = createImg("images/bread.jpg", imageLoaded);
  img.size(400, 400);
  noCanvas();
}

function draw() {
}

function imageLoaded() {
  console.log("I loaded the image!!");
  classifier.predict(img, results);
}

function modelLoaded(){
  console.log("Model is loaded!");
}

function results(error, results) {
  if(error){
    console.log(error);
  } else {
    select("#results").html(results[0].className);
  }

}