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
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  </>
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

//Header/index.js
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-bar">
    <div className="logo-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
        alt="wave"
        className="logo"
      />
      <p className="heading">Wave</p>
    </div>
    <ul className="nav-menu">
      <li>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/about">
          About
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header

//Header/index.css
.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 20vh;
  width: 100vw;
  font-family: Roboto;
}
.logo-container {
  display: flex;
  flex-direction: row;
}
.nav-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
}
.heading {
  margin-left: 5px;
  color: #12022f;
  font-weight: bold;
}
.logo {
  height: 45px;
}
.nav-link {
  color: #12022f;
  font-family: Roboto;
  font-weight: bold;
  margin-right: 20px;
}

//Home/index.js
import './index.css'

const Home = () => (
  <div className="container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/home-blog-img.png"
      alt="home"
      className="home-img"
    />
    <h1 className="head">Home</h1>
  </div>
)

export default Home

//Home/index.css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.head {
  color: #551e53;
  font-weight: bold;
}
.home-img {
  height: 300px;
}

//About/index.js
import './index.css'

const About = () => (
  <div className="container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/about-blog-img.png"
      alt="about"
      className="about-img"
    />
    <h1 className="head">About</h1>
    <p className="para">I love to create! I am a frontend web developer</p>
  </div>
)

export default About

//About/index.css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.head {
  color: #551e53;
  font-weight: bold;
}
.para {
  color: #555555;
  font-size: 20px;
  font-weight: 600;
}
.about-img {
  height: 300px;
}

//Contact/index.js
import './index.css'

const Contact = () => (
  <div className="container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/contact-blog-img.png"
      alt="contact"
      className="contact-img"
    />
    <h1 className="head">Contact</h1>
  </div>
)

export default Contact

//Contact/index.css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.head {
  color: #551e53;
  font-weight: bold;
}
.contact-img {
  height: 300px;
}

//NotFound/index.js
import './index.css'

const NotFound = () => (
  <div className="container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="head">Not Found</h1>
  </div>
)

export default NotFound

//NotFound/index.css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.head {
  color: #551e53;
  font-weight: bold;
}
.not-found-img {
  height: 300px;
}
