//src/components/Speedometer/index.js
import {Component} from 'react'
import './index.css'

class Speedometer extends Component {
  state = {speed: 0}

  onAccelerate = () => {
    this.setState(prevState => {
      if (prevState.speed < 200) {
        return {speed: prevState.speed + 10}
      }
      return null
    })
  }

  onApplyBrake = () => {
    this.setState(prevState => {
      if (prevState.speed > 0) {
        return {speed: prevState.speed - 10}
      }
      return null
    })
  }

  render() {
    const {speed} = this.state
    return (
      <div className="container">
        <h1 className="main-head">SPEEDOMETER</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
          alt="speedometer"
          className="image"
        />
        <h1 className="head">Speed is {speed}mph</h1>
        <p className="para">Min Limit is 0mph, Max Limit is 200mph</p>
        <div>
          <button onClick={this.onAccelerate} type="button" className="button1">
            Accelerate
          </button>
          <button onClick={this.onApplyBrake} type="button" className="button2">
            Apply Brake
          </button>
        </div>
      </div>
    )
  }
}

export default Speedometer

//src/components/Speedometer/index.css
/* Write your CSS here */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #07080c;
  font-family: 'Roboto';
  height: 100vh;
  margin: 0;
}
.image {
  height: 250px;
}
.main-head {
  color: white;
  font-size: 40px;
  font-style: italic;
}
.head {
  color: white;
  font-size: 30px;
}
.para {
  color: white;
  font-size: 15px;
}
.button1 {
  background-color: #0b69ff;
  padding: 10px;
  border: 0;
  border-radius: 3px;
  color: white;
  margin-right: 10px;
}
.button2 {
  background-color: transparent;
  padding: 10px;
  border: 2px solid white;
  border-radius: 3px;
  color: white;
}

//src/App.js
import Speedometer from './components/Speedometer'

import './App.css'

const App = () => <Speedometer />

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
