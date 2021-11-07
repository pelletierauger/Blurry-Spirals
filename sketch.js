let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "/Volumes/Volumina/frames/phase-2/blurry-spirals/blurry-spirals";
let maxFrames = 700;

// a shader variable
let texcoordShader;

function preload() {
    // load the shader
    texcoordShader = loadShader('texcoord.vert', 'texcoord.frag');
}

function setup() {
    // shaders require WEBGL mode to work
    pixelDensity(1);
    // createCanvas(windowWidth, windowHeight, WEBGL);
    // pixelDensity(1);
    socket = io.connect('http://localhost:8080');
    // cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    cnvs = createCanvas(2560 * 0.5, 1440 * 0.5, WEBGL);
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
    if (key == 'm' || key == 'M') {
        redraw();
    }
}