//src/components/EvenOddApp/index.js
import {Component} from 'react'
import './index.css'

class EvenOddApp extends Component {
  state = {
    count: 0,
  }

  onIncrement = () => {
    const randomNum = Math.floor(Math.random() * 101)
    this.setState(prevState => ({
      count: prevState.count + randomNum,
    }))
  }

  render() {
    const {count} = this.state
    const isEvenOdd = count % 2 === 0 ? 'Even' : 'Odd'

    return (
      <div className="app-container">
        <div className="counter-card">
          <h1 className="count-text">Count {count}</h1>
          <p className="status-text">Count is {isEvenOdd}</p>
          <button
            className="increment-btn"
            onClick={this.onIncrement}
            type="button"
          >
            Increment
          </button>
          <p className="note-text">
            *Increase By Random Number Between 0 to 100
          </p>
        </div>
      </div>
    )
  }
}

export default EvenOddApp

//src/components/EvenOddApp/index.css
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: white;
  font-family: Roboto;
}

.counter-card {
  background: linear-gradient(to bottom, #ff6e7f, #bfe9ff);
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  max-width: 650px;
  width: 90%;
}

.count-text {
  font-size: 42px;
  font-weight: bold;
  color: #0f172a;
  margin-bottom: 10px;
}

.status-text {
  font-size: 30px;
  color: #334155;
  margin-bottom: 20px;
}

.increment-btn {
  background-color: white;
  color: #222;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}

.note-text {
  font-size: 15px;
  color: #1e293b;
  margin-top: 10px;
}

//src/App.js
import EvenOddApp from './components/EvenOddApp'

import './App.css'

const App = () => <EvenOddApp />

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
