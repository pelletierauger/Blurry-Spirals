let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let positive = true;

// a shader variable
let texcoordShader;

function preload() {
    // load the shader
    texcoordShader = loadShader('texcoord.vert', 'texcoord.frag');
}

function setup() {
    // shaders require WEBGL mode to work
    pixelDensity(1);
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowHeight, WEBGL);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(20);
    noStroke();
    // noLoop();
}


// if ((mouseX >= zoneX) !== inZone) {
//     inZone = (mouseX >= zoneX);
// }
let intensity;

function draw() {
    // shader() sets the active shader with our shader
    if (frameCount % 2 == 0) {
        intensity = Math.sin(frameCount * 0.01);

        if ((intensity > 0) !== positive) {
            positive = (intensity > 0);
            console.log("Changed!");
            let har = (positive) ? 0 : -2;
            socket.emit('supercollider', {
                name: "/har",
                value: har
            });
        }
        // console.log(intensity);
        intensity = Math.abs(intensity);
        intensity = map(intensity, 0.007, 1, 0.005, 0.015);
        intensity = constrain(intensity, 0.005, 0.015);
        let loc = Math.floor(map(intensity, 0.005, 0.015, 400000, 350000));
        socket.emit('supercollider', {
            name: "/loc",
            value: loc
        });
        // intensity = Math.abs(intensity) * 0.1;
        socket.emit('supercollider', {
            name: "/intensity",
            value: intensity
        });
    }
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
    if (key == 'p' || key == 'P') {
        frameExport();
    }
}