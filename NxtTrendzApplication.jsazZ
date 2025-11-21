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

//FilterGroup/index.js

//FilterGroup/index.css

//ProductCard/index.js

//ProductCard/index.css

//ProductsHeader/index.js

//ProductsHeader/index.css
