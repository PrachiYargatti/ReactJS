//src/components/FruitsCounter/index.js
import {Component} from 'react'
import './index.css'

class FruitsCounter extends Component {
  state = {mangoCount: 0, bananaCount: 0}

  onEatMango = () => {
    this.setState(prevState => ({
      mangoCount: prevState.mangoCount + 1,
    }))
  }

  onEatBanana = () => {
    this.setState(prevState => ({
      bananaCount: prevState.bananaCount + 1,
    }))
  }

  render() {
    const {mangoCount, bananaCount} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="head">
            Bob ate {mangoCount} mangoes {bananaCount} bananas
          </h1>
          <div className="fruit_container">
            <div className="fruitCard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/mango-img.png"
                alt="mango"
                className="image"
              />
              <button
                type="button"
                className="button"
                onClick={this.onEatMango}
              >
                Eat Mango
              </button>
            </div>
            <div className="fruitCard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/banana-img.png"
                alt="banana"
                className="image"
              />
              <button
                type="button"
                className="button"
                onClick={this.onEatBanana}
              >
                Eat Banana
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FruitsCounter

//src/components/FruitsCounter/index.css
/* Write your CSS here */
.bg-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffd569;
  height: 100vh;
  margin: 0;
}
.container {
  border-radius: 10px;
  min-height: 700px;
  min-width: 700px;
  padding: 10px;
  margin: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fruit_container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.fruitCard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  background-color: #007bff;
  color: white;
  border: 0;
  border-radius: 3px;
  padding: 10px;
  width: 110px;
  margin: 20px;
}
.head {
  font-size: 40px;
  color: black;
  margin-bottom: 40px;
}
.image {
  height: 250px;
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
