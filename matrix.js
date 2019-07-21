let glyphSize = 20;
let streams = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    for (let i = 0; i < width; i += glyphSize) streams.push(new Stream(i));
}

function draw() {
    background(0, 80);
    streams.forEach(stream => {
        stream.rain();
    });
}

// Creates a katakana character that rains down the screen
class Glyph {
    constructor(x, y, speed, interval, head) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.interval = interval;
        this.head = head;

        this.char = '_';
        this.setChar();
    }

    setChar() {
        let letter = random(0, 90);
        this.char = String.fromCharCode(0x30A0 + letter);
    }

    render() {
        this.head ? fill(220, 255, 220) : fill(50, 255, 150);
        textSize(glyphSize);
        text(this.char, this.x, this.y);
    }

    rain() {
        this.y >= height ? this.y = 0 : null;
        this.y += this.speed;
        if (abs(this.y % this.interval) === 0) this.setChar();
        this.render();
    }
}

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