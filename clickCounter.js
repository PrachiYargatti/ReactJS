//src/components/ClickCounter/index.js
import {Component} from 'react'
import './index.css'

class ClickCounter extends Component {
  state = {count: 0}

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    const {count} = this.state
    return (
      <div className="container">
        <h1 className="head">
          The Button has been clicked <span className="count">{count}</span>{' '}
          times
        </h1>
        <p className="para">Click the button to increase the count!</p>
        <button className="button" type="button" onClick={this.onIncrement}>
          Click Me!
        </button>
      </div>
    )
  }
}

export default ClickCounter

//src/components/ClickCounter/index.css
/* Write your CSS here */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f8;
  height: 100vh;
  margin: 0;
  font-family: Roboto;
}
.button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 3px;
}
.head {
  color: #2d3a35;
  font-size: 40px;
}
.para {
  color: #2d3a35;
  font-size: 15px;
}
.count {
  color: #c20a72;
}

//src/App.js
import ClickCounter from './components/ClickCounter'

import './App.css'

const App = () => <ClickCounter />

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
