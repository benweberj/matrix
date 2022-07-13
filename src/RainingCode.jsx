import p5 from 'p5'
import React from 'react'

import SketchOptions from './Options'

class RainingCode extends React.Component {

    state = {
        options: {
            glyphSize: 20,
            glyphScale: 1,
            opacity: 60,
            speed: 1,
            glitchSpeed: 1,
            streamLength: 10,
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
        if (parseInt(val)) val = parseInt(val)
        this.setState({ options: { ...this.state.options, [key]: val} })
    }

    Sketch = p => {
        let canvas
        let streams = []
        const parentId = 'sketch-container'
        const applyBtnId = 'apply-sketch-options'
        
        p.reset = () => {
            const { glyphSize, speed, glitchSpeed, streamLength, glyphScale } = this.state.options
            canvas.clear()
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
            let { width, height } = dim(parentId)
            p.resizeCanvas(width, height)
            p.reset()
        }
    
        p.setup = () => {
            const d = dim(parentId)
            canvas = p.createCanvas(d.width, d.height)
            canvas.position(0, 0)
            canvas.style('z-index', -1)

            document.getElementById(applyBtnId).addEventListener('click', p.reset)

            p.reset()
        }
    
        // p.mouseClicked = e => {
        //     canvas.clear()
        //     p.setup()
        //     console.log(this.state.options)
        // }
    
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
                <SketchOptions options={this.state.options} onChange={this.onSettingsChange.bind(this)} />
            </div>
        )
    }
}

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
            console.log(interval)
            let head = i === 0 && p.random() < .5;
            let glyph = new Glyph(p, this.x, -size * i - stagger, speed, interval, head, size, glyphScale);
            this.glyphs.push(glyph);
        }
    }

    rain() {
        this.glyphs.forEach(glyph => glyph.rain());
    }
}


// Creates a katakana character that rains down the screen
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