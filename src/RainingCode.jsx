import p5 from 'p5'
import React from 'react'

import SketchOptions from './options/Options'

class RainingCode extends React.Component {

    state = {
        title: 'Raining Code',
        repo: 'https://github.com/benweberj/matrix/',
        description: `
            A customizable animation of falling Katakana character streams,
            inspired by The Matrix 'raining code' animation.
        `,
        options: {
            glyphSize: 20,
            glyphScale: 1,
            opacity: 60,
            speed: 1,
            glitchSpeed: 1,
            streamLength: 10,
        },
        descriptions: {
            glyphSize: 'The font size in pixels.',
            glyphScale: 'Scaling factor for the size of the glyphs.',
            opacity: '0-255 how opaque each frame is. 0 Means the previous frames are never cleared, 255 means each frame completely draws over the previous one. A number in the middle will give a glowing trail effect.',
            speed: 'How fast the glyph streams rain down.',
            glitchSpeed: 'How often the glyphs glitch and transform into another glyph.',
            streamLength: 'How many glyphs are in a stream.',
        }
    }

    constructor(props) {
        super(props)
        this.matrixRef = React.createRef()
    }

    componentDidMount() {
        if (!this.sketch) this.sketch = new p5(this.Sketch, this.matrixRef.current)
    }

    componentWillUnmount() {
        this.sketch.remove()
    }

    onSettingsChange(key, val) {
        if (typeof val !== 'boolean') {
            // is number
            if (typeof val === 'string') {
                let pass = false
                if (val.length == 0 || val[val.length-1] === '.') {
                    pass = true
                }

                if (!pass) {
                    if (val.includes('.')) {
                        val = parseFloat(val)
                    } else {
                        val = parseInt(val)
                    }
                }

            }
        }
        this.setState({ options: { ...this.state.options, [key]: val} })
    }

    Sketch = p => {
        let canvas
        let streams = []
        const parentId = 'sketch-container'
        const applyBtnId = 'apply-sketch-options'
        
        p.reset = () => {
            const { glyphSize, speed, glitchSpeed, streamLength, glyphScale } = this.state.options
            console.log(this.state.options)
            p.clear()
            
            let { width, height } = dim(parentId)
            p.resizeCanvas(width, height)
            
            streams = []
            for (let i = 0; i < p.width; i += parseInt(glyphSize)) {
                streams.push(new Stream(p, i, glyphSize, speed, glitchSpeed, streamLength, glyphScale));
            }
        }

        function dim(id) {
            const a = document.getElementById(id)
            if (!a) return { top: 0, left: 0, width: 0, height: 0 }
            return {
                top: a.getBoundingClientRect().top,
                left: a.getBoundingClientRect().left,
                width: a.clientWidth,
                height: a.clientHeight,
            }
        }

            
        p.windowResized = () => {
            setTimeout(() => {
                p.reset()
            }, 500)
        }
    
        p.setup = () => {
            const d = dim(parentId)
            canvas = p.createCanvas(d.width, d.height)
            canvas.position(0, 0)
            canvas.style('z-index', -1)

            document.getElementById(applyBtnId).addEventListener('click', p.reset)

            p.reset()
        }
    
        p.draw = () => {
            const { opacity } = this.state.options
            
            if (opacity >= 255) {
                canvas.clear()
            } else {
                p.background(44, 55, 55, opacity);
            }

            streams.forEach(stream => stream.rain());
        }
    }

    render() {
        return (
            <div id='sketch-container' className='full'>
                <div ref={this.matrixRef} />
                <SketchOptions
                    title={this.state.title}
                    description={this.state.description}
                    repo={this.state.repo}
                    options={this.state.options}
                    descriptions={this.state.descriptions}
                    onChange={this.onSettingsChange.bind(this)}
                />
            </div>
        )
    }
}

// Creates a column of Katakana characters that rains down the screen
class Stream {
    constructor(p, x, size, speed, glitchSpeed, streamLength, glyphScale=1) {
        this.p = p
        this.x = x;
        this.glyphs = [];

        speed = speed * p.round(p.random(2, 6));
        let count = Math.min(p.round(streamLength*.06*(p.height/size), streamLength*.09*(p.height/size)), p.height/size)
        let stagger = p.round(p.random(100, 1000));

        for (let i = 0; i < count; i++) {
            let interval = p.round(p.random(1/glitchSpeed * 50, 1/glitchSpeed * 100));
            let head = i === 0 && p.random() < .5;
            let glyph = new Glyph(p, this.x, -size * i - stagger, speed, interval, head, size, glyphScale);
            this.glyphs.push(glyph);
        }
    }

    rain() {
        this.glyphs.forEach(glyph => glyph.rain());
    }
}

// Creates an animated katakana character
class Glyph {
    constructor(p, x, y, speed, interval, head, size, glyphScale=1) {
        this.p = p
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.interval = interval;
        this.head = head;
        this.size = size;
        this.glyphScale = glyphScale

        this.char = '_';
        this.setChar();
    }

    setChar() {
        let letter = this.p.random(0, 90);
        this.char = String.fromCharCode(0x30A0 + letter);
    }

    render() {
        const { p, glyphScale } = this
        this.head ? p.fill(220, 255, 220) : p.fill(50, 255, 150);
        p.textSize(this.size * glyphScale);
        p.text(this.char, this.x, this.y);
    }

    rain() {
        if (this.y >= this.p.height + this.size) this.y = 0;
        this.y += this.speed;
        if (this.p.frameCount % this.interval === 0) this.setChar();
        this.render();
    }
}

export default RainingCode