//src/components/LettersCalculator/index.js
import {Component} from 'react'
import './index.css'

class LettersCalculator extends Component {
  state = {searchInput: ''}

  onInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="app-container">
        <div className="input-card">
          <h1 className="head">Calculate the Letters you enter</h1>

          <label htmlFor="phrase">Enter the phrase</label>
          <input
            id="phrase"
            type="text"
            className="input"
            placeholder="Enter the phrase"
            value={searchInput}
            onChange={this.onInputChange}
          />

          <p className="letters-count">No.of letters: {searchInput.length}</p>
        </div>

        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png"
            alt="letters calculator"
            className="image"
          />
        </div>
      </div>
    )
  }
}

export default LettersCalculator

//src/components/LettersCalculator/index.css
.app-container {
  background: linear-gradient(to right, #1d976c, #93f9b9);
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

.input-card {
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.head {
  color: white;
  font-size: 40px;
  font-family: Roboto;
  margin-bottom: 20px;
}

label {
  color: white;
  font-size: 15px;
  margin-bottom: 8px;
}

.input {
  border: 2px white solid;
  background: transparent;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  outline: none;
}

.letters-count {
  padding: 15px 20px;
  font-size: 20px;
  border-radius: 10px;
  color: #1d976c;
  background-color: white;
  font-family: Roboto;
  font-weight: bold;
  width: fit-content;
}

.image {
  height: 450px;
  padding: 20px;
}

//src/App.js
import LettersCalculator from './components/LettersCalculator'

import './App.css'

const App = () => <LettersCalculator />

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
