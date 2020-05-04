const CW = 630
const CH = 810
let x = 0;
let y = 0;
let s = 20;
// function preload() {
//   var font1 = loadFont('../fonts/FasterOne-Regular.ttf');
//   var font2 = loadFont('../fonts/Monoton-Regular.ttf');
//   var font3 = loadFont('../fonts/Righteous-Regular.ttf');
//   var font4 = loadFont('../fonts/Haarlem Deco DEMO.ttf');
//   var font5 = loadFont('../fonts/StiffStaff-Heavy.ttf');
//   //var font6 = loadFont('../fonts/Bazar.ttf');

//   fonts.push(font1,font2,font3,font4,font5)
// }
var tri = 0;

function setup() {
    createCanvas(CW,CH) 
    var button = createButton('Generate')
    button.parent(container)
    button.mousePressed(draw)
    var container = createDiv()
    var svgbtn = createButton('Print')
    svgbtn.parent(container)
    svgbtn.mousePressed(saveSVG)
    angleMode(DEGREES)
    rectMode(CENTER)
}


function draw() {

    noStroke()
    background(150)
    fill(0)
    tri = random(500)
    triangle(30, 75, 58, 20, 86, 75)
    fill('red')
    push()
    translate(50, 0)
    rotate(180)
    triangle(30, 75, 58, 20, 86, 75)
    pop()

    // for (var x = 0; x < width; x = x + 90) {
    //     rect(x, 0, random(100), height);
    //     push()
    //     blendMode(SCREEN)
    //     fill('red')
    
    //     ellipse(width/2, height/2, random(500))
    //     pop()
    // }

    noLoop()

        // stroke(255)
        // x = 0;
        // y = 0;
        // let c_s = palette();
        // let c_a = c_s[0];
        // let c_b = c_s[1];
        // background(c_a);
        // let n = Math.ceil(((document.documentElement.clientWidth + s) / s) * ((document.documentElement.clientHeight + s) / s));
        // for (let i = 0; i < n; i++) {
        //     stroke(c_b);
        //     if (random(1) < 0.5) {
        //         line(x,y,x+s,y+s);			
        //     } else {
        //         line(x,y+s,x+s,y);
        //     }
        //     x += s;
        //     if (x > width) {
        //         x = 0
        //         y += s;
        //     }
        // }


    // if (x > width && y > height) {
    //noLoop()
    // }

    function saveSVG() {
        save("test.svg");
        }

}
