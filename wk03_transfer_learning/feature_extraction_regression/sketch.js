var featureExtractor;
var regressor;
var video;
var slider;
var samples = 0;

function setup() {
  createCanvas(340, 280);
  video = createCapture(VIDEO);
  video.hide();
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  regressor = featureExtractor.regression(video, videoReady);

  slider = select('#slider');

  select("#addSample").mousePressed(function() {
    regressor.addImage(slider.value());
    samples = samples + 1;
    console.log("Number of samples so far is " + samples)
  });

  select("#train").mousePressed(trainNetwork);
  select("#buttonPredict").mousePressed(predict);
}

function draw() {
  image(video, 0, 0, 340, 280);
}

function modelReady() {
  console.log("Model is loaded!");
}

function videoReady() {
  console.log("Video is ready!")
}

function trainNetwork() {
  regressor.train(function(lossValue) {
    if(lossValue) {
      console.log("Training - loss is : " + lossValue);
    } else {
      console.log("Done training!")
    }
  })
}

function predict() {
  regressor.predict(gotResults);
}

function gotResults(err, result) {
  if(err) {
    console.error(err);
  }
  slider.value(result);
  predict();
}