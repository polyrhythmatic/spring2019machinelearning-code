var model;
var previous_pen = "down";
var x, y;
var strokePath;
var seedStrokes = [];
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var canvas;

function setup() {
  // Button to start drawing
  var clear = createButton("Clear");
  clear.mousePressed(clearDrawing);

  // Button to start generating
  var startSketch = createButton("Start");
  startSketch.mousePressed(startDrawing);

  canvas = createCanvas(640, 480);
  canvas.style("display", "block");
  background(220);

  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  // The last argument is "load large model" - false loads the small model, true loads the large
  model = ml5.sketchRNN("the_mona_lisa", modelReady, true);

  // Keep track of whether or not the canvas is being drawn on
  canvas.mousePressed(function() {
    isDrawing = true;
  })
  canvas.mouseReleased(function() {
    isDrawing = false;
    lastX = mouseX;
    lastY = mouseY;
  });
}

function modelReady() {
  console.log("Model is ready!");
}

function clearDrawing() {
  background(220);
  // clear seed strokes
  seedStrokes = [];
  // Reset model
  model.reset();
}

function startDrawing() {
  // Start where the mouse left off
  x = lastX;
  y = lastY;
  // Generate with the seedStrokes
  model.generate(seedStrokes, gotStroke);
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}

function draw() {
  // If the mouse is pressed capture the user strokes 
  if (isDrawing) {
    // Draw line
    stroke(0);
    strokeWeight(3.0);
    line(pmouseX, pmouseY, mouseX, mouseY);
    // Create a "stroke path" with dx, dy, and pen
    var userStroke = {
      dx: mouseX - pmouseX,
      dy: mouseY - pmouseY,
      pen: "down"
    };

    seedStrokes.push(userStroke);
  }

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
      model.generate(gotStroke);
    }
  }
}