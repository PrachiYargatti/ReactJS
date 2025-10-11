//index.js
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

//App.js
import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

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

//Home/index.js
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <button type="button" className="shop-now-button">
          Shop Now
        </button>
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        alt="dresses to be noticed"
        className="home-desktop-img"
      />
    </div>
  </>
)

export default Home

//Home/index.css
.home-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 10%;
  background-color: #ffffff;
  min-height: 90vh;
  font-family: 'Roboto';
}

.home-content {
  width: 45%;
}

.home-heading {
  color: #1e293b;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
}

.home-description {
  color: #475569;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 25px;
}

.shop-now-button {
  background-color: #0b69ff;
  color: #ffffff;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
}

.shop-now-button:hover {
  background-color: #0967d2;
}

.home-desktop-img {
  width: 45%;
}

.home-mobile-img {
  display: none;
  width: 100%;
}

@media screen and (max-width: 992px) {
  .home-container {
    padding: 30px;
  }
}

@media screen and (max-width: 768px) {
  .home-container {
    flex-direction: column;
    text-align: center;
  }

  .home-content {
    width: 100%;
    order: 2;
  }

  .home-desktop-img {
    display: none;
  }

  .home-mobile-img {
    display: block;
    margin-bottom: 20px;
  }

  .home-heading {
    font-size: 28px;
  }
}

//Header/index.js
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="nav-content">
      <img
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
      <ul className="nav-menu">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/products" className="nav-link">
          <li>Products</li>
        </Link>
        <Link to="/cart" className="nav-link">
          <li>Cart</li>
        </Link>
      </ul>
      <button type="button" className="logout-desktop-btn">
        Logout
      </button>
      <button type="button" className="logout-mobile-btn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
          alt="logout icon"
          className="logout-icon"
        />
      </button>
    </div>
  </nav>
)
export default Header

//Header/index.css
.nav-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  height: 10vh;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
}

.nav-content {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.website-logo {
  width: 120px;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: #475569;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  margin-right: 25px;
}

.nav-link:hover {
  color: #0967d2;
}

.logout-desktop-btn {
  background-color: #0b69ff;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}

.logout-desktop-btn:hover {
  background-color: #0967d2;
}

.logout-mobile-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.logout-icon {
  width: 24px;
}

@media screen and (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .logout-desktop-btn {
    display: none;
  }
  .logout-mobile-btn {
    display: block;
  }
  .website-logo {
    width: 100px;
  }
}

//LoginForm/index.js
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Enter Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter Username"
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm

//LoginForm/index.css
.login-form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px;
}

.login-image {
  width: 250px;
  margin-bottom: 20px;
}

.login-website-logo-mobile-image {
  width: 150px;
  margin-bottom: 20px;
}

.login-website-logo-desktop-image {
  display: none;
}

.form-container {
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 350px;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-label {
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 8px;
}

.username-input-field,
.password-input-field {
  height: 36px;
  padding: 8px 12px;
  border: 1px solid #d7dfe9;
  border-radius: 5px;
  font-size: 14px;
  color: #1e293b;
  font-family: 'Roboto';
  outline: none;
}

.login-button {
  background-color: #0b69ff;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  height: 36px;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
}

.login-button:hover {
  background-color: #0967d2;
}

.error-message {
  color: #ff0b37;
  font-size: 12px;
  font-family: 'Roboto';
  margin-top: 8px;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .login-form-container {
    flex-direction: row;
    justify-content: space-around;
    padding: 50px;
  }

  .login-image {
    width: 400px;
    margin-right: 40px;
  }

  .login-website-logo-mobile-image {
    display: none;
  }

  .login-website-logo-desktop-image {
    display: block;
    width: 180px;
    margin-bottom: 25px;
    align-self: center;
  }

  .form-container {
    max-width: 400px;
  }
}

//NotFound/index.js
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
  </div>
)

export default NotFound

//NotFound/index.css
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
.not-found-img {
  width: 400px;
}
