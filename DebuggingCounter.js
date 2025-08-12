//src/components/Counter/index.js
import {Component} from 'react'
import './index.css'

class Counter extends Component {
  state = {count: 0}

  onDecrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  onIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    const {count} = this.state

    return (
      <div className="app-container">
        <h1 className="count">Count {count}</h1>
        <button className="button" onClick={this.onIncrement} type="button">
          Increase
        </button>
        <button className="button" onClick={this.onDecrement} type="button">
          Decrease
        </button>
      </div>
    )
  }
}

export default Counter

//src//components/Counter/index.css
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.count {
  font-size: 80px;
  font-family: 'Roboto';
  color: #2e3e4e;
  margin-top: 8px;
  margin-bottom: 20px;
}

.button {
  font-size: 16px;
  font-weight: 400;
  font-family: 'Roboto';
  color: #ffffff;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 15px;
  padding-left: 15px;
  margin: 8px;
  background-color: #7c69e9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

//src/App.js
import Counter from './components/Counter'

import './App.css'

const App = () => <Counter />

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
