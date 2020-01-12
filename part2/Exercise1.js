//
// Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx = {
    shaderProgram: -1, //wird unten wieder überschrieben
    aVertexPositionId: -1,
    aVertexColorId: -1,
};

// we keep all the parameters for drawing a specific object together
var rectangleObject = {
    buffer: -1,
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    setUpBuffers();

    // set the clear color here
    // NOTE(TF) Aufgabe 1 / Frage:
    //     clearColor() only sets the color for the buffer, but doesn't actually do anything else.
    //     clear() has to be called in order for the color to be painted.
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    // finds the index of the variable in the program || überschreibt ctx.aVertexPositionId
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aVertexColorId = gl.getAttribLocation(ctx.shaderProgram, "aVertexColor");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */
function setUpBuffers(){
    "use strict";

    rectangleObject.buffer = gl.createBuffer();

    var vertices = [
        // X, Y coords     // R, G, B
        -0.5,0.5,          0.85, 0.75, 0.75,
        0.5,0.5,           0.75, 0.85, 0.75,
        0.5,-0.5,          0.85, 0.85, 0.75,
        -0.5,-0.5,         0.85, 0.75, 0.85,
    ]

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);
    // add drawing routines here

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.buffer);

    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(ctx.aVertexColorId, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.enableVertexAttribArray(ctx.aVertexColorId);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    console.log("done");
}
