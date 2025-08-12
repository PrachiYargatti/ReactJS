//src/components/FruitsCounter/index.js
import {Component} from 'react'

import './index.css'

class FruitsCounter extends Component {
  state = {mangoesCount: 4, bananasCount: 5}

  onClickEatBanana = () => {
    this.setState(prevState => ({bananasCount: prevState.bananasCount + 1}))
  }

  onClickEatMango = () => {
    this.setState(prevState => ({mangoesCount: prevState.mangoesCount + 1}))
  }

  render() {
    const {mangoesCount, bananasCount} = this.state

    return (
      <div className="app-container">
        <div className="fruits-counter">
          <h1 className="count-text">
            Bob ate <span className="count">{mangoesCount}</span> mangoes
            <span className="count"> {bananasCount}</span> bananas
          </h1>
          <div className="counters-control-container">
            <div className="counter-control">
              <img
                src="https://assets.ccbp.in/frontend/react-js/mango-img.png"
                alt="mango"
                className="fruit-image"
              />
              <div className="button-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.onClickEatMango}
                >
                  Eat Mango
                </button>
              </div>
              <div className="counter-control">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/banana-img.png"
                  alt="banana"
                  className="fruit-image"
                />
                <div className="button-container">
                  <button
                    type="button"
                    className="button"
                    onClick={this.onClickEatBanana}
                  >
                    Eat Banana
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FruitsCounter

//src/components/FruitsCounter/index.css
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffd569;
  height: 100vh;
}

.fruits-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  width: 90%;
  padding: 24px;
  max-width: 1110px;
  margin: 50px;
}

@media screen and (min-width: 768px) {
  .fruits-counter {
    width: 80%;
    padding-top: 96px;
    padding-left: 64px;
    padding-right: 64px;
    padding-bottom: 96px;
  }
  .counters-control-container {
    flex-direction: row;
    justify-content: space-around;
  }
  .count-text {
    font-size: 48px;
  }
  .button-container {
    margin-top: 48px;
  }
  .counter-control {
    margin-top: 96px;
    margin-left: 48px;
    margin-right: 48px;
  }
  .fruit-image {
    width: 296px;
    height: 275px;
  }
  .button {
    font-size: 16px;
  }
}

.count-text {
  text-align: center;
  color: #000000;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 700;
}

.count {
  color: #ffd569;
}

.counters-control-container {
  display: flex;
  flex-direction: column;
}

.counter-control {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-left: 16px;
  margin-right: 16px;
}

.fruit-image {
  width: 200px;
  height: 175px;
}

.button-container {
  text-align: center;
  margin-top: 24px;
}

.button {
  color: #ffffff;
  background-color: #007bff;
  font-size: 12px;
  font-family: 'Roboto';
  border: none;
  border-radius: 4px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
  outline: none;
  cursor: pointer;
}

//src/App.js
import FruitsCounter from './components/FruitsCounter'

import './App.css'

const App = () => <FruitsCounter />

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

//src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
