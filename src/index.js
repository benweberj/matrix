import React from 'react'
import ReactDOM from 'react-dom/client'

import RainingCode from './RainingCode'
import { createGlobalStyle } from 'styled-components'

const theme = {
  green: '#83E8BA',
  red: '#f5877f', // DB5461
}

const GlobalStyles = createGlobalStyle`

html {
  font-size: 17px;
}

body {
  background: rgb(44, 55, 55);
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all .25s ease;
}

#sketch-container {
  height: 100vh;
}


.show-sketch-options {
  position: absolute;
  z-index: 99999999;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  filter: invert(1);
  opacity: .3;
  transition: all .5s ease;

  &.closed {
    opacity: 0;
    transform: scale(0);
  }

  :hover {
    opacity: 1;
  }
}

#sketch-buttons {
  padding-top: 30px;
  display: flex;
  flex-direction: column;

  button {
    padding: 4px 25px;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 99px;

    :hover {
      opacity: .5;
    }

    :active {
      opacity: 1;
      filter: hue(200%)
    }
  }
}

#close-sketch-options {
  background: ${theme.red}77;
  margin-bottom: 5px;

}

#apply-sketch-options {
  background: ${theme.green}77;
}

.bool-toggle {
  width: 40px;
  background: ${theme.red};
  border-radius: 999px;
  padding: 4px;
  transition: background .25s ease;

  &.on {
      background: ${theme.green};

      > div {
          transform: translateX(22px);
      }
  }

  > div {
      transition: transform .2s ease;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: white;
  }
}

#sketch-options {
  position: absolute;
  top: 0;
  left: 0;
  // width: 100px;
  height: 100%;
  background: rgba(44, 55, 55, .75);
  
  

  padding: 20px;
  transition: transform .5s ease, opacity .5s ease;
  z-index: 2;
  padding: 20px;

  &.closed {
      transform: translateX(-100%);
      opacity: 0;
  }


  > div {
      padding-bottom: 4px;
      p {
          font-size: .8rem;
      }

      input {
          width: 50px;
      }
  }

  p {
    color: white;
    font-family: sans-serif;
    margin-top: 10px;
    font-weight: 100;
    padding-bottom: 5px;
  }
  
  input {
    outline: none;
    border: none;
    border-radius: 99px;
    padding: 3px 10px;
    background: #fff5;
  
    color: #83f883;
  }
}
`

const App = () => {
  return (
    <>
      <GlobalStyles />
      
      <div id='sketch-container'>
        <RainingCode />
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)