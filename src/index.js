import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import RainingCode from './RainingCode'
import styles from './options/styles.css'

const App = () => {
  const [ready, setReady] = useState(null)

  return (
    <div id='sketch-container'>
      <RainingCode />
    </div>  
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)