//index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

//App.js
import RegistrationForm from './components/RegistrationForm'
import './App.css'

const App = () => <RegistrationForm />

export default App

//App.css
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

//RegistrationForm/index.js
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    firstNameError: false,
    lastNameError: false,
    isSubmitted: false,
  }

  onBlurFirstName = event => {
    if (event.target.value === '') {
      this.setState({firstNameError: true})
    } else {
      this.setState({firstNameError: false})
    }
  }

  onBlurLastName = event => {
    if (event.target.value === '') {
      this.setState({lastNameError: true})
    } else {
      this.setState({lastNameError: false})
    }
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state

    if (firstName === '' && lastName === '') {
      this.setState({
        firstNameError: true,
        lastNameError: true,
        isSubmitted: false,
      })
    } else if (firstName === '') {
      this.setState({firstNameError: true, isSubmitted: false})
    } else if (lastName === '') {
      this.setState({lastNameError: true, isSubmitted: false})
    } else {
      this.setState({isSubmitted: true})
    }
  }

  onSubmitAnotherResponse = () => {
    this.setState({
      firstName: '',
      lastName: '',
      firstNameError: false,
      lastNameError: false,
      isSubmitted: false,
    })
  }

  renderRegistrationForm = () => {
    const {firstName, lastName, firstNameError, lastNameError} = this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <label htmlFor="firstname" className="label">
          FIRST NAME
        </label>
        <input
          id="firstname"
          type="text"
          placeholder="First name"
          value={firstName}
          className="input"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
        {firstNameError && <p className="error-msg">Required</p>}

        <label htmlFor="lastname" className="label">
          LAST NAME
        </label>
        <input
          id="lastname"
          type="text"
          placeholder="Last name"
          value={lastName}
          className="input"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
        {lastNameError && <p className="error-msg">Required</p>}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }

  renderSuccessView = () => (
    <div className="success-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-icon"
      />
      <p className="success-text">Submitted Successfully</p>
      <button
        type="button"
        className="submit-btn"
        onClick={this.onSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isSubmitted} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Registration</h1>
        <div className="form-card">
          {isSubmitted
            ? this.renderSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm

//RegistrationForm/index.css
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fef2f4;
}

.heading {
  color: #ea580c;
  font-family: Roboto;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
}

.form-card {
  background-color: #ffffff;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
  border-radius: 12px;
  padding: 40px;
  width: 400px;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.label {
  color: #475569;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 10px;
}

.input {
  border: 1px solid #cbd2d9;
  border-radius: 4px;
  height: 36px;
  padding: 8px;
  font-size: 14px;
  font-family: Roboto;
  outline: none;
}

.error-msg {
  color: #ff0b37;
  font-size: 12px;
  margin: 2px 0 0 0;
  font-family: Roboto;
}

.submit-btn {
  background-color: #ea580c;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-top: 20px;
  cursor: pointer;
  outline: none;
}

.success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon {
  width: 60px;
  margin-bottom: 15px;
}

.success-text {
  font-family: Roboto;
  color: #475569;
  font-size: 18px;
  margin-bottom: 20px;
}
