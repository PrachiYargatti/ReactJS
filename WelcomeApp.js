//src/components/Welcome/index.js
import {Component} from 'react'
import './index.css'

class Welcome extends Component {
  state = {status: 'Subscribe'}

  onSubscription = () => {
    const {status} = this.state
    this.setState({
      status: status === 'Subscribe' ? 'Subscribed' : 'Subscribe',
    })
  }

  render() {
    const {status} = this.state

    return (
      <div className="container">
        <h1 className="head">Welcome</h1>
        <p className="para">Thank you! Happy Learning</p>
        <button onClick={this.onSubscription} type="button" className="button">
          {status}
        </button>
      </div>
    )
  }
}

export default Welcome

//src/components/Welcome/index.css
/* Write your CSS here */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1e293b;
  height: 100vh;
  margin: 0;
}
.head {
  color: #f0bb03;
  font-size: 40px;
  font-family: Bree Serif;
}
.para {
  color: #ffffff;
  font-size: 15px;
  font-family: Bree Serif;
}
.button {
  color: black;
  background-color: white;
  padding: 8px;
  border: 0;
  border-radius: 10px;
  font-family: Bree Serif;
}

//src/App.js
import Welcome from './components/Welcome'

import './App.css'

const App = () => <Welcome />

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
