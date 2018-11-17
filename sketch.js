let looping = true;

// a shader variable
let gl;
let shaderProgram;
let vertices;

// function preload() {
//     // load the shader
//     shaderProgram = loadShader('points.vert', 'points.frag');
// }

function setup() {
    // shaders require WEBGL mode to work
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight, WEBGL);
    gl = canvas.getContext('webgl');

    // gl.cbf = gl.getExtension('WEBGL_color_buffer_float') || gl.getExtension('EXT_color_buffer_float');
    // gl.tf = gl.getExtension('OES_texture_float');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    frameRate(20);
    noStroke();
    // noLoop();
    // vertices = [-0.5, 0.5, 0.0,
    //     0.0, 0.5, 0.0, -0.25, 0.25, 0.0,
    // ];
    vertices = [];
    for (let i = 0; i < 1000; i += 1) {
        let x = cos(i + 1) * i * 0.001225;
        let y = sin(i + 1) * i * 0.001225;
        vertices.push(x, y, 0.0);
    }

    // Create an empty buffer object to store the vertex buffer
    var vertex_buffer = gl.createBuffer();

    //Bind appropriate array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);



    /*=========================Shaders========================*/

    // vertex shader source code
    var vertCode = `
    attribute vec3 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    void main(void) {
        gl_Position = vec4(coordinates, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        gl_PointSize = 50.0;
    }`;



    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);

    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);

    // Compile the vertex shader
    gl.compileShader(vertShader);

    // fragment shader source code
    var fragCode = `
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;

    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // vec2 uv = gl_PointCoord.xy / vec2(1600, 1600);
        // float d = length(uv - center);
        // vec2 pos = myposition;

        vec2 uv = gl_FragCoord.xy / vec2(2560, 1600);
        // uv.x = uv.x + 1.0;
        uv = uv * 2.0;
        uv = uv + 0.5;
        // uv = uv * 1.0;
        

        float ALPHA = 0.75;

        vec2 pos = gl_PointCoord - vec2(0.5, 0.5);
        float dist_squared = dot(pos, pos);
        float alpha;

        if (dist_squared < 0.25) {
            alpha = ALPHA;
        } else {
            alpha = 0.0;
        }

        // alpha = smoothstep(0.0095, 0.000125, dist_squared) * 0.49;
        float rando = rand(pos);
        // gl_FragColor = vec4(1.0, (1.0 - dist_squared * 40.) * 0.6, 0.0, alpha + ((0.12 - dist_squared) * 4.) - (rando * 0.2));
        // gl_FragColor = vec4(1.0, 1.0 - dist_squared * 1.0, 0.0, 0.35 - dist_squared - (rando * 0.2) + alpha);


        gl_FragColor = vec4(1.0, 1.0 - dist_squared * 1.0, 0.0, 0.35 - dist_squared - (rando * 0.2));






        // gl_FragColor = vec4(d * 0.001, uv.x, 0.0, 0.25);
    }`;

    // vec2 uv = gl_FragCoord.xy / vec2(1600, 1600);

    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);

    // Compile the fragmentt shader
    gl.compileShader(fragShader);

    // Create a shader program object to store
    // the combined shader program
    shaderProgram = gl.createProgram();

    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);

    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);

    // Link both programs
    gl.linkProgram(shaderProgram);

    // Use the combined shader program object
    gl.useProgram(shaderProgram);



    /*======== Associating shaders to buffer objects ========*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    /*============= Drawing the primitive ===============*/

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 0.01);

    // gl.clearDepth(0.15);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 1000);
}

function draw() {
    // shader() sets the active shader with our shader
    // shader(shaderProgram);
    // texcoordShader.setUniform('time', frameCount);
    // rect gives us some geometry on the screen
    // rect(0, 0, width, height);
    // console.log("Drawing!");
    vertices = [];
    for (let i = 0; i < 1000; i += 1) {
        let x = cos(i * (frameCount + 3000) * 0.0001) * cos(i * 0.01) * i * 0.001125 * (9 / 14);
        x += (Math.random() - 0.5) * 0.01;
        let y = sin(i * (frameCount + 3000) * 0.0001) * i * 0.001125;
        y += (Math.random() - 0.5) * 0.01;
        vertices.push(x, y, 0.0);
    }

    // Create an empty buffer object to store the vertex buffer
    var vertex_buffer = gl.createBuffer();

    //Bind appropriate array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /*======== Associating shaders to buffer objects ========*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    /*============= Drawing the primitive ===============*/

    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 1000);
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