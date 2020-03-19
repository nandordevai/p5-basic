const size = 400;
const step = 10;
const field = [];
let force = 50;
const controls = [
    {
        min: 20,
        max: 100,
        label: 'Force',
        default: force,
        callback: (_) => force = _.value(),
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    noFill();
}

const field_ = [
    [1, 2, 3], // row, y constant
]

function draw() {
    background(255);
    noLoop();
    for (let y = 0; y < step; y++) {
        field.push([]);
        for (let x = 0; x < step; x++) {
            field[y][x] = (noise(x / 10, y / 10) - 0.5) * force;
        }
    }
    const l = size / step;

    push();
    colorMode(HSL);
    translate(-l, 0);
    for (let x = 0; x < step; x++) {
        stroke(x * 10, 55, 70);
        beginShape();
        translate(l, 0);
        let pos = l / 2;
        for (let y = 0; y < step; y++) {
            vertex(pos, y * l);
            pos -= field[x][y];
        }
        vertex(pos, size);
        endShape();
    }
    pop();
}
