//src/components/ShowHide/index.js
import {Component} from 'react'
import './index.css'

class ShowHide extends Component {
  state = {firstNameVisible: false, lastNameVisible: false}

  onShowHideFirstname = () => {
    this.setState(prevState => ({
      firstNameVisible: !prevState.firstNameVisible,
    }))
  }

  onShowHideLastname = () => {
    this.setState(prevState => ({
      lastNameVisible: !prevState.lastNameVisible,
    }))
  }

  render() {
    const {firstNameVisible, lastNameVisible} = this.state
    return (
      <div className="container">
        <h1 className="head">Show/Hide</h1>
        <div className="button_container">
          <div className="button_card_container">
            <button
              type="button"
              className="button"
              onClick={this.onShowHideFirstname}
            >
              Show/Hide Firstname
            </button>
            {firstNameVisible && <p className="card">Joe</p>}
          </div>
          <div className="button_card_container">
            <button
              type="button"
              className="button"
              onClick={this.onShowHideLastname}
            >
              Show/Hide Lastname
            </button>
            {lastNameVisible && <p className="card">Jonas</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default ShowHide

//src/components/ShowHide/index.css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #fa7257, #fc63a7);
  height: 100vh;
  margin: 0;
}

.head {
  text-align: center;
  color: white;
  font-size: 40px;
  margin-bottom: 40px;
  font-weight: 700;
}

.button_container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 500px;
}

.button {
  background-color: white;
  padding: 10px 20px;
  color: #dd1264;
  border: none;
  border-radius: 10px;
  margin: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #ffd6e0;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 200px;
  height: 100px;
  color: black;
  background-color: #fddddb;
  border-radius: 10px;
  margin: 10px;
  font-weight: 700;
  padding-top: 20px;
  text-align: center;
}

//src/App.js
import ShowHide from './components/ShowHide'

import './App.css'

const App = () => <ShowHide />

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
