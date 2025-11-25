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

//context/CartContext.js
import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
})

export default CartContext

//App.js
import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  deleteCartItem = () => {}

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

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

//LoginForm/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

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
      path: '/',
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

.login-website-logo-mobile-image {
  width: 165px;
  margin-top: 50px;
  margin-bottom: 35px;
}

@media screen and (min-width: 992px) {
  .login-website-logo-mobile-image {
    display: none;
  }
}

.login-image {
  width: 278px;
}

@media screen and (min-width: 992px) {
  .login-image {
    width: 60%;
    max-width: 524px;
    flex-shrink: 1;
    margin-right: 20px;
  }
}

.login-website-logo-desktop-image {
  width: 185px;
}

@media screen and (max-width: 991px) {
  .login-website-logo-desktop-image {
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
  outline: none;
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
  outline: none;
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
  outline: none;
  cursor: pointer;
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
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>

          <button type="button" className="nav-mobile-btn">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-image"
              onClick={onClickLogout}
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
          </Link>
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
                className="nav-bar-image"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-image"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-image"
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

@media screen and (max-width: 768px) {
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
@media screen and (max-width: 768px) {
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
  text-decoration: none;
  margin: 10px;
  font-weight: 400;
  font-size: 16px;
}

.nav-link {
  display: flex;
  align-items: center;
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
.nav-mobile-btn-container {
  display: flex;
  justify-content: center;
  width: 25%;
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

.nav-bar-image {
  width: 24px;
}

.cart-count-badge {
  background-color: #bfdbfe;
  color: #0967d2;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 500;
  border-radius: 50%;
  padding-left: 5px;
  padding-top: 2px;
  padding-right: 5px;
  padding-bottom: 2px;
  margin-left: 8px;
}

@media screen and (min-width: 768px) {
  .cart-count-badge {
    background-color: #e6f6ff;
  }
}

//Home/index.js
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
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
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button type="button" className="shop-now-button">
              Shop Now
            </button>
          </Link>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="home-desktop-img"
        />
      </div>
    </>
  )
}

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
    padding-top: 96px;
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
  color: #1e293b;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 30px;
  line-height: 1.2;
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
  margin-bottom: 0;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .home-description {
    font-size: 18px;
    margin-top: 0;
    text-align: left;
  }
}

.shop-now-button {
  font-size: 14px;
  font-weight: 400;
  font-family: 'Roboto';
  color: white;
  border: none;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 6px;
  background-color: #0967d2;
  margin-top: 20px;
  outline: none;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .shop-now-button {
    width: 150px;
    font-size: 16px;
  }
}

//PrimeDealsSection/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PrimeDealsSection extends Component {
  state = {
    primeDeals: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.prime_deals.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        primeDeals: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPrimeDealsListView = () => {
    const {primeDeals} = this.state
    return (
      <div>
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  renderLoadingView = () => (
    <div className="primedeals-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsListView()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default PrimeDealsSection

//PrimeDealsSection/index.css
.primedeals-list-heading {
  color: #475569;
  font-family: 'Roboto';
  font-size: 32px;
  font-weight: 500;
  margin-top: 48px;
}

.primedeals-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
}

.register-prime-image {
  margin-top: 30px;
}

.primedeals-loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

//AllProductsSection/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    searchInput: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, activeCategoryId, searchInput, activeRatingId} =
      this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeCategoryId: '',
        activeRatingId: '',
      },
      this.getProducts,
    )
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.getProducts)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProducts)
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderProductsListView = () => {
    const {productsList, activeOptionId} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeCategoryId, searchInput, activeRatingId} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection

//AllProductsSection/index.css
.all-products-section {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .all-products-section {
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 100px;
  }
}

@media screen and (min-width: 768px) {
  .all-products-container {
    margin-left: 30px;
    width: 70%;
  }
}

.products-heading {
  color: #475569;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
}

@media screen and (min-width: 768px) {
  .products-heading {
    font-size: 32px;
  }
}

.products-loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

@media screen and (min-width: 768px) {
  .products-loader-container {
    width: 70%;
  }
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
}

.no-products-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 64px;
  margin-top: 48px;
}

