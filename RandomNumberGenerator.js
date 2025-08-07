//src/components/RandomNumberGenerator/index.js
import {Component} from 'react'
import './index.css' // Ensure styles are in this file

class RandomNumberGenerator extends Component {
  state = {number: 0}

  onGenerate = () => {
    const randomNumber = Math.ceil(Math.random() * 100)
    this.setState({number: randomNumber})
  }

  render() {
    const {number} = this.state

    return (
      <div className="app-container">
        <div className="card">
          <h1 className="title">Random Number</h1>
          <p className="description">
            Generate a random number in the range of 0 to 100
          </p>
          <button
            className="generate-button"
            onClick={this.onGenerate}
            type="button"
          >
            Generate
          </button>
          <p className="number-display">{number}</p>
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator

//src/components/RandomNumberGenerator/index.css
.app-container {
  background-image: url('https://assets.ccbp.in/frontend/react-js/random-no-generator-bg.png');
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
}

.card {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
}

.title {
  color: #0b69ff;
  margin-bottom: 10px;
}

.description {
  margin-bottom: 20px;
  font-size: 16px;
}

.generate-button {
  background-color: #0b69ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.number-display {
  font-size: 48px;
  font-weight: bold;
  color: #0b69ff;
  margin-top: 20px;
}

//src/App.js
import RandomNumberGenerator from './components/RandomNumberGenerator'

import './App.css'

const App = () => <RandomNumberGenerator />

export default App

//src/App.css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
