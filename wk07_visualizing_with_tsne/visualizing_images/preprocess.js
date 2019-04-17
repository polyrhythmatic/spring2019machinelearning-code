var images = [];
var features = [];
var featureExtractor;

function setup() {
  noCanvas();
  noLoop();

  for(var i = 0; i < fileNames.length; i++) {
    var image = createImg(fileNames[i]).hide();
    images.push(image);
  }
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);
}

function modelReady() {
  console.log("Model loaded!")
  getFeatures();
}


async function getFeatures() {
  for(var i = 0; i < images.length; i ++) {
    var feats = await featureExtractor.infer(images[i]).data();
    features.push(feats);
    console.log("processed number " + i);
  }
  for(var i = 0; i < features.length; i ++) {
    features[i] = Array.prototype.slice.call(features[i]);
  }
  saveJSON([features], "features.json");
  console.log("Features extracted!")
}