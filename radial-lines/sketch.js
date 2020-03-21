const size = 400;
let maxD = 5;
const controls = [
    {
        min: 2,
        max: 20,
        label: 'Max D',
        default: maxD,
        callback: (_) => maxD = _.value(),
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    stroke(color(0, 0, 0, 60));
    // strokeWeight(2);
    displayDensity(8);
}

function draw() {
    push();
    noLoop();
    background(255);
    translate(size / 2, size / 4);
    for (let n = 0; n < 25; n++) {
        beginShape();
        for (let i = 0; i < random(180, 220); i++) {
            vertex(
                map(
                    noise(i / 20, n / 2),
                    0, 1,
                    -maxD, maxD
                ) - ((n - 13) * pow(i, 3) * 0.0000010),
                i
            );
        }
        endShape();
    }
    pop();
}
