import React from 'react'

const BoolToggle = props => {
  const { toggle, on=false } = props

  return (
    <div
      onClick={toggle}
      className={`bool-toggle ${on && 'on'}`}
      {...props}
    >
        <div />
    </div>
  )
}

export default BoolToggle