@media screen and (min-width: 768px) {
  .no-products-view {
    margin-left: 30px;
    width: 70%;
    padding-bottom: 0;
    margin-top: 0px;
  }
}

.no-products-img {
  width: 250px;
  height: 180px;
}

@media screen and (min-width: 768px) {
  .no-products-img {
    width: 459px;
    height: 315px;
  }
}

.no-products-heading {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3px;
}

@media screen and (min-width: 768px) {
  .no-products-heading {
    margin-top: 32px;
    font-size: 24px;
  }
}

.no-products-description {
  text-align: center;
  color: #64748b;
  font-family: 'Roboto';
  font-size: 14px;
  width: 90%;
  max-width: 288px;
  line-height: 1.3;
}

@media screen and (min-width: 768px) {
  .no-products-description {
    margin-top: 12px;
    font-size: 18px;
    width: 60%;
    max-width: 466px;
  }
}

.products-error-view-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  padding-bottom: 64px;
}

@media screen and (min-width: 768px) {
  .products-error-view-container {
    margin-top: 0px;
    margin-left: 30px;
    width: 70%;
    padding-bottom: 0;
  }
}

.products-failure-img {
  width: 250px;
  height: 200px;
}

@media screen and (min-width: 768px) {
  .products-failure-img {
    width: 400px;
    height: 350px;
  }
}

.product-failure-heading-text {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
}

@media screen and (min-width: 768px) {
  .product-failure-heading-text {
    font-size: 24px;
  }
}

.products-failure-description {
  text-align: center;
  color: #64748b;
  font-family: 'Roboto';
  font-size: 14px;
  width: 90%;
  max-width: 288px;
  line-height: 1.3;
}

@media screen and (min-width: 768px) {
  .products-failure-description {
    font-size: 18px;
    width: 60%;
    max-width: 466px;
  }
}

