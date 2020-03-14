const size = 400;
const steps = 15;
const tile_size = size / steps;
let colors = Array(steps * 2);
const sat = 40;
const light = 60;

function setup() {
    createCanvas(size, size);
    noFill();
    strokeWeight(3);
    colorMode(HSL);
    colors = [...colors].map((_, i) => map(i, 0, steps * 2 - 1, 0, 360));
}

function drawTile(braidType, i) {
    const x = tile_size / 4;
    const curve = 10;
    let _ = null;
    switch (braidType) {
        case 'straight':
            stroke(colors[i], sat, light);
            line(x, 0, x, tile_size);
            stroke(colors[i + 1], sat, light);
            line(x * 3, 0, x * 3, tile_size);
            break;
        case 'cross_x':
            stroke(colors[i], sat, light);
            bezier(
                x, 0,                     // anchor 1
                x, curve,                 // control 1
                x * 3, tile_size - curve, // control 2
                x * 3, tile_size          // anchor 2
            );
            stroke(colors[i + 1], sat, light);
            bezier(
                x * 3, 0,             // anchor 1
                x * 3, curve,         // control 1
                x, tile_size - curve, // control 2
                x, tile_size          // anchor 2
            );
            _ = colors[i];
            colors[i] = colors[i + 1];
            colors[i + 1] = _;
            break;
        case 'cross_right':
            stroke(colors[i], sat, light);
            line(x, 0, x, tile_size);
            stroke(colors[i + 1], sat, light);
            bezier(
                x * 3, 0,                 // anchor 1
                x * 3, curve,             // control 1
                x * 5, tile_size - curve, // control 2
                x * 5, tile_size          // anchor 2
            );
            // do not swap colors here, cross_left handles it
            break;
        case 'cross_left':
            stroke(colors[i + 1], sat, light);
            line(x * 3, 0, x * 3, tile_size);
            stroke(colors[i], sat, light);
            bezier(
                x, 0,                  // anchor 1
                x, curve,              // control 1
                -x, tile_size - curve, // control 2
                -x, tile_size          // anchor 2
            );
            _ = colors[i];
            colors[i] = colors[i - 1];
            colors[i - 1] = _;
            break;
        default:
            break;
    }
}

function generateRow() {
    // TODO: cross both direction?
    const row = [random(['cross_right', 'straight', 'cross_x'])];
    for (let i = 1; i < steps - 1; i++) {
        let possibleTypes = [];
        if (row[i - 1] == 'cross_right') {
            row.push('cross_left');
            continue;
        } else if (row[i - 1] == 'cross_x') {
            possibleTypes.push('straight', 'cross_right');
        } else if (row[i - 1] == 'straight') {
            possibleTypes.push('straight', 'cross_x', 'cross_right');
        } else if (row[i - 1] == 'cross_left') {
            possibleTypes.push('straight', 'cross_x', 'cross_right');
        } else {
            possibleTypes.push('straight', 'cross_x', 'cross_left');
        }
        if (i === steps - 2) {
            possibleTypes = possibleTypes.filter(_ => _ !== 'cross_right');
        }
        row.push(random(possibleTypes));
    }
    return row;
}

function draw() {
    noLoop();
    translate(tile_size / 2, 0);
    for (let y = 0; y < steps; y++) {
        generateRow().forEach((tile, i) => {
            push();
            translate(tile_size * i, tile_size * y);
            drawTile(tile, i * 2);
            pop();
        });
    }
}
