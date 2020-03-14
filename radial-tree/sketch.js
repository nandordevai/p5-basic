const size = 400;
let m = 0.75;
let phi = 10;
let length = 50;
let phiVar = 1;
let density = 20;
let rho = 1;
const controls = [
    {
        min: 1,
        max: 180,
        label: 'Density',
        default: density,
        callback: (_) => density = _.value(),
    },
    {
        min: 1,
        max: 20,
        label: 'Rotation',
        default: rho,
        callback: (_) => rho = _.value(),
    },
    {
        min: 0,
        max: 10,
        steps: 0.1,
        label: 'Phi var',
        default: phiVar,
        callback: (_) => phiVar = _.value(),
    },
    {
        min: 40,
        max: 100,
        label: 'Length',
        default: length,
        callback: (_) => length = -_.value(),
    },
    {
        min: 5,
        max: 50,
        label: 'Angle',
        default: phi,
        callback: (_) => phi = _.value(),
    },
    {
        min: 20,
        max: 80,
        label: 'Grow',
        default: m * 100,
        callback: (_) => m = _.value() / 100,
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    noFill();
    angleMode(DEGREES);
    colorMode(HSL);
}

function draw() {
    noLoop();
    background(255);
    push();
    translate(size / 2, size / 2);
    let v = createVector(0, length);
    const alpha = 360 / density;
    for (let i = 0; i < 360; i += alpha) {
        v.rotate(alpha * rho);
        stroke(
            map(noise(i / 500), 0, 1, 0, 360),
            40,
            50
        );
        line(0, 0, v.x, v.y);
        drawBranchesFromTrunk(v);
    }
    pop();
}

function drawBranchesFromTrunk(v) {
    push();
    translate(v.x, v.y);
    v1 = v.copy();
    v1.mult(m);
    v1.rotate(-phi * random() * phiVar);
    line(0, 0, v1.x, v1.y);
    if (v1.mag() > 10) {
        drawBranchesFromTrunk(v1);
    }
    pop();
    push();
    translate(v.x, v.y);
    v2 = v.copy();
    v2.mult(m);
    v2.rotate(phi * random() * phiVar);
    line(0, 0, v2.x, v2.y);
    if (v2.mag() > 10) {
        drawBranchesFromTrunk(v2);
    }
    pop();
}
