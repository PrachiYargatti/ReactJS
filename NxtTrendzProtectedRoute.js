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
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/products" component={Products} />
    <ProtectedRoute exact path="/cart" component={Cart} />
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

//Cart/index.js
import Header from '../Header'

import './index.css'

const Cart = () => (
  <>
    <Header />
    <div className="cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        alt="cart"
        className="cart-img"
      />
    </div>
  </>
)

export default Cart

//Cart/index.css
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.cart-img {
  width: 150px;
}

//Header/index.js
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)

//Header/index.css
.nav-header {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgb(243, 243, 243);
}

@media screen and (max-width: 767px) {
  .nav-header {
    flex-direction: column;
    align-items: center;
    border-bottom-style: none;
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1110px;
  padding-top: 25px;
  padding-bottom: 25px;
}
@media screen and (max-width: 767px) {
  .nav-content {
    flex-direction: column;
  }
}

.nav-bar-mobile-logo-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .nav-bar-mobile-logo-container {
    display: none;
  }
}

.nav-bar-large-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1110px;
}

@media screen and (max-width: 767px) {
  .nav-bar-large-container {
    display: none;
  }
}

.website-logo {
  width: 110px;
}

@media screen and (min-width: 768px) {
  .website-logo {
    width: 165px;
  }
}

.nav-menu {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-self: flex-end;
  flex: 1;
  list-style-type: none;
  margin-top: 0px;
  margin-bottom: 0px;
}

@media screen and (max-width: 767px) {
  .nav-menu {
    display: none;
  }
}
.nav-menu-mobile {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .nav-menu-mobile {
    display: none;
  }
}

.nav-menu-list-mobile {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  background-color: #e6f6ff;
  flex: 1;
  list-style-type: none;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0px;
}

.nav-menu-item {
  font-family: 'Roboto';
  margin: 10px;
  font-weight: 400;
  font-size: 16px;
}

.nav-link {
  text-decoration: none;
  color: #475569;
}

.nav-menu-item-mobile {
  margin: 0px;
  cursor: pointer;
}

.logout-desktop-btn {
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 10px;
  padding: 8px 16px;
  color: #ffffff;
  background-color: #0967d2;
  border: none;
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
  outline: none;
}

@media screen and (max-width: 767px) {
  .logout-desktop-btn {
    display: none;
  }
}

.nav-mobile-btn {
  border: none;
  padding: 0px;
  background: transparent;
  cursor: pointer;
  outline: none;
}

@media screen and (min-width: 768px) {
  .nav-mobile-btn {
    display: none;
  }
}

.nav-bar-img {
  width: 24px;
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
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
  </>
)

export default Home

//Home/index.css
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 50px;
  width: 90%;
  max-width: 1110px;
}

@media screen and (min-width: 768px) {
  .home-container {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 50px;
  }
}

.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-width: 768px) {
  .home-content {
    align-items: flex-start;
  }
}

.home-mobile-img {
  width: 206px;
}

@media screen and (min-width: 768px) {
  .home-mobile-img {
    display: none;
  }
}

.home-desktop-img {
  width: 50%;
  max-width: 450px;
  margin-left: 85px;
}

@media screen and (max-width: 767px) {
  .home-desktop-img {
    display: none;
  }
}

.home-heading {
  font-family: 'Roboto';
  font-weight: bold;
  margin-top: 0px;
  font-size: 36px;
  color: #1e293b;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .home-heading {
    font-size: 46px;
    text-align: left;
  }
}

.home-description {
  font-family: 'Roboto';
  margin-top: 36px;
  font-size: 14px;
  line-height: 28px;
  color: #64748b;
  margin-bottom: 0px;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .home-description {
    font-size: 18px;
    margin-top: 0px;
    text-align: left;
  }
}

.shop-now-button {
  width: 60%;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Roboto';
  color: #ffffff;
  border: none;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 6px;
  background-color: #0967d2;
  margin-top: 20px;
  cursor: pointer;
  outline: none;
}

@media screen and (min-width: 768px) {
  .shop-now-button {
    width: 150px;
    font-size: 16px;
  }
}

//LoginForm/index.js
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
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
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
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
          placeholder="Password"
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
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
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
  height: 100vh;
  width: 90%;
  max-width: 1110px;
  margin: auto;
}

@media screen and (min-width: 992px) {
  .login-form-container {
    flex-direction: row;
    justify-content: space-around;
  }
}

.login-website-logo-mobile-img {
  width: 165px;
  margin-top: 50px;
  margin-bottom: 35px;
}

@media screen and (min-width: 992px) {
  .login-website-logo-mobile-img {
    display: none;
  }
}

.login-img {
  width: 278px;
}

@media screen and (min-width: 992px) {
  .login-img {
    width: 60%;
    max-width: 524px;
    flex-shrink: 1;
    margin-right: 20px;
  }
}

.login-website-logo-desktop-img {
  width: 185px;
}

@media screen and (max-width: 991px) {
  .login-website-logo-desktop-img {
    display: none;
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
}

@media screen and (min-width: 992px) {
  .form-container {
    width: 350px;
    flex-shrink: 0;
    box-shadow: 0px 8px 40px rgba(7, 7, 7, 0.08);
    padding: 64px 48px 64px 48px;
  }
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
}

.input-label {
  margin-bottom: 0px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #475569;
}

.username-input-field {
  font-size: 14px;
  height: 40px;
  border: 1px solid #d7dfe9;
  background-color: #e2e8f0;
  color: #64748b;
  border-radius: 2px;
  margin-top: 5px;
  padding: 8px 16px 8px 16px;
}

.password-input-field {
  font-size: 14px;
  height: 40px;
  border: 1px solid #d7dfe9;
  background-color: #e2e8f0;
  color: #64748b;
  border-radius: 2px;
  margin-top: 5px;
  padding: 8px 16px 8px 16px;
}

.login-button {
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  height: 40px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 2px;
  background-color: #0b69ff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  outline: none;
}

.error-message {
  align-self: start;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 0px;
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 16px;
  color: #ff0b37;
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

//Products/index.js
import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-img.png"
        alt="products"
        className="products-img"
      />
    </div>
  </>
)

export default Products

//Products/index.css
.products-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.products-img {
  width: 150px;
}

//ProtectedRoute/index.js
import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
