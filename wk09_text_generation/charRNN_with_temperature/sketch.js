var charRNN;
var textInput;
var lengthSlider;
var tempSlider;
var generate;
var output;
var lengthLabel;
var tempLabel;
var txt;

function setup() {
  noCanvas();
  
  charRNN = ml5.charRNN('../models/woolf/', modelReady);

  lengthLabel = createP()
  lengthSlider = createSlider(10, 500, 100, 1);
  lengthSlider.input(updateSliders);

  tempLabel = createP();
  tempSlider = createSlider(0, 2, 0.5, 0.01)
  tempSlider.input(updateSliders);

  createP("Seed text:");
  textInput = createInput();

  // Create the LSTM Generator passing it the model directory

  generate = createButton("Generate");
  generate.mousePressed(generateText);

  createP("Output:");
  output = createDiv();
  updateSliders();
}

// Update the slider values
function updateSliders() {
  lengthLabel.html("Length: " + lengthSlider.value());
  tempLabel.html("Temperature: " + tempSlider.value());
}

function modelReady() {
  console.log("Model is ready!");
}

function generateText() {
  console.log("Generating...")

  var original = textInput.value();
  txt = original.toLowerCase();

  if (txt.length > 0) {
    var data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    charRNN.generate(data, gotData);
  }
}

function gotData(err, result) {
  if(err) {
    console.log(err);
  } else {
    console.log("Done!");
    output.html(txt + result.sample);
  }
}