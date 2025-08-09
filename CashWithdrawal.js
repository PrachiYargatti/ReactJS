//src/components/CashWithdrawal/index.js
import {Component} from 'react'
import DenominationItem from '../DenominationItem'
import './index.css'

class CashWithdrawal extends Component {
  state = {balance: 2000}

  updateBalance = value => {
    this.setState(prevState => ({balance: prevState.balance - value}))
  }

  render() {
    const {denominationsList} = this.props
    const {balance} = this.state

    return (
      <div className="app-container">
        <div className="card-container">
          <div className="profile-section">
            <div className="profile-logo">S</div>
            <h1 className="profile-name">Sarah Williams</h1>
          </div>

          <div className="balance-section">
            <p className="balance-label">Your Balance</p>
            <div className="balance-amount-container">
              <p className="balance-amount">{balance}</p>
              <p className="balance-currency">In Rupees</p>
            </div>
          </div>

          <div className="withdraw-section">
            <p className="withdraw-title">Withdraw</p>
            <p className="choose-label">CHOOSE SUM (IN RUPEES)</p>
            <ul className="denominations-list">
              {denominationsList.map(each => (
                <DenominationItem
                  key={each.id}
                  each={each}
                  updateBalance={this.updateBalance}
                />
              ))}
            </ul>
          </div>
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
  min-height: 100vh;
  background-color: #ffffff;
}

.card-container {
  background-color: #150b3e;
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  color: #ffffff;
}

.profile-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-logo {
  background-color: #c7d2fe;
  color: #7c3aed;
  font-weight: bold;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 18px;
}

.profile-name {
  font-size: 18px;
}

.balance-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.balance-label {
  color: #585076;
}

.balance-amount-container {
  text-align: right;
}

.balance-amount {
  font-size: 22px;
  font-weight: bold;
}

.balance-currency {
  font-size: 12px;
  color: #585076;
}

.withdraw-section {
  margin-top: 20px;
}

.withdraw-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.choose-label {
  color: #585076;
  font-size: 12px;
  margin-bottom: 15px;
}

.denominations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  list-style-type: none;
}

//src/components/DenominationItem/index.js
import './index.css'

const DenominationItem = props => {
  const {each, updateBalance} = props
  const {value} = each

  const onClickDenomination = () => {
    updateBalance(value)
  }

  return (
    <li>
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
.denomination-button {
  background-color: transparent;
  border: 1px solid #c4c4c4;
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.denomination-button:hover {
  background-color: #382f5a;
}

.denomination-button:active {
  background-color: #7c3aed;
}

.denomination-button:focus {
  outline: none;
}

//src/App.js
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
