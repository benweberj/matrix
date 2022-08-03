import React from 'react'
import ReactDOM from 'react-dom/client'

import RainingCode from './RainingCode'
import styles from './options/styles.css'

const App = () => {
  return (
    <div id='sketch-container'>
      <RainingCode />
    </div>  
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)