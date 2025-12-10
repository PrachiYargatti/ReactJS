//App.js
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
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

//Home/index.js
import './index.css'

const Home = () => (
  <div className="home-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/home-lg-img.png"
      alt="home"
      className="home-img"
    />
    <h1 className="home-heading">Home</h1>
  </div>
)

export default Home

//Home/index.css
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #ffffff;
}

.home-img {
  width: 220px;
  margin-bottom: 20px;
}

.home-heading {
  font-family: 'Roboto';
  font-size: 34px;
  color: #1e293b;
}

//Header/index.js
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import {AiFillHome} from 'react-icons/ai'
import {BsInfoCircleFill} from 'react-icons/bs'
import './index.css'

const Header = () => (
  <nav className="navbar">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/hamburger-menu-website-logo.png"
        alt="website logo"
        className="website-logo"
      />
    </Link>

    <Popup
      modal
      trigger={
        <button
          type="button"
          className="hamburger-btn"
          data-testid="hamburgerIconButton"
        >
          <GiHamburgerMenu className="hamburger-icon" />
        </button>
      }
      className="popup-content"
    >
      {close => (
        <div className="popup-container">
          <button
            type="button"
            className="close-button"
            onClick={() => close()}
            data-testid="closeButton"
          >
            <IoMdClose className="close-icon" />
          </button>

          <ul className="popup-links">
            <li>
              <Link to="/" className="popup-link" onClick={() => close()}>
                <AiFillHome className="popup-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="popup-link" onClick={() => close()}>
                <BsInfoCircleFill className="popup-icon" />
                <span>About</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Popup>
  </nav>
)

export default Header

//Header/index.css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #ffffff;
}

.website-logo {
  width: 50px;
}

.hamburger-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.hamburger-icon {
  font-size: 30px;
  color: #000000;
}

/* Popup */
.popup-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
}

.popup-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 20px;
}

.close-icon {
  font-size: 28px;
}

.popup-links {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.popup-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #000000;
  text-decoration: none;
  font-size: 22px;
  margin: 22px 0;
}

.popup-icon {
  font-size: 25px;
}

//About/index.js
import './index.css'

const About = () => (
  <div className="about-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/about-lg-img.png"
      alt="about"
      className="about-img"
    />
    <h1 className="about-heading">About</h1>
  </div>
)

export default About

//About/index.css
.about-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #ffffff;
}

.about-img {
  width: 220px;
  margin-bottom: 20px;
}

.about-heading {
  font-family: 'Roboto';
  font-size: 34px;
  color: #1e293b;
}

//NotFound/index.js
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
      alt="not found"
      className="notfound-img"
    />
    <h1 className="notfound-heading">Lost Your Way?</h1>
    <p className="notfound-description">
      Sorry, we cannot find that page. You will find lots to explore on the home
      page
    </p>
  </div>
)

export default NotFound

//NotFound/index.css
.notfound-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #ffffff;
}

.notfound-img {
  width: 260px;
  margin-bottom: 20px;
}

.notfound-heading {
  font-family: 'Roboto';
  font-size: 32px;
  color: #1e293b;
}
