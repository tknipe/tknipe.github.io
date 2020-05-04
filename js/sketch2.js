const CW = 400
const CH = 400
var inc = 0.1
var scl = 10
var cols, rows;
var fr;
var zoff = 0

var particles = [];

var flowfield = [];

function setup() {
  createCanvas(CW, CH)
  cols = floor(width/scl)
  rows = floor(height/scl)
  fr = createP('')

  flowfield = new Array(cols * rows)

  for (var i = 0; i < 10000; i++) {
  particles[i] = new Particle()
  }
  background(230)
}
function draw() {

  var yoff = 0
  for (var y = 0;y < rows; y++) {
    var xoff = 0
    for (var x = 0;x < cols; x++) {
      var index = (x + y * cols)
      flowfield[index] = v;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4
      var v = p5.Vector.fromAngle(angle)
      v.setMag(5)
      xoff += inc
      stroke(0,50)
      strokeWeight(1)
      // push()
      //   translate(x*scl, y*scl)
      //   rotate(v.heading())
      //   line(0,0,scl,0)
      // pop()

    }
    yoff += inc
    zoff += 0.0002
  }
  for (var i = 0; i < particles.length; i++){
  particles[i].follow(flowfield)
  particles[i].update()
  particles[i].show()
  particles[i].edges()
  }
  //noLoop()
  fr.html(floor(frameRate()))
}