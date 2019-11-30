// Creates a column of glyphs
class Stream {
    constructor(x) {
        this.x = x;
        this.glyphs = [];

        let speed = round(random(2, 6));
        let count = round(random(10, height/glyphSize * .5));
        let stagger = round(random(100, 1000));

        for (let i = 0; i < count; i++) {
            let interval = round(random(50, 100));
            let head = i === 0 && random() < .5;
            let glyph = new Glyph(this.x, -1 * glyphSize * i - stagger, speed, interval, head);
            this.glyphs.push(glyph);
        }
    }

    rain() {
        this.glyphs.forEach(glyph => glyph.rain());
    }
}
