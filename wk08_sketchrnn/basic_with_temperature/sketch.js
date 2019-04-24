var model;
var previous_pen = "down";
var x, y;
var strokePath;
var slider;

var options = {
  temperature: 0.65
}


function setup() {
  slider = createSlider(0, 2, .65, .1);
  slider.style("display", "block")

  slider.changed(function() {
    options.temperature = slider.value();
  });

  createCanvas(640, 480);
  background(220);
  // Load the model
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  // The last argument is "load large model" - false loads the small model, true loads the large
  model = ml5.sketchRNN("the_mona_lisa", modelReady, false);
}

// The model is ready
function modelReady() {
  console.log("Model is ready!")
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  background(220);
  // Start in the middle
  x = width / 2;
  y = height / 2;
  model.reset();
  // Generate the first stroke path
  model.generate(options, gotStroke);
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == "down") {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== "end") {
      strokePath = null;
      model.generate(options, gotStroke);
    } else {
      //if at the end of the drawing, start another one (loops infinitely)
      startDrawing();
    }
  }
}