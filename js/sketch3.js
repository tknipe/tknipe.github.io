//const CW = 630
//const CH = 810
var palette = [0]
var randcol = ''
let fonts = [];
// var pdf;
var txtinput = 'The future is retro'
var txtarea = ''
let loopval = 0;
let randval;
let loopslider;
let slider1;
let slider2;
let sentence = "The future is retro"
function preload() {
  var font1 = loadFont('../css/fonts/FasterOne-Regular.ttf');
  var font2 = loadFont('../css/fonts/Monoton-Regular.ttf');
  var font3 = loadFont('../css/fonts/Righteous-Regular.ttf');
  var font4 = loadFont('../css/fonts/Haarlem Deco DEMO.ttf');
  var font5 = loadFont('../css/fonts/StiffStaff-Heavy.ttf');
  fonts.push(font1,font2,font3,font4,font5)
}

function setup() {
    pixelDensity(1)
    //find DOM containers and set dimensions to the canvas container
    var maincontain = document.getElementById('maincontain')
    var CW = document.getElementById('canvascontainer').offsetWidth
    var CH = document.getElementById('canvascontainer').offsetHeight 
    var container = document.getElementById('container')
    //textbox
    txtarea = createElement('textarea', sentence)
    txtarea.parent(container)
    txtarea.style('width','100%')
    txtarea.style('height','12rem')
    //control buttons
    var btncontainer = createDiv()
    btncontainer.id('btncontainer')
    btncontainer.parent(container)
    var randval = createButton('🎲')
    randval.id('randval')
    randval.parent(btncontainer)
    randval.mousePressed(randomizer)
    var button = createButton('Generate')
    button.id('generate')
    button.parent(btncontainer)
    button.mousePressed(draw)
    var svgbtn = createButton('Print')
    svgbtn.parent(btncontainer)
    svgbtn.mousePressed(saveSVG)
    //sliders &
    let slidercontainer = createDiv()
    slidercontainer.id('slcontainer')
    slidercontainer.parent(container)
    var lslabel = createP('Loop Speed')
    lslabel.parent(slidercontainer)
    lslabel.style('margin-top', '0')
    lslabel.class('sliderlabel')
    loopslider = createSlider(0, 10, 0);
    loopslider.parent(slidercontainer)

    var s1label = createP('Font size')
    s1label.parent(slidercontainer)
    s1label.style('margin-top', '32px')
    s1label.class('sliderlabel')
    slider1 = createSlider(24, 256, 100);
    slider1.parent(slidercontainer)
    slider1.id('slidey1')
    
    var s2label = createP('# of shapes')
    s2label.parent(slidercontainer)
    s2label.style('margin-top', '32px')
    s2label.class('sliderlabel')
    slider2 = createSlider(0, 16, 4);
    slider2.parent(slidercontainer)
    slider2.id('slidey2')

    var s3label = createP('Font (Left = random)')
    s3label.parent(slidercontainer)
    s3label.style('margin-top', '32px')
    s3label.class('sliderlabel')
    slider3 = createSlider(-1, floor(fonts.length)-1, -1);
    slider3.parent(slidercontainer)
    slider3.id('slidey3')
    //canvas creation and append to container
    var canvascontainer = document.getElementById('canvascontainer')
    createCanvas(CW,CH, SVG)

    canvascontainer.appendChild(document.getElementById('defaultCanvas0'))
    //pdf(doesn't work atm)
    // pdf = createPDF();
    // pdf.beginRecord();
}
function randomizer() {
    txtarea.value(sentenceArray[floor(random()*sentenceArray.length)])
    slider1.value(random(24,256)) 
    slider2.value(random(0,16)) 
}
function windowResized() {
    resizeCanvas(document.getElementById('canvascontainer').offsetWidth, document.getElementById('canvascontainer').offsetHeight);
  }
function draw() {
    //set text from the textarea input
    txtinput = txtarea.value()
    //choose palette & use to set bg 
    var palette = pals[floor(random()*pals.length)]
    background(palette[floor(random()*palette.length)])
    ////var txtsize = random(24,256)
    //set text size to slider value
    let val1 = slider1.value();
    var txtsize = val1
    //all shapes are scaled at a golden ratio (*1.6ish) to the text
    //this mess works out the range of "power factors" each group of text size can scale the shapes by (so that its not < ~10 or > ~650) 
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
    //range of # of shapes decided by green slider
    let val2 = slider2.value()
    //// for (var i = 0; i < random(4); i++) {
    //shape generation
    for (var i = 0; i < random(val2); i++) {
    //random stroke weight, color (from palette), size (determined by txt and powfac) 
    strokeWeight( floor(random(0,3)) )
    fill(palette[floor(random()*palette.length)])
    ellipse(random(width), random(height), txtsize * pow( 1.6, random(powlac, powfac) ))
    rect(random(width), random(height), txtsize * pow( 1.6, random(powlac, powfac) ), txtsize * pow( 1.6, random(powlac, powfac) ))
    }
    //font choice, if slider left its random or = slider value
    rectMode(CORNERS)
    stroke(0)
    if (slider3.value() == -1) {
        txtfnt = fonts[floor(random()*fonts.length)]
    } else {
        txtfnt = fonts[floor(slider3.value())]
    }
    //stroke weight (on txt) determined by text size
    if( txtsize <= 42) {
        strokeWeight(2)
    }
    else if( txtsize <=64) {
        strokeWeight(2)
    }
    else if (( txtsize > 64)) {
        strokeWeight(2)
    }
    textFont(txtfnt)
    //size of text box wrap
    textSize(txtsize)
    var wt = random(width)
    var ht = random(height)
    var xt = random(width-wt)
    var yt = random(height-ht)
    text(txtinput, xt , yt, wt, ht)
    //loop speed based on slider
    frameRate(loopval)
    loopslider.changed(loopdedoop)
    function loopdedoop(){
    loopval = loopslider.value()
    frameRate(loopval)
    }
    //export PDF (or SVG apparently)
    function saveSVG() {
        save();
        }

}
