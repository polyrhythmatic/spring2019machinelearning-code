var video;
var poseNet;
var eyerX = 0;
var eyerY = 0;
var eyelX = 0;
var eyelY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, "single", modelReady);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  console.log(poses);
  if(poses.length > 0) {
    var elX = poses[0].pose.keypoints[1].position.x;
    var elY = poses[0].pose.keypoints[1].position.y;
    var erX = poses[0].pose.keypoints[2].position.x;
    var erY = poses[0].pose.keypoints[2].position.y;
    eyelX = lerp(eyelX, elX, 0.5);
    eyelY = lerp(eyelY, elY, 0.5);
    eyerX = lerp(eyerX, erX, 0.5);
    eyerY = lerp(eyerY, erY, 0.5);
  }
}

function modelReady() {
  console.log("Model is ready!");
}

function draw() {
  image(video, 0, 0);

  var d = dist(eyerX, eyerY, eyelX, eyelY);

  fill(0, 0, 255);
  ellipse(eyerX, eyerY, d);
  fill(255, 0, 0);
  ellipse(eyelX, eyelY, d);
}