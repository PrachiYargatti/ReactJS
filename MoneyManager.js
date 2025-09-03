//src/App.js
import MoneyManager from './components/MoneyManager'

import './App.css'

const App = () => <MoneyManager />

export default App

//src/components/MoneyManager/index.js
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    if (titleInput === '' || amountInput === '') return

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: optionId,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteTransaction = id => {
    this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        each => each.id !== id,
      ),
    }))
  }

  getIncome = () => {
    const {transactionsList} = this.state
    return transactionsList
      .filter(each => each.type === 'INCOME')
      .reduce((acc, each) => acc + each.amount, 0)
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    return transactionsList
      .filter(each => each.type === 'EXPENSES')
      .reduce((acc, each) => acc + each.amount, 0)
  }

  getBalance = () => this.getIncome() - this.getExpenses()

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    const income = this.getIncome()
    const expenses = this.getExpenses()
    const balance = this.getBalance()

    return (
      <div className="app-container">
        <div className="welcome-card">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <MoneyDetails balance={balance} income={income} expenses={expenses} />

        <div className="transactions-section">
          <form className="add-transaction" onSubmit={this.onAddTransaction}>
            <h2>Add Transaction</h2>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              value={titleInput}
              onChange={this.onChangeTitle}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              value={amountInput}
              onChange={this.onChangeAmount}
            />
            <label htmlFor="type">TYPE</label>
            <select id="type" value={optionId} onChange={this.onChangeType}>
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>

          <div className="history">
            <h2>History</h2>
            <div className="history-headers">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {transactionsList.map(each => (
                <TransactionItem
                  key={each.id}
                  transaction={each}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

//src/components/MoneyManager/index.css
.app-container {
  font-family: Roboto, sans-serif;
  padding: 20px;
  background-color: #f9fafc;
  min-height: 100vh;
}

.welcome-card {
  background-image: url('https://assets.ccbp.in/frontend/react-js/money-manager/money-manager-bg.png');
  background-size: cover;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.welcome-card h1 {
  color: #1e293b;
  margin: 0;
}

.welcome-card p {
  color: #475569;
  margin-top: 8px;
}

.welcome-card span {
  color: #0b69ff;
  font-weight: 500;
}

.transactions-section {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.add-transaction,
.history {
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #d7dfe9;
  border-radius: 12px;
  padding: 20px;
  min-width: 280px;
}

.add-transaction h2,
.history h2 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #1e293b;
}

.add-transaction label {
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 4px;
  display: block;
  color: #334155;
}

.add-transaction input,
.add-transaction select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 14px;
  outline: none;
}

.add-transaction button {
  background-color: #0b69ff;
  color: #fff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
}

.add-transaction button:hover {
  background-color: #0958d9;
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d7dfe9;
  padding: 8px 0;
}

.history li:first-child {
  font-weight: 500;
  color: #334155;
}

.history {
  margin-top: 20px;
}

.history h2 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 12px;
  font-weight: 600;
}

.history-headers {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #f1f5f9;
  border: 1px solid #d7dfe9;
  border-radius: 6px;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

.history-headers p {
  flex: 1;
  margin: 0;
}

.history-headers p:nth-child(2) {
  text-align: center; /* Amount column */
}

.history-headers p:nth-child(3) {
  text-align: right; /* Type column */
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #d7dfe9;
  border-top: none;
  border-radius: 0 0 6px 6px;
}

//src/components/MoneyDetails/index.js
import './index.css'

const MoneyDetails = ({balance, income, expenses}) => (
  <div className="money-details">
    <div className="card balance">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        alt="balance"
      />
      <p>Your Balance</p>
      <p data-testid="balanceAmount">Rs {balance}</p>
    </div>

    <div className="card income">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        alt="income"
      />
      <p>Your Income</p>
      <p data-testid="incomeAmount">Rs {income}</p>
    </div>

    <div className="card expenses">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        alt="expenses"
      />
      <p>Your Expenses</p>
      <p data-testid="expensesAmount">Rs {expenses}</p>
    </div>
  </div>
)

export default MoneyDetails

//src/components/MoneyDetails/index.css
.money-details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.money-details .card {
  flex: 1;
  min-width: 200px;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #fff;
}

.money-details .card img {
  width: 40px;
  height: 40px;
}

.money-details .card p {
  margin: 0;
  font-size: 14px;
  color: #475569;
}

.money-details .card p:last-child {
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
}

.balance {
  background-color: #ecfccb;
  border: 1px solid #84cc16;
}

.income {
  background-color: #cffafe;
  border: 1px solid #06b6d4;
}

.expenses {
  background-color: #ede9fe;
  border: 1px solid #7c3aed;
}

//src/components/TransactionItem/index.js
import './index.css'

const TransactionItem = ({transaction, onDeleteTransaction}) => {
  const {id, title, amount, type} = transaction

  const handleDelete = () => onDeleteTransaction(id)

  return (
    <li className="transaction-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" onClick={handleDelete} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem

//src/components/TransactionItem/index.css
.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #d7dfe9;
}

.transaction-item p {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #475569;
}

.transaction-item button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.transaction-item button img {
  width: 18px;
  height: 18px;
}
