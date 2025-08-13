//src/components/CashWithdrawal/index.js
import {Component} from 'react'

import DenominationItem from '../DenominationItem'

import './index.css'

class CashWithdrawal extends Component {
  state = {
    balance: 2000,
  }

  updateBalance = value => {
    this.setState(prevState => ({balance: prevState.balance - value}))
  }

  render() {
    const {denominationsList} = this.props
    const {balance} = this.state
    const name = 'Sarah Williams'
    const initial = name.slice(0, 1)

    return (
      <div className="app-container">
        <div className="cash-withdrawal-container">
          <div className="user-details-container">
            <div className="initial-container">
              <p className="initial">{initial}</p>
            </div>
            <p className="name">{name}</p>
          </div>
          <div className="balance-container">
            <p className="your-balance">Your Balance</p>
            <p className="balance">
              {balance}
              <br />
              <span className="currency">In Rupees</span>
            </p>
          </div>
          <p className="withdraw">Withdraw</p>
          <p className="choose-sum">CHOOSE SUM (IN RUPEES)</p>
          <ul className="denominations-list">
            {denominationsList.map(eachDenomination => (
              <DenominationItem
                key={eachDenomination.id}
                denominationDetails={eachDenomination}
                updateBalance={this.updateBalance}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default CashWithdrawal

//src/components/CashWithdrawal/index.css
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.cash-withdrawal-container {
  background-color: #150b3e;
  width: 80%;
  border-radius: 16px;
  padding-top: 24px;
  padding-left: 18px;
  padding-bottom: 8px;
  padding-right: 18px;
  max-width: 350px;
}

@media screen and (min-width: 768px) {
  .cash-withdrawal-container {
    width: 50%;
    padding-top: 48px;
    padding-left: 36px;
    padding-bottom: 16px;
    padding-right: 36px;
    max-width: 422px;
  }
}

.user-details-container {
  display: flex;
}

.initial-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c7d2fe;
  height: 48px;
  width: 48px;
  border-radius: 24px;
}

@media screen and (min-width: 768px) {
  .initial-container {
    height: 64px;
    width: 64px;
    border-radius: 32px;
  }
}

.initial {
  color: #7c3aed;
  font-family: 'Roboto';
  font-size: 14px;
}

.name {
  color: #d4d2db;
  font-family: 'Roboto';
  font-size: 16px;
  margin-left: 8px;
}

@media screen and (min-width: 768px) {
  .name {
    font-size: 20px;
    margin-left: 16px;
  }
}

.balance-container {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.your-balance {
  color: #585076;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
}

@media screen and (min-width: 768px) {
  .your-balance {
    font-size: 20px;
    margin-top: 8px;
  }
}

.balance {
  color: #d4d2db;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}

@media screen and (min-width: 768px) {
  .balance {
    font-size: 32px;
  }
}

.currency {
  color: #585076;
  font-size: 12px;
  font-weight: 500;
}

@media screen and (min-width: 768px) {
  .currency {
    font-size: 12px;
  }
}

.withdraw {
  color: #d4d2db;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  margin-top: 16px;
}

@media screen and (min-width: 768px) {
  .withdraw {
    font-size: 24px;
    margin-top: 24px;
  }
}

.choose-sum {
  color: #585076;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
}

@media screen and (min-width: 768px) {
  .choose-sum {
    font-size: 16px;
    margin-bottom: 24px;
  }
}

.denominations-list {
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

//src/components/DenominationItem/index.js
import './index.css'

const DenominationItem = props => {
  const {denominationDetails, updateBalance} = props
  const {value} = denominationDetails

  const onClickDenomination = () => {
    updateBalance(value)
  }

  return (
    <li className="denomination-item">
      <button
        type="button"
        className="denomination-button"
        onClick={onClickDenomination}
      >
        {value}
      </button>
    </li>
  )
}

export default DenominationItem

//src/components/DenominationItem/index.css
.denomination-item {
  list-style-type: none;
  width: 48%;
  margin-bottom: 16px;
}

.denomination-button {
  background-color: #382f5a;
  color: #d4d2db;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: pointer;
  outline: none;
}

@media screen and (min-width: 768px) {
  .denomination-button {
    font-size: 24px;
  }
}

//src.App.js
import CashWithdrawal from './components/CashWithdrawal'

import './App.css'

const denominationsList = [
  {
    id: 1,
    value: 50,
  },
  {
    id: 2,
    value: 100,
  },
  {
    id: 3,
    value: 200,
  },
  {
    id: 4,
    value: 500,
  },
]

const App = () => <CashWithdrawal denominationsList={denominationsList} />

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
