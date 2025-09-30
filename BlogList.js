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
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div className="app-container">
    <div className="responsive-container">
      <Header />
      <div className="app-body">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </div>
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

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 50px;
}

.responsive-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 4px solid #551e53;
  border-radius: 12px;
}

@media (max-width: 576px) {
  .responsive-container {
    width: 85%;
  }
}

.app-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

//Header/index.js
import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="header-container">
    <div className="logo-and-title-container">
      <img
        alt="wave"
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
      />
      <h1 className="title">Wave</h1>
    </div>

    <ul className="nav-items-list">
      <li className="link-item">
        <Link className="route-link" to="/">
          Home
        </Link>
      </li>
      <li className="link-item">
        <Link className="route-link" to="/about">
          About
        </Link>
      </li>
      <li className="link-item">
        <Link className="route-link" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header

//Header/index.css
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  padding-left: 95px;
  padding-right: 95px;
}

@media (max-width: 575px) {
  .header-container {
    padding: 15px;
  }
}

.logo-and-title-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.title {
  color: #12022f;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
}

.nav-items-list {
  display: flex;
  padding-left: 0px;
}

.link-item {
  list-style-type: none;
}

.route-link {
  color: #12022f;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  margin-left: 16px;
}

@media (max-width: 767px) {
  .route-link {
    margin-left: 10px;
  }
}

//Home/index.js
import './index.css'
import BlogList from '../BlogList'
import UserInfo from '../UserInfo'

const blogsList = [
  {
    id: 1,
    title: 'My first post',
    description: 'A high quality solution beautifully designed for startups',
    publishedDate: 'Aug 2nd',
  },
  {
    id: 2,
    title: 'My second post',
    description:
      'A high quality solution beautifully designed for startups and Bussiness schools',
    publishedDate: 'Mar 1st',
  },
  {
    id: 3,
    title: 'My third post',
    description: 'A high quality solution beautifully designed for startups',
    publishedDate: 'Jan 2nd',
  },
  {
    id: 4,
    title: 'My fourth post',
    description:
      'A high quality solution beautifully designed for startups and Bussiness schools. ',
    publishedDate: 'Dec 24th',
  },
  {
    id: 5,
    title: 'My fifth post',
    description: 'A high quality solution beautifully designed for startups',
    publishedDate: 'Nov 10th',
  },
]

const Home = () => (
  <div className="home-container">
    <UserInfo />
    <BlogList blogsList={blogsList} />
  </div>
)

export default Home

//Home/index.css
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

//UserInfo/index.js
import './index.css'

const UserInfo = () => (
  <div className="container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/profile-img.png"
      alt="profile"
      className="profile-img"
    />
    <h1 className="head">Wade Warren</h1>
    <p className="para">Software developer at UK</p>
  </div>
)

export default UserInfo

//UserInfo/index.css'
.profile-img {
  height: 100px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head {
  font-family: Roboto;
  font-size: 20px;
}
.para {
  font-size: 15px;
  color: #616e7c;
}

//BlogList/index.js
import './index.css'
import BlogItem from '../BlogItem'

const BlogList = props => {
  const {blogsList} = props

  return (
    <ul className="list">
      {blogsList.map(each => (
        <BlogItem key={each.id} each={each} />
      ))}
    </ul>
  )
}

export default BlogList

//BlogList/index.css
.list {
  list-style-type: none;
}

//BlogItem/index.js
import './index.css'

const BlogItem = props => {
  const {each} = props
  const {title, description, publishedDate} = each

  return (
    <li className="blog-item">
      <div className="blog-header">
        <h1 className="title">{title}</h1>
        <p className="publishedDate">{publishedDate}</p>
      </div>
      <p className="description">{description}</p>
      <hr className="hr" />
    </li>
  )
}

export default BlogItem

//BlogItem/index.css
import './index.css'

const BlogItem = props => {
  const {each} = props
  const {title, description, publishedDate} = each

  return (
    <li className="blog-item">
      <div className="blog-header">
        <h1 className="title">{title}</h1>
        <p className="publishedDate">{publishedDate}</p>
      </div>
      <p className="description">{description}</p>
      <hr className="hr" />
    </li>
  )
}

export default BlogItem

//About/index.js
import './index.css'

const About = () => (
  <div className="about-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/about-blog-img.png"
      alt="about"
      className="about-img"
    />
    <h1 className="about-heading">About</h1>
    <p className="about-paragraph">
      I love to create! I am a front-end web developer
    </p>
  </div>
)

export default About

//About/index.css
.about-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.about-img {
  width: 150px;
}

.about-heading {
  font-family: 'Roboto';
  font-weight: 500;
  color: #6d396b;
  font-size: 24px;
}

@media (min-width: 576px) {
  .about-heading {
    font-size: 48px;
  }
}

.about-paragraph {
  font-family: 'Roboto';
  font-size: 20px;
  text-align: center;
  color: #555555;
}

//Contact/index.js
import './index.css'

const Contact = () => (
  <div className="contact-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/contact-blog-img.png"
      alt="contact"
      className="contact-img"
    />
    <h1 className="contact-heading">Contact</h1>
  </div>
)

export default Contact

//Contact/index.css
.contact-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.contact-img {
  width: 150px;
}

.contact-heading {
  font-family: 'Roboto';
  font-weight: 500;
  color: #6d396b;
}

@media (min-width: 576px) {
  .contact-heading {
    font-size: 48px;
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
    <h1 className="not-found-heading">Not Found</h1>
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

.not-found-heading {
  font-family: 'Roboto';
  font-weight: 500;
  line-height: 56px;
  color: #6d396b;
}

@media (min-width: 576px) {
  .not-found-heading {
    font-size: 48px;
  }
}
