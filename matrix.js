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