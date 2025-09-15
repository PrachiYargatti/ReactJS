//src/components/Stopwatch/index.js
// index.js
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {timer: 0, isRunning: false}

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onStart = () => {
    const {isRunning} = this.state

    if (!isRunning) {
      this.timerId = setInterval(this.updateTime, 1000)
      this.setState({isRunning: true})
    }
  }

  onStop = () => {
    clearInterval(this.timerId)
    this.setState({isRunning: false})
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({timer: 0, isRunning: false})
  }

  updateTime = () => {
    this.setState(prev => ({timer: prev.timer + 1}))
  }

  render() {
    const {timer} = this.state
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return (
      <div className="bg-container">
        <h1 className="head">Stopwatch</h1>
        <div className="timer-container">
          <div className="timer-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="timer-img"
            />
            <p>Timer</p>
          </div>
          <h1>
            {formattedMinutes}:{formattedSeconds}
          </h1>
          <div className="btn-container">
            <button type="button" className="start-btn" onClick={this.onStart}>
              Start
            </button>
            <button type="button" className="stop-btn" onClick={this.onStop}>
              Stop
            </button>
            <button type="button" className="reset-btn" onClick={this.onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch

//src/components/Stopwatch/index.css
.bg-container {
  background-image: url('https://assets.ccbp.in/frontend/react-js/stopwatch-lg-bg.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  font-family: Roboto;
}
.head {
  margin: 25px;
  margin-left: 100px;
}
.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
  background-color: white;
  border-radius: 5px;
  width: 25%;
  margin: 25px;
}
.timer-card {
  display: flex;
}
.timer-img {
  height: 20px;
  margin-top: 15px;
}
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.start-btn {
  background-color: #1db05f;
  padding: 5px;
  border: 0;
  border-radius: 5px;
  color: white;
  width: 75px;
  margin: 10px;
}
.stop-btn {
  background-color: #ef0d36;
  padding: 5px;
  border: 0;
  border-radius: 5px;
  color: white;
  width: 75px;
  margin: 10px;
}
.reset-btn {
  background-color: #eaa800;
  padding: 5px;
  border: 0;
  border-radius: 5px;
  color: white;
  width: 75px;
  margin: 10px;
}

//App.js
import Stopwatch from './components/Stopwatch'

import './App.css'

const App = () => <Stopwatch />

export default App
