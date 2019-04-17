var images = [];
var tsne;
var positions;
var features;

function preload() {

  features = loadJSON("features.json");

  for(var i = 0; i < fileNames.length; i++) {
    var image = createImg(fileNames[i]).hide();
    images.push(image);
  }

  tsne = new TSNE({
    dim: 2,
    perplexity: 30.0,
    earlyExaggeration: 4.0,
    learningRate: 100.0,
    nIter: 100,
    metric: 'euclidean'
  });
  console.log("loaded!")
}

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  trainTsne();
}

var train = false;
function trainTsne() {
  tsne.init({
    data: features[0],
    type: 'dense'
  });
  tsne.run()
  positions = tsne.getOutputScaled();
}

var count = 0;
function draw() {
  if(positions) {
    background(50);
    for(var i = 0; i < positions.length; i ++) {
      fill(255);
      var x = (positions[i][0] + 1) * width/2
      var y = (positions[i][1] + 1) * height/2;

      image(images[i], x, y, 20, 15);
      // circle(positions[i][0], positions[i][1], 10);
    }
  }
}