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
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/about" component={About} />
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

//ProtectedRoute/index.js
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute

//About/index.js
import Header from '../Header'
import LogoutButton from '../LogoutButton'
import './index.css'

const About = () => (
  <>
    <Header />
    <div className="about-container">
      <h1 className="about-heading">About Route</h1>
      <LogoutButton />
    </div>
  </>
)

export default About

//About/index.css
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about-heading {
  font-family: Roboto;
}

//Header/index.js
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <ul className="nav-menu">
      <li>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header

//Header/index.css
.nav-header {
  height: 35px;
}
.nav-menu {
  text-align: center;
  list-style-type: none;
  display: flex;
  justify-content: center;
}
.nav-link {
  margin-right: 10px;
  margin-left: 10px;
}

//Home/index.js
import Header from '../Header'
import LogoutButton from '../LogoutButton'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">Home Route</h1>
      <LogoutButton />
    </div>
  </>
)

export default Home

//Home/index.css
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-heading {
  font-family: Roboto;
}

//Login/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginWithGivenCreds = async () => {
    const userDetails = {
      username: 'rahul',
      password: 'rahul@2021',
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST', // must be uppercase
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <h1 className="login-heading">Please Login</h1>
        <button
          type="button"
          className="login-button"
          onClick={this.loginWithGivenCreds}
        >
          Login with Sample Creds
        </button>
      </div>
    )
  }
}

export default Login

//Login/index.css
.login-bg-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-heading {
  font-family: Roboto;
}
.login-button {
  font-size: 15px;
  padding: 10px;
}

//import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

const LogoutButton = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <button type="button" className="logout-button" onClick={onClickLogout}>
      Logout
    </button>
  )
}

export default withRouter(LogoutButton)

//LogoutButton/index.css
.logout-button {
  font-size: 15px;
  padding: 10px;
}

//NotFound/index.js
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Not Found</h1>
  </div>
)

export default NotFound

//NotFound/index.css
.not-found-container {
  margin: 20px;
  text-align: center;
}
.not-found-heading {
  font-family: Roboto;
}

