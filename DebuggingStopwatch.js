//App.js
import Stopwatch from './components/Stopwatch'

import './App.css'

const App = () => <Stopwatch />

export default App

//App.css
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

//index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

//Stopwatch/index.js
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  onStartTimer = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.timeInterval = setInterval(this.updateTime, 1000)
      this.setState({isTimerRunning: true})
    }
  }

  onStopTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false})
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({timeElapsedInSeconds: 0, isTimerRunning: false})
  }

  updateTime = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="stopwatch">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                className="timer-image"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer-text">Timer</p>
            </div>
            <h1 className="stopwatch-timer">{time}</h1>
            <div className="timer-buttons">
              <button
                type="button"
                className="button start-button"
                onClick={this.onStartTimer}
              >
                Start
              </button>
              <button
                type="button"
                className="button stop-button"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="button reset-button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch

//Stopwatch/index.css
.app-container {
  background-image: url('https://assets.ccbp.in/frontend/react-js/stopwatch-sm-bg.png');
  background-size: cover;
  height: 100vh;
}

@media screen and (min-width: 768px) {
  .app-container {
    background-image: url('https://assets.ccbp.in/frontend/react-js/stopwatch-lg-bg.png');
  }
}

.stopwatch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
}

@media screen and (min-width: 992px) {
  .stopwatch-container {
    align-items: flex-start;
    margin-left: 160px;
  }
}

.stopwatch {
  color: #333333;
  font-family: 'Roboto';
  font-size: 36px;
  font-weight: 500;
}

@media screen and (min-width: 992px) {
  .stopwatch {
    font-size: 64px;
  }
}

.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 310px;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0px 4px 40px rgba(23, 31, 70, 0.16);
}

.timer {
  display: flex;
  align-items: center;
}

.timer-image {
  margin-right: 8px;
}

.timer-text {
  color: #333333;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 500;
}

.stopwatch-timer {
  color: #333333;
  font-family: 'Roboto';
  font-size: 36px;
  font-weight: 500;
  margin-top: 0px;
}

@media screen and (min-width: 768px) {
  .stopwatch-timer {
    font-size: 64px;
  }
}

.timer-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  border: none;
  outline: none;
}

@media screen and (min-width: 768px) {
  .button {
    padding-top: 8px;
    padding-bottom: 8px;
  }
}

.start-button {
  background-color: #1db05f;
  margin-right: 24px;
}

.stop-button {
  background-color: #ef0d36;
  margin-right: 24px;
}

.reset-button {
  background-color: #eaa800;
}
