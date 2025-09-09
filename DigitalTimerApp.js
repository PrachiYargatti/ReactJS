//src/components/DigitalTimer/index.js
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    timeElapsedInSeconds: 0,
    timerLimit: 25,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  getTimeInMMSS = () => {
    const {timerLimit, timeElapsedInSeconds} = this.state
    const remaining = timerLimit * 60 - timeElapsedInSeconds
    const minutes = Math.floor(remaining / 60)
    const seconds = remaining % 60
    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${formattedMinutes}:${formattedSeconds}`
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      isRunning: false,
      timeElapsedInSeconds: 0,
      timerLimit: 25,
    })
  }

  onDecrease = () => {
    this.setState(prev => ({
      timerLimit: prev.timerLimit > 1 ? prev.timerLimit - 1 : 1,
      timeElapsedInSeconds: 0,
    }))
  }

  onIncrease = () => {
    this.setState(prev => ({
      timerLimit: prev.timerLimit + 1,
      timeElapsedInSeconds: 0,
    }))
  }

  tick = () => {
    this.setState(prev => {
      const {timerLimit, timeElapsedInSeconds} = prev
      const remaining = timerLimit * 60 - timeElapsedInSeconds
      if (remaining === 0) {
        clearInterval(this.timerId)
        return {isRunning: false}
      }
      return {timeElapsedInSeconds: prev.timeElapsedInSeconds + 1}
    })
  }

  onStartPause = () => {
    const {isRunning, timerLimit, timeElapsedInSeconds} = this.state
    const remaining = timerLimit * 60 - timeElapsedInSeconds

    if (remaining === 0) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isRunning) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.tick, 1000)
    }
    this.setState(prev => ({isRunning: !prev.isRunning}))
  }

  render() {
    const {isRunning, timerLimit, timeElapsedInSeconds} = this.state
    const playPauseIcon = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playPauseAlt = isRunning ? 'pause icon' : 'play icon'
    const playPauseText = isRunning ? 'Pause' : 'Start'
    const statusText = isRunning ? 'Running' : 'Paused'
    const disableLimitChange = timeElapsedInSeconds > 0

    return (
      <div className="bg-container">
        <h1 className="main-head">Digital Timer</h1>
        <div className="main-card">
          <div className="img-container">
            <div className="timer-container">
              <h1 className="timer-head">{this.getTimeInMMSS()}</h1>
              <p className="status-para">{statusText}</p>
            </div>
          </div>

          <div className="buttons-card">
            <div className="play-reset-container">
              <button
                type="button"
                className="button"
                onClick={this.onStartPause}
              >
                <img
                  alt={playPauseAlt}
                  src={playPauseIcon}
                  className="icon-style"
                />
                {playPauseText}
              </button>

              <button type="button" className="button" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon-style"
                />
                Reset
              </button>
            </div>

            <p className="set-limit-para">Set Timer limit</p>
            <div className="increase-decrease-btn-card">
              <button
                type="button"
                className="button btn"
                onClick={this.onDecrease}
                disabled={disableLimitChange}
              >
                -
              </button>
              <p className="set-time-para">{timerLimit}</p>
              <button
                type="button"
                className="button btn"
                onClick={this.onIncrease}
                disabled={disableLimitChange}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer


//src/components/DigitalTimer/index.css
.bg-container {
  background: linear-gradient(to right, #ffffff, #cffcf1);
  height: 100vh;
  background-size: cover;
  font-family: Roboto;
}
.main-head {
  color: black;
  font-size: 30px;
  text-align: center;
}
.img-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png');
  background-size: cover;
  height: 500px;
  width: 500px;
}
.timer-container {
  background-color: white;
  border-radius: 50%;
  border: 0;
  height: 150px;
  width: 150px;
  padding: 10px;
}
.timer-head {
  text-align: center;
  color: #00d9f5;
  font-weight: bold;
}
.status-para {
  color: black;
  text-align: center;
}
.main-card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.icon-style {
  height: 25px;
}
.para {
  padding-right: 15px;
}
.buttons-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.play-reset-container {
  display: flex;
}
.button {
  background: transparent;
  border: 0;
  cursor: pointer;
}
.btn {
  font-size: 35px;
}
.set-time-para {
  background-color: #a5f2e0;
  border-radius: 10px;
  padding: 5px;
  width: 75px;
  text-align: center;
}
.set-limit-para {
  text-align: center;
}
.increase-decrease-btn-card {
  display: flex;
  justify-content: center;
}

//App.js
import DigitalTimer from './components/DigitalTimer'

import './App.css'

const App = () => <DigitalTimer />

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
