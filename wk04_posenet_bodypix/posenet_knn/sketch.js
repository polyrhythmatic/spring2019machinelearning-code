var video;
var poseNet;
var poses = [];
var knnClassifier = ml5.KNNClassifier();

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, "single", modelReady);

  poseNet.on("pose", function(results) {
    poses = results;
  });

  var buttonY = select("#addClassY");
  buttonY.mousePressed(function() {
    addExample("Y");
  });

  var buttonM = select("#addClassM");
  buttonM.mousePressed(function() {
    addExample("M");
  });

  var buttonC = select("#addClassC");
  buttonC.mousePressed(function() {
    addExample("C");
  });

  var buttonA = select("#addClassA");
  buttonA.mousePressed(function() {
    addExample("A");
  });

  var predict = select("#predict");
  predict.mousePressed(function() {
    classify("B");
  });
}

function modelReady() {
  console.log("Model is ready!");
}

function addExample(label) {
  // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
  var poseArray = []
  var poseKeypoints = poses[0].pose.keypoints;
  for(var i = 0; i < poseKeypoints.length; i ++) {
    poseArray.push([poseKeypoints[i].score, poseKeypoints[i].position.x, poseKeypoints[i].position.y]);
  }

  // Create a tensor2d from 2d array
  var logits = ml5.tf.tensor2d(poseArray);

  // Add an example with a label to the classifier
  knnClassifier.addExample(logits, label);
  // This prints out the number of classes we have per label
  console.log(knnClassifier.getCountByLabel())
}

function classify() {
  // Get the total number of classes from knnClassifier
  var numClasses = knnClassifier.getNumLabels();
  if (numClasses <= 0) {
    console.error("You haven't added any examples");
    return;
  }
  // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
  var poseArray = []
  var poseKeypoints = poses[0].pose.keypoints;
  for(var i = 0; i < poseKeypoints.length; i ++) {
    poseArray.push([poseKeypoints[i].score, poseKeypoints[i].position.x, poseKeypoints[i].position.y]);
  }

  // Create a tensor2d from 2d array
  var logits = ml5.tf.tensor2d(poseArray);

  // Use knnClassifier to classify which class do these features belong to
  // You can pass in a callback function `gotResults` to knnClassifier.classify function
  knnClassifier.classify(logits, gotResults);
}

function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }

  if (result.confidencesByLabel) {
    var confidences = result.confidencesByLabel;
    console.log(confidences);
  }

  classify();
}


function draw() {
  image(video, 0, 0);

  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (var i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    var pose = poses[i].pose;
    for (var j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      var keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (var i = 0; i < poses.length; i++) {
    var skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (var j = 0; j < skeleton.length; j++) {
      var partA = skeleton[j][0];
      var partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}