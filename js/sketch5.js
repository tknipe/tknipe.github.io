const CW = 630
const CH = 810
var palette = [0]
var test = [ [1,2,3,4], [5,6,7,8] ]
var randcol = ''
let fonts = [];

var txtinput = 'The future is retro'
var txtarea = ''
var pdf;
let loopval = 0;
let randval;
//let randomizer;
let loopslider;
let slider1;
let slider2;
let sentence = "The future is retro"
function preload() {
  var font1 = loadFont('../fonts/FasterOne-Regular.ttf');
  var font2 = loadFont('../fonts/Monoton-Regular.ttf');
  var font3 = loadFont('../fonts/Righteous-Regular.ttf');
  var font4 = loadFont('../fonts/Haarlem Deco DEMO.ttf');
  var font5 = loadFont('../fonts/StiffStaff-Heavy.ttf');
  //var font6 = loadFont('../fonts/Bazar.ttf');

  fonts.push(font1,font2,font3,font4,font5)
}

function setup() {
    var maincontain = document.getElementById('maincontain')
    createCanvas(CW,CH, SVG)
    maincontain.appendChild(document.getElementById('defaultCanvas0'))
    //canva.id('canvad')
    //maincontain.appendChild(document.getElementById('canvas'))
    // console.log(palette)
    // console.log(test)
    //console.log(String(palette[4]))


    var container = createDiv()
    container.parent(maincontain)
    container.id('container')
    txtarea = createElement('textarea', sentence)
    txtarea.parent(container)
    var randval = createButton('🎲')
    randval.parent(container)
    randval.mousePressed(randomizer)
    var button = createButton('Generate')
    button.parent(container)
    button.mousePressed(draw)
    var svgbtn = createButton('Print')
    svgbtn.parent(container)
    svgbtn.mousePressed(saveSVG)
    let slidercontainer = createDiv()
    slidercontainer.id('slcontainer')
    slidercontainer.parent(container)

    var lslabel = createP('Loop Speed')
    lslabel.parent(slidercontainer)
    lslabel.style('margin-top', '32px')
    loopslider = createSlider(0, 10, 0);
    loopslider.parent(slidercontainer)

    var s1label = createP('Font size')
    s1label.parent(slidercontainer)
    s1label.style('margin-top', '32px')
    slider1 = createSlider(24, 256, 100);
    slider1.parent(slidercontainer)
    slider1.id('slidey1')
    
    var s2label = createP('# of shapes')
    s2label.parent(slidercontainer)
    s2label.style('margin-top', '32px')
    slider2 = createSlider(0, 16, 4);
    slider2.parent(slidercontainer)
    slider2.id('slidey2')

    var s3label = createP('Font (Left = random)')
    s3label.parent(slidercontainer)
    s3label.style('margin-top', '32px')
    slider3 = createSlider(-1, floor(fonts.length), -1);
    slider3.parent(slidercontainer)
    slider3.id('slidey3')

    // pdf = createPDF();
    // pdf.beginRecord();


    // var pdfbtn = createButton('Print')
    // pdfbtn.mousePressed(pdf.save())



    // print( 32 * (pow(1.6, -2)) )
    // print( 32 * (pow(1.6, -2.5)) )
    // print( 48 * (pow(1.6, -3)) )
    // print( 64 * (pow(1.6, -4)) )
    // print( 86 * (pow(1.6, -4)) )
    // print( 112 * (pow(1.6, -5)) )
    // print( 148 * (pow(1.6, -6)) )
    // print( 196 * (pow(1.6, -6.5)) )
    // print( 256 * (pow(1.6, -7)) )
}

function randomizer() {
    txtarea.value(sentenceArray[floor(random()*sentenceArray.length)])
    slider1.value(random(24,256)) 
    slider2.value(random(0,16)) 
}
function draw() {

    txtinput = txtarea.value()
    var palette = pals[floor(random()*pals.length)]
    background(palette[floor(random()*palette.length)])
    //var txtsize = random(24,256)
    let val1 = slider1.value();
    var txtsize = val1

    var powfac = 1;
    var powlac = 1;
    if (txtsize <= 32) { powfac = 6.5; powlac = -2; 
    } else if (txtsize > 32 && txtsize <= 48) { powfac = 6; powlac = -3;
    } else if (txtsize > 48 && txtsize <= 64) { powfac = 5; powlac = -4;
    } else if (txtsize > 64 && txtsize <= 86) { powfac = 4; powlac = -4;
    } else if (txtsize > 86 && txtsize <= 112) { powfac = 4; powlac = -5;
    } else if (txtsize > 112 && txtsize <= 148) { powfac = 3; powlac = -6;
    } else if (txtsize > 148 && txtsize <= 196) {powfac = 2.5; powlac = -6.5;
    } else if (txtsize > 196 && txtsize <= 256) { powfac = 2; powlac = -7;
    } 
    print(txtsize)
    print(powfac)
    print(powlac)
    


    let val2 = slider2.value()
    // for (var i = 0; i < random(4); i++) {
    for (var i = 0; i < random(val2); i++) {
    
    strokeWeight( floor(random(0,3)) )
    fill(palette[floor(random()*palette.length)])
    ellipse(random(width), random(height), txtsize * pow( 1.6, random(powlac, powfac) ))
    rect(random(width), random(height), txtsize * pow( 1.6, random(powlac, powfac) ), txtsize * pow( 1.6, random(powlac, powfac) ))
    }
    
    // for (var i = 0; i < random(1); i++) {

    //     beginShape();

    //     for (var i = 0; i < random(4); i++) {
        
    //         curveVertex(txtsize * pow( 1.6, random(powlac, powfac) ), txtsize * pow( 1.6, random(powlac, powfac) ));

    //     }
    //     endShape(CLOSE);

    // }
    //var txtfnt = fonts[floor(random()*fonts.length)]; 
    // = fonts[floor(random()*fonts.length)];
    rectMode(CORNERS)
    stroke(0)
    if (slider3.value() == -1) {
        txtfnt = fonts[floor(random()*fonts.length)]
    } else {
        txtfnt = fonts[floor(slider3.value())]
    }
    //console.log(txtfnt)

    if( txtsize <= 42) {
        strokeWeight(2)
    }
    else if( txtsize <=64) {
        strokeWeight(3)
    }
    else {
        strokeWeight(4)
    }
    textFont(txtfnt)

    textSize(txtsize)
    var wt = random(width)
    var ht = random(height)
    var xt = random(width-wt)
    var yt = random(height-ht)
    //console.log(wt,ht,xt,yt)  

    text(txtinput, xt , yt, wt, ht)
    frameRate(loopval)
    loopslider.changed(loopdedoop)
    function loopdedoop(){
    loopval = loopslider.value()
    frameRate(loopval)
    }


    // if (loopval = 0) {
    //     //noLoop()
    //     framerate(0)
    // } else {
    //     //loop()
    //     frameRate(loopval)
    // }
    //frameRate(0)
    // noLoop()
    //save("mySVG.svg");
    // if (frameCount == 1) {
    //     noLoop();
    //     pdf.save();
    // }

    function saveSVG() {
        save("test.svg");
        }
    // function printPDF() {
    //     pdf.save();
    //     }

}
