var featureExtractor;
var classifier;
var upload;

var candidates = [];

function preload() {
  for(var i = 1; i < 6; i++ ) {
    var bernieImg = createImg("training_set/sanders/" + i + ".jpg").hide();
    var warrenImg = createImg("training_set/warren/" + i + ".jpg").hide();
    var bookerImg = createImg("training_set/booker/" + i + ".jpg").hide();
    var bidenImg = createImg("training_set/biden/" + i + ".jpg").hide();
    candidates.push({ image: bernieImg, name: "Bernie" })
    candidates.push({ image: warrenImg, name: "Warren" })
    candidates.push({ image: bookerImg, name: "Booker" })
    candidates.push({ image: bidenImg, name: "Biden" })
  }
}

function setup() {
  noCanvas();
  noLoop();

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  classifier = featureExtractor.classification();
  upload = select('#upload');
  upload.drop(gotFile);
}

function modelReady() {
  console.log("Model is ready!");
  addImage(0);
}

function addImage(count) {
  classifier.addImage(candidates[count].image, candidates[count].name, function(){
    if(count < candidates.length - 1) {
      addImage(count + 1)
    } else {
      console.log("All images added to classifier!")
      train();
    }
  });
}

function train() {
  classifier.train(function(lossValue) {
    if(lossValue) {
      console.log("Training - loss is : " + lossValue);
    } else {
      console.log("Done training!")
    }
  });
}

function gotFile(file) {
  var img = createImg(file.data);
  classifier.classify(img, gotResults);
}

function gotResults(err, result){
  if(err) {
    console.error(err);
  }
  console.log(result)
  if(result.confidencesByLabel) {
    console.log(result.confidencesByLabel);
  }
}

function draw() {

}