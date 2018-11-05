let looping = true;

// a shader variable
let texcoordShader;

function preload() {
    // load the shader
    texcoordShader = loadShader('texcoord.vert', 'texcoord.frag');
}

function setup() {
    // shaders require WEBGL mode to work
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight, WEBGL);
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