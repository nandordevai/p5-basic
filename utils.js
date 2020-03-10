function createControls(controls) {
    controls.forEach((c, i) => {
        const s = createSlider(c.min, c.max, c.default);
        s.position(100, 200 + i * 30);
        const l = createDiv(c.label);
        l.class('label');
        l.position(50, 198 + i * 30);
        s.input(() => {
            if (c.callback) {
                c.callback(s);
            }
            draw();
        });
    });
}
