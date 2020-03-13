const x = 50;
const y = 350;
const size = 400;
const length = 300;
const minLength = 5;

function setup() {
    createCanvas(size, size);
    background(255);
    stroke('rgba(0, 0, 0, 0.2)');
    noFill();
}

function draw() {
    noLoop();
    generateSierpinskiTriangle(x, y, length)
}

function generateSierpinskiTriangle(x, y, length) {
    if (length > minLength) {
        push();
        rotate(random(-0.005, 0.005));
        triangle(x, y, x + length, y, x + length / 2, y - length / 3 * 2.6);
        pop();
        // left triangles
        generateSierpinskiTriangle(x + length / 2, y, length / 2);
        // right triangles
        generateSierpinskiTriangle(x, y, length / 2);
        // top triangles
        generateSierpinskiTriangle(x + length / 4, y - length / 2.3, length / 2);
    }
}
