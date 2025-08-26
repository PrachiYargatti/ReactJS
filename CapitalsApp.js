//src/components/Capitals/index.js
import {Component} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

class Capitals extends Component {
  state = {
    selectedCapitalId: countryAndCapitalsList[0].id,
  }

  onChangeCapital = event => {
    this.setState({selectedCapitalId: event.target.value})
  }

  getCountry = () => {
    const {selectedCapitalId} = this.state
    const selectedItem = countryAndCapitalsList.find(
      each => each.id === selectedCapitalId,
    )
    return selectedItem.country
  }

  render() {
    const {selectedCapitalId} = this.state
    const country = this.getCountry()

    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="heading">Countries And Capitals</h1>
          <div className="dropdown-row">
            <select
              className="dropdown"
              value={selectedCapitalId}
              onChange={this.onChangeCapital}
            >
              {countryAndCapitalsList.map(eachItem => (
                <option key={eachItem.id} value={eachItem.id}>
                  {eachItem.capitalDisplayText}
                </option>
              ))}
            </select>
            <p className="question">is capital of which country?</p>
          </div>
          <p className="answer">{country}</p>
        </div>
      </div>
    )
  }
}

export default Capitals

//src/components/Capitals/index.css
.bg-container {
  background-color: #93c5fd;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}

.card {
  background-color: #f8fafc;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 420px;
  max-width: 95%;
}

.heading {
  color: #1e293b;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.dropdown-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.dropdown {
  padding: 10px 14px;
  border: 1px solid #cbd2d9;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
  min-width: 160px;
  cursor: pointer;
  background-color: #ffffff;
}

.dropdown:focus {
  border-color: #1e293b;
  outline: none;
}

.question {
  color: #323f4b;
  font-size: 16px;
  margin-top: 10px;
}

.answer {
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
}

//src/App.js
import Capitals from './components/Capitals'

import './App.css'

const App = () => <Capitals />

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
