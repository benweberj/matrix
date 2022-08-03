import React, { useState } from 'react'

import BoolToggle from './BoolToggle'

const SketchOptions = props => {
    const { options={}, onChange } = props
    
    const [closed, setClosed] = useState(false)

    return (
        <>
            <div id='sketch-options' className={closed && 'closed'}>
                {Object.keys(options).map(name => {
                    const val = options[name]
                    if (typeof val === 'boolean') {
                        return <div key={`bool-option-${name}`} className='flex split align-center'>
                            <p className='code'>{name}</p>
                            <BoolToggle toggle={() => onChange(name, !val)} on={!!val} />
                        </div>
                    }
                    
                    // number entry
                    return <div key={`number-option-${name}`} className='flex split align-center'>
                        <p className='code'>{name}</p>
                        <input onChange={e => onChange(name, e.target.value)} value={val} />
                    </div>
                })}
                <div id='sketch-buttons'>
                    <button id='close-sketch-options' onClick={() => setClosed(true)}>close</button>
                    <button id='apply-sketch-options'>apply</button>
                </div>
            </div>

            <img
                src={require('./options.png')}
                className={`show-sketch-options ${!closed && 'closed'}`}
                onClick={() => setClosed(false)}
                alt='options slider icon'
            />

        </>
    )
}

export default SketchOptions