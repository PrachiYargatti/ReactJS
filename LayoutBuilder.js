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
import {Component} from 'react'
import ConfigurationContext from './context/ConfigurationContext'
import ConfigurationController from './components/ConfigurationController'
import Layout from './components/Layout'
import './App.css'

class App extends Component {
  state = {
    showContent: true,
    showLeftNavbar: true,
    showRightNavbar: true,
  }

  onToggleShowContent = () =>
    this.setState(prevState => ({showContent: !prevState.showContent}))

  onToggleShowLeftNavbar = () =>
    this.setState(prevState => ({showLeftNavbar: !prevState.showLeftNavbar}))

  onToggleShowRightNavbar = () =>
    this.setState(prevState => ({showRightNavbar: !prevState.showRightNavbar}))

  render() {
    const {showContent, showLeftNavbar, showRightNavbar} = this.state

    return (
      <ConfigurationContext.Provider
        value={{
          showContent,
          showLeftNavbar,
          showRightNavbar,
          onToggleShowContent: this.onToggleShowContent,
          onToggleShowLeftNavbar: this.onToggleShowLeftNavbar,
          onToggleShowRightNavbar: this.onToggleShowRightNavbar,
        }}
      >
        <div className="main-container">
          <ConfigurationController />
          <Layout />
        </div>
      </ConfigurationContext.Provider>
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

/* Write your CSS here */
.main-container {
  min-height: 100vh;
  font-family: Roboto;
}

//context/ConfigurationContext
import React from 'react'

const ConfigurationContext = React.createContext({
  showContent: true,
  showLeftNavbar: true,
  showRightNavbar: true,
  onToggleShowContent: () => {},
  onToggleShowLeftNavbar: () => {},
  onToggleShowRightNavbar: () => {},
})

export default ConfigurationContext

//src/components/ConfigurationController/index.js
import ConfigurationContext from '../../context/ConfigurationContext'
import './index.css'

const ConfigurationController = () => (
  <ConfigurationContext.Consumer>
    {value => {
      const {
        showContent,
        showLeftNavbar,
        showRightNavbar,
        onToggleShowContent,
        onToggleShowLeftNavbar,
        onToggleShowRightNavbar,
      } = value

      return (
        <nav className="layout-navbar">
          <h1 className="layout-heading">Layout</h1>
          <div className="checkbox-container">
            <div>
              <input
                type="checkbox"
                className="input-box"
                checked={showContent}
                onChange={onToggleShowContent}
                id="content"
              />
              <label htmlFor="content" className="label-text">
                Content
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="input-box"
                checked={showLeftNavbar}
                onChange={onToggleShowLeftNavbar}
                id="leftNavbar"
              />
              <label htmlFor="leftNavbar" className="label-text">
                Left Navbar
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="input-box"
                checked={showRightNavbar}
                onChange={onToggleShowRightNavbar}
                id="rightNavbar"
              />
              <label htmlFor="rightNavbar" className="label-text">
                Right Navbar
              </label>
            </div>
          </div>
        </nav>
      )
    }}
  </ConfigurationContext.Consumer>
)

export default ConfigurationController

//src/components/ConfigurationController/index.css
.layout-navbar {
  background-color: #475569;
  font-family: Roboto;
  min-height: 150px;
}
.layout-heading {
  color: white;
  padding-left: 35px;
}
.input-box {
  margin-left: 35px;
}
.layout-text {
  color: white;
}
.label-text {
  color: white;
  padding-left: 3px;
}

//Layout/index.js
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'
import './index.css'

const Layout = () => (
  <div className="app-layout">
    <Header />
    <div className="layout-body">
      <Body />
    </div>
    <Footer />
  </div>
)

export default Layout

//Layout/index.css
.app-layout {
  margin: 35px;
}
.layout-body {
  margin-top: 3px;
  margin-bottom: 3px;
}

//Header/index.js
import './index.css'

const Header = () => (
  <div className="header-container">
    <h1 className="heading-text">Header</h1>
  </div>
)

export default Header

//Header/index.css
.header-container {
  background-color: #cbd5e1;
  color: #475569;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70px;
}
.header-text {
  font-family: Roboto;
  font-weight: bold;
}

//Body/index.js
import ConfigurationContext from '../../context/ConfigurationContext'
import './index.css'

const Body = () => (
  <ConfigurationContext.Consumer>
    {value => {
      const {showContent, showLeftNavbar, showRightNavbar} = value

      const renderLeftNavbar = () => (
        <div className="left-navbar-container">
          <h1 className="nav-head">Left Navbar Menu</h1>
          <ul className="list">
            <li className="item">Item 1</li>
            <li className="item">Item 2</li>
            <li className="item">Item 3</li>
            <li className="item">Item 4</li>
          </ul>
        </div>
      )

      const renderRightNavbar = () => (
        <div className="right-navbar-container">
          <h1 className="nav-head">Right Navbar</h1>
          <div className="box">
            <p className="box-text">Ad 1</p>
          </div>
          <div className="box">
            <p className="box-text">Ad 2</p>
          </div>
        </div>
      )

      const renderContent = () => (
        <div className="content-container">
          <h1 className="nav-head">Content</h1>
          <p className="content-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
      )

      return (
        <div className="body-container">
          {showLeftNavbar ? renderLeftNavbar() : null}
          {showContent ? renderContent() : null}
          {showRightNavbar ? renderRightNavbar() : null}
        </div>
      )
    }}
  </ConfigurationContext.Consumer>
)

export default Body

//Body/index.css
.left-navbar-container {
  height: 300px;
  width: 250px;
  background-color: #cbd5e1;
  color: #475569;
  padding: 25px;
}
.right-navbar-container {
  height: 300px;
  width: 250px;
  background-color: #cbd5e1;
  color: #475569;
  padding: 25px;
}
.content-container {
  background-color: #e2e8f0;
  color: #475569;
  padding: 25px;
  height: 300px;
  flex-grow: 1;
  margin: 0 20px;
}
.nav-head {
  font-weight: 600;
  font-size: 20px;
}
.list {
  list-style-type: none;
}
.item {
  font-size: 13px;
}
.box {
  height: 100px;
  width: 100px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #475569;
}
.box-text {
  color: #475569;
  font-size: 13px;
}
.content-text {
  color: #475569;
  font-size: 13px;
}
.body-container {
  display: flex;
  justify-content: space-between;
}

//Footer/index.js
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="footer-text">Footer</h1>
  </div>
)

export default Footer

//Footer/index.css
.footer-container {
  background-color: #cbd5e1;
  color: #475569;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70px;
}
.footer-text {
  font-family: Roboto;
  font-weight: bold;
}
