let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";



// a shader variable
let texcoordShader;

function preload() {
    // load the shader
    texcoordShader = loadShader('texcoord.vert', 'functions.frag');
}

function setup() {
    socket = io.connect('http://localhost:8080');
    // shaders require WEBGL mode to work
    pixelDensity(1);
    // createCanvas(windowWidth, windowHeight, WEBGL);
    // cnvs = createCanvas(windowWidth, windowHeight, WEBGL);
    cnvs = createCanvas(windowHeight, windowHeight, WEBGL);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(20);
    noStroke();
    // noLoop();
}

function draw() {
    // shader() sets the active shader with our shader
    shader(texcoordShader);
    texcoordShader.setUniform('time', frameCount);
    // rect gives us some geometry on the screen
    rect(0, 0, width, height);
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
    if (key == 'r' || key == 'R') {
        window.location.reload();
    }
    if (key == 'p' || key == 'P') {
        frameExport();
    }
    if (key == 'm' || key == 'M') {
        redraw();
    }
}