//FiltersGroup/index.js
import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const renderRatingsFiltersList = () => {
    const {ratingsList} = props

    return ratingsList.map(rating => {
      const {changeRating, activeRatingId} = props
      const onClickRatingItem = () => changeRating(rating.ratingId)

      const ratingClassName =
        activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`

      return (
        <li
          className="rating-item"
          key={rating.ratingId}
          onClick={onClickRatingItem}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-image"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    const {categoryOptions} = props

    return categoryOptions.map(category => {
      const {changeCategory, activeCategoryId} = props
      const onClickCategoryItem = () => changeCategory(category.categoryId)
      const isActive = category.categoryId === activeCategoryId
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : `category-name`

      return (
        <li
          className="category-item"
          key={category.categoryId}
          onClick={onClickCategoryItem}
        >
          <p className={categoryClassName}>{category.name}</p>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  const {clearFilters} = props

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingsFilters()}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup

//FiltersGroup/index.css
.filters-group-container {
  margin-top: 16px;
}

@media screen and (min-width: 768px) {
  .filters-group-container {
    width: 25%;
    max-width: 280px;
    min-width: 240px;
    margin-top: 48px;
    flex-shrink: 0;
  }
}

.search-input-container {
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border-radius: 8px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
}

.search-input {
  background-color: #f1f5f9;
  color: #0f172a;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  border: none;
  outline: none;
  flex-grow: 1;
}

.search-icon {
  color: #475569;
  width: 20px;
  height: 20px;
}

.category-heading {
  color: #12022f;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 700;
  margin-top: 24px;
}

@media screen and (min-width: 768px) {
  .category-heading {
    margin-top: 32px;
  }
}

.categories-list {
  padding-left: 0;
}

.category-item {
  list-style-type: none;
  margin-top: 16px;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .category-item {
    margin-top: 24px;
  }
}

.category-name {
  color: #64748b;
  font-family: 'Roboto';
  font-size: 16px;
}

@media screen and (min-width: 768px) {
  .category-name {
    font-size: 18px;
  }
}

.active-category-name {
  color: #0967d2;
}

.rating-heading {
  color: #12022f;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 700;
  margin-top: 32px;
  margin-bottom: 18px;
}

.ratings-list {
  padding-left: 0px;
}

.rating-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
}

.rating-image {
  max-width: 152px;
  height: 20px;
}

@media screen and (min-width: 768px) {
  .rating-image {
    height: 24px;
  }
}

.and-up {
  color: #64748b;
  font-family: Roboto;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 0;
  margin-top: 0;
}

@media screen and (min-width: 768px) {
  .and-up {
    font-size: 18px;
    margin-left: 14px;
  }
}

.active-rating {
  color: #0967d2;
}

.clear-filters-btn {
  background-color: #ffffff;
  color: #0967d2;
  font-family: 'Roboto';
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  border: 1px solid #0967d2;
  padding-top: 8px;
  padding-left: 12px;
  padding-bottom: 8px;
  padding-right: 12px;
  margin-top: 16px;
  outline: none;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .clear-filters-btn {
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 32px;
  }
}

//ProductCard/index.js
import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  return (
    <Link to={`/products/${id}`} className="link-item">
      <li className="product-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}
export default ProductCard

//ProductCard/index.css
.link-item {
  text-decoration: none;
  margin-bottom: 48px;
  width: 350px;
  flex-grow: 0;
  flex-shrink: 1;
  margin-right: 20px;
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .link-item {
    width: 300px;
  }
}

.product-item {
  display: flex;
  flex-direction: column;
}

.thumbnail {
  width: 100%;
  max-height: 350px;
  border-radius: 6px;
}

.title {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 8px;
}

.brand {
  color: #594d6d;
  font-family: 'Roboto';
  font-size: 18px;
  margin-bottom: 6px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2px;
}

.price {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.rating-container {
  display: flex;
  align-items: center;
  background-color: #3b82f6;
  border-radius: 6px;
  padding: 6px 16px;
}

.rating {
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  margin-right: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.star {
  height: 20px;
  width: 20px;
  margin-bottom: 3px;
}

//ProductsHeader/index.js
import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {sortbyOptions, activeOptionId} = props
  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader

//ProductsHeader/index.css
.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  flex-wrap: wrap;
}

@media screen and (min-width: 768px) {
  .products-header {
    margin-top: 32px;
  }
}

.products-list-heading {
  color: #475569;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
}

@media screen and (min-width: 768px) {
  .products-list-heading {
    font-size: 32px;
  }
}

.sort-by-container {
  display: flex;
  align-items: center;
}

.sort-by-icon {
  font-size: 24px;
  color: #475569;
  margin-right: 6px;
}

.sort-by {
  color: #475569;
  font-family: 'Roboto';
  font-size: 16px;
}

.sort-by-select {
  color: #475569;
  background-color: #ffffff;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  border: none;
  padding: 12px;
  outline: none;
  cursor: pointer;
}

.select-option {
  color: #7e858e;
  font-family: 'Roboto';
  font-size: 14px;
}

//SimilarProductItem/index.js
import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {title, brand, imageUrl, rating, price} = productDetails

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        className="similar-product-image"
        alt={`similar product ${title}`}
      />
      <p className="similar-product-title">{title}</p>
      <p className="similar-products-brand">by {brand}</p>
      <div className="similar-product-price-rating-container">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="similar-product-rating-container">
          <p className="similar-product-rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar-product-star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem

//SimilarProductItem/index.css
.similar-product-item {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}

@media screen and (min-width: 768px) {
  .similar-product-item {
    width: 200px;
    margin-right: 64px;
  }
}

.similar-product-image {
  width: 200px;
  border-radius: 8px;
}

.similar-product-title {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
}

.similar-products-brand {
  color: #594d6d;
  font-family: 'Roboto';
  font-size: 16px;
  margin-top: 6px;
}

.similar-product-price-rating-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
}

.similar-product-price {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 700;
}

.similar-product-rating-container {
  display: flex;
  align-items: center;
  background-color: #3b82f6;
  border-radius: 6px;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 8px;
}

.similar-product-rating {
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  margin-right: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.similar-product-star {
  height: 14px;
  width: 14px;
}

//ProtectedRoute/index.js
import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute

//ProductItemDetails/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        productData: updatedData,
        similarProductsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {productData, quantity, similarProductsData} = this.state
        const {
          availability,
          brand,
          description,
          imageUrl,
          price,
          rating,
          title,
          totalReviews,
        } = productData
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...productData, quantity})
        }

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>
                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="similar-products-list">
              {similarProductsData.map(eachSimilarProduct => (
                <SimilarProductItem
                  productDetails={eachSimilarProduct}
                  key={eachSimilarProduct.id}
                />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails

//ProductItemDetails/index.css
.product-item-details-container {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

@media screen and (min-width: 768px) {
  .product-item-details-container {
    margin-top: 64px;
  }
}

.product-details-success-view {
  width: 85%;
  max-width: 550px;
}

@media screen and (min-width: 768px) {
  .product-details-success-view {
    width: 80%;
    max-width: 1110px;
  }
}

.product-details-container {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .product-details-container {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 48px;
  }
}

.product-image {
  border-radius: 16px;
  flex-shrink: 0;
}

@media screen and (min-width: 768px) {
  .product-image {
    width: 48%;
    max-width: 540px;
    max-height: 576px;
  }
}

@media screen and (min-width: 768px) {
  .product {
    width: 48%;
  }
}

.product-name {
  color: #3e4c59;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 500;
  margin-top: 24px;
  margin-bottom: 16px;
}

@media screen and (min-width: 768px) {
  .product-name {
    font-size: 48px;
    margin-top: 0px;
  }
}

.price-details {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.rating-and-reviews-count {
  display: flex;
  align-items: center;
}

.reviews-count {
  color: #12022f;
  font-family: 'Open Sans';
  font-size: 14px;
  margin-left: 12px;
}

.product-description {
  color: #616e7c;
  font-family: 'Roboto';
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 16px;
  line-height: 1.3;
}

@media screen and (min-width: 768px) {
  .product-description {
    font-size: 18px;
    margin-bottom: 24px;
  }
}

.label-value-container {
  display: flex;
  margin-bottom: 16px;
}

.label {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
}

@media screen and (min-width: 768px) {
  .label {
    font-size: 18px;
  }
}

.value {
  color: #616e7c;
  font-family: 'Roboto';
  font-size: 16px;
  margin-top: 0;
  margin-left: 8px;
  margin-bottom: 0;
}

@media screen and (min-width: 768px) {
  .value {
    font-size: 18px;
  }
}

.horizontal-line {
  border-top: 1px solid #cbced2;
  margin: 0;
}

.quantity-container {
  display: flex;
  align-items: center;
}

.quantity-controller-button {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.quantity-controller-icon {
  color: #616e7c;
  width: 16px;
  height: 16px;
}

.quantity {
  color: #616e7c;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  margin-left: 24px;
  margin-right: 24px;
}

@media screen and (min-width: 768px) {
  .quantity {
    font-size: 24px;
  }
}

.button {
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  background-color: #3b82f6;
  border: none;
  border-radius: 4px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
  outline: none;
  cursor: pointer;
}

.add-to-cart-btn {
  font-size: 12px;
  margin-bottom: 32px;
}

@media screen and (min-width: 768px) {
  .add-to-cart-btn {
    font-size: 14px;
    margin-bottom: 48px;
  }
}

.similar-products-heading {
  color: #3e4c59;
  font-family: 'Roboto';
  font-size: 28px;
  font-weight: 500;
  margin: 0;
}

@media screen and (min-width: 768px) {
  .similar-products-heading {
    font-size: 32px;
  }
}

.similar-products-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 0;
}

@media screen and (min-width: 768px) {
  .similar-products-list {
    margin-top: 24px;
  }
}

@media screen and (min-width: 768px) {
  .similar-products-list {
    flex-direction: row;
  }
}

.products-details-loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.product-details-error-view-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.error-view-image {
  width: 300px;
  height: 165px;
}

@media screen and (min-width: 768px) {
  .error-view-image {
    width: 540px;
    height: 290px;
  }
}

.product-not-found-heading {
  color: #1e293b;
  font-family: 'Roboto';
  font-size: 32px;
  font-weight: 500;
  margin-top: 48px;
}

@media screen and (min-width: 768px) {
  .product-not-found-heading {
    font-size: 48px;
  }
}

//Cart/index.js
import Header from '../Header'
import CartListView from '../CartListView'

import './index.css'

const Cart = () => (
  <>
    <Header />
    <div className="cart-container">
      <div className="cart-content-container">
        <h1 className="cart-heading">My Cart</h1>
        <CartListView />
      </div>
    </div>
  </>
)
export default Cart

//Cart/index.css
.cart-container {
  display: flex;
  justify-content: center;
  min-height: 75vh;
}

@media screen and (min-width: 768px) {
  .cart-container {
    min-height: 90vh;
  }
}

.cart-content-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1110px;
}

@media screen and (min-width: 768px) {
  .cart-content-container {
    width: 80%;
    max-width: 1110px;
  }
}

.cart-heading {
  color: #3e4c59;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 700;
}

@media screen and (min-width: 768px) {
  .cart-heading {
    font-size: 48px;
  }
}

//CartListView/index.js
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView

//CartListView/index.css
.cart-list {
  padding-left: 0px;
}

//CartItem/index.js
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {deleteCartItem} = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      const onDeleteCartItem = () => {
        deleteCartItem(id)
      }
      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button type="button" className="quantity-controller-button">
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button type="button" className="quantity-controller-button">
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem

//CartItem/index.css
.cart-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 4px 16px 0px #7e858e29;
}

@media screen and (min-width: 768px) {
  .cart-item {
    margin-bottom: 32px;
  }
}

@media screen and (min-width: 768px) {
  .cart-item {
    padding-left: 36px;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-right: 48px;
  }
}

.cart-product-image {
  width: 96px;
  height: 96px;
  border-radius: 4px;
}

.cart-item-details-container {
  margin-left: 16px;
}

@media screen and (min-width: 768px) {
  .cart-item-details-container {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }
}

@media screen and (min-width: 768px) {
  .cart-product-title-brand-container {
    width: 250px;
  }
}

.cart-product-title {
  color: #171f46;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
}

@media screen and (min-width: 768px) {
  .cart-product-title {
    font-size: 16px;
  }
}

.cart-product-brand {
  color: #64748b;
  font-family: 'Roboto';
  font-size: 10px;
}

@media screen and (min-width: 768px) {
  .cart-product-brand {
    font-size: 12px;
  }
}

.cart-quantity-container {
  display: flex;
  align-items: center;
}

.quantity-controller-button {
  padding: 0;
}

.cart-quantity {
  color: #52606d;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 500;
  margin: 8px;
  line-height: 1.3;
}

@media screen and (min-width: 768px) {
  .cart-quantity {
    font-size: 18px;
    margin-left: 16px;
    margin-right: 16px;
  }
}

.total-price-delete-container {
  display: flex;
  align-items: center;
}

.cart-total-price {
  color: #0b69ff;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  min-width: 100px;
}

@media screen and (min-width: 768px) {
  .cart-total-price {
    font-size: 18px;
  }
}

.remove-button {
  background-color: transparent;
  color: #334155;
  font-family: 'Roboto';
  font-size: 10px;
  line-height: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .remove-button {
    display: none;
  }
}

.delete-button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 32px;
}

@media screen and (max-width: 767px) {
  .delete-button {
    display: none;
  }
}

//EmptyCartView/index.js
import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="cart-empty-image"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

    <Link to="/products">
      <button type="button" className="shop-now-btn">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView

//EmptyCartView/index.css
.cart-empty-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}

.cart-empty-image {
  width: 180px;
  height: 190px;
}

@media screen and (min-width: 768px) {
  .cart-empty-image {
    width: 360px;
    height: 380px;
  }
}

.cart-empty-heading {
  color: #1e293b;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 500;
}

@media screen and (min-width: 768px) {
  .cart-empty-heading {
    font-size: 32px;
  }
}

.shop-now-btn {
  background-color: #0b69ff;
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 12px;
  border-radius: 8px;
  border: none;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
  outline: none;
  cursor: pointer;
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
