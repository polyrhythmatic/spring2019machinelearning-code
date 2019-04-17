var tsne;
var positions;
var features;
var fileNames;

function preload() {

  features = loadJSON("features.json");
  fileNames = loadJSON("files.json");

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
  noLoop();
  noCanvas();

  trainTsne();
}

function trainTsne() {
  tsne.init({
    data: features[0],
    type: 'dense'
  });
  tsne.run()
  positions = tsne.getOutputScaled();
  saveJSON([positions], "positions.json")
}

function draw() {
}