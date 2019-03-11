var video;
var featureExtractor;
var knnClassifier = ml5.KNNClassifier();

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);

  select("#addClassOne").mousePressed(function() {
    addExample("One");
  });

  select("#addClassTwo").mousePressed(function() {
    addExample("Two");
  });

  select("#addClassThree").mousePressed(function() {
    addExample("Three");
  });

  select("#buttonPredict").mousePressed(classify);
}

function draw() {
  image(video, 0, 0);
}

function modelReady() {
  console.log("Model is ready!");
}

function addExample(label) {
  var features = featureExtractor.infer(video);
  knnClassifier.addExample(features, label);
  console.log(knnClassifier.getCountByLabel());
}

function classify() {
  const features = featureExtractor.infer(video);
  knnClassifier.classify(features, gotResults);
}

function gotResults(err, result) {
  if(err) {
    console.error(err);
  }
  if(result.confidencesByLabel) {
    console.log(result.confidencesByLabel);
  }
  classify();
}