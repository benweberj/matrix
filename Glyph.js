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