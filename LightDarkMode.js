//src/components/LightDarkMode/index.js
import {Component} from 'react'
import './index.css'

class LightDarkMode extends Component {
  state = {status: 'Light Mode'}

  onToggleMode = () => {
    this.setState(prevState => ({
      status: prevState.status === 'Dark Mode' ? 'Light Mode' : 'Dark Mode',
    }))
  }

  render() {
    const {status} = this.state
    const isDark = status === 'Dark Mode'
    const headClassName = isDark ? 'darkModeHead' : 'lightModeHead'
    const card = isDark ? 'darkCard' : 'lightCard'

    return (
      <div className="container">
        <div className={`card ${card}`}>
          <h1 className={headClassName}>Click To Change Mode</h1>
          <button onClick={this.onToggleMode} type="button" className="button">
            {status}
          </button>
        </div>
      </div>
    )
  }
}
export default LightDarkMode

//src/components/LightDarkMode/index.css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 100vh;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 3px solid black;
  border-radius: 10px;
}
.darkModeHead {
  color: black;
  font-size: 40px;
  font-family: Roboto;
}
.darkCard {
  background-color: white;
}
.button {
  background-color: #ffffff;
  font-family: Roboto;
  padding: 8px;
  border: 3px black solid;
  color: black;
  border-radius: 3px;
}
.lightModeHead {
  color: white;
  font-size: 40px;
  font-family: Roboto;
}
.lightCard {
  background-color: black;
}

//src/App.js
import LightDarkMode from './components/LightDarkMode'

import './App.css'

const App = () => <LightDarkMode />

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
