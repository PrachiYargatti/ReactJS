//src/components/CoinToss/index.js
import {Component} from 'react'
import './index.css'

class CoinToss extends Component {
  state = {
    total: 0,
    headsCount: 0,
    tailsCount: 0,
    src: 'https://assets.ccbp.in/frontend/react-js/heads-img.png',
  }

  onTossCoin = () => {
    const tossResult = Math.floor(Math.random() * 2)
    if (tossResult === 0) {
      this.setState(prevState => ({
        total: prevState.total + 1,
        headsCount: prevState.headsCount + 1,
        src: 'https://assets.ccbp.in/frontend/react-js/heads-img.png',
      }))
    } else {
      this.setState(prevState => ({
        total: prevState.total + 1,
        tailsCount: prevState.tailsCount + 1,
        src: 'https://assets.ccbp.in/frontend/react-js/tails-img.png',
      }))
    }
  }

  render() {
    const {src, total, headsCount, tailsCount} = this.state
    return (
      <div className="bg-container">
        <div className="toss-container">
          <h1 className="toss-head">Coin Toss Game</h1>
          <p className="para">Heads (or) Tails</p>
          <img src={src} className="image" alt="toss result" />
          <button
            className="tossCoinBtn"
            type="button"
            onClick={this.onTossCoin}
          >
            Toss Coin
          </button>
          <div className="count-container">
            <p>Total: {total}</p>
            <p>Heads: {headsCount}</p>
            <p>Tails: {tailsCount}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CoinToss

//src/components/CoinToss/index.css
.bg-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f9d423, #e2a139);
  height: 100vh;
  background-size: cover;
}
.toss-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 75%;
  width: 50%;
  border-radius: 10px;
}
.toss-head {
  color: #a35200;
  font-family: Roboto;
  font-size: 45px;
}
.para {
  color: #334155;
  font-size: 25px;
  font-family: Roboto;
}
.image {
  height: 25%;
}
.tossCoinBtn {
  margin: 15px;
  background-color: #f9d423;
  border-radius: 10px;
  padding: 10px;
  border: 0;
  color: #a35200;
  font-weight: bold;
}
.count-container {
  display: flex;
  flex-direction: row;
}
p {
  margin-right: 20px;
  font-family: Roboto;
}

//src/App.js
import CoinToss from './components/CoinToss'

import './App.css'

const App = () => <CoinToss />

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
