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
import BlogItemDetails from './components/BlogItemDetails'

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
          <Route exact path="/blogs/:id" component={BlogItemDetails} />
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

//Home/index.js
import './index.css'
import UserInfo from '../UserInfo'
import BlogList from '../BlogList'

const Home = () => (
  <div>
    <UserInfo />
    <BlogList />
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

//BlogItem/index.js
import {Link} from 'react-router-dom'
import './index.css'

const BlogItem = props => {
  const {blogData} = props
  const {id, title, topic, imageUrl, avatarUrl, author} = blogData

  return (
    <li className="blog-item">
      <Link to={`/blogs/${id}`} className="blog-link">
        <div>
          <img src={imageUrl} alt={title} className="blog-image" />
        </div>
        <div className="blog-content">
          <p className="blog-topic">{topic}</p>
          <h1 className="blog-title">{title}</h1>
          <div className="author-details">
            <img src={avatarUrl} alt={author} className="author-avatar" />
            <p className="author-name">{author}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BlogItem

//BlogItem/index.css
.blog-item-link {
  text-decoration: none;
  color: inherit;
}

.blog-link {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  border: 1px solid #d7dfe9;
  padding: 10px;
}

.blog-image {
  height: 200px;
  width: 200px;
  border-radius: 8px;
  margin-right: 20px;
}
.blog-content {
  width: 400px;
}
.blog-item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.blog-topic {
  color: #8e8e8e;
  font-size: 14px;
  margin: 0;
}

.blog-title {
  font-size: 20px;
  font-weight: 600;
  margin: 5px 0;
  color: #000000;
}

.author-details {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.author-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.author-name {
  font-size: 14px;
  color: #475569;
}

//BlogItemDetails/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {id} = match.params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      id: data.id,
      title: data.title,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
      author: data.author,
      content: data.content,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, content, imageUrl, avatarUrl, author} = blogData

    return (
      <div className="blog-details">
        <h1 className="details-title">{title}</h1>
        <div className="author-info">
          <img src={avatarUrl} alt={author} className="author-avatar" />
          <p className="author-name">{author}</p>
        </div>
        <img src={imageUrl} alt={title} className="details-image" />
        <p className="details-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blog-details-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails

//BlogItemDetails/index.css
.blog-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
}
.author-info {
  display: flex;
  flex-direction: row;
}
.author-avatar {
  height: 45px;
  width: 45px;
}
.details-image {
  height: 400px;
}
.blog-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.author-details {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.author-details img {
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-name {
  font-size: 16px;
  color: #475569;
}

.blog-image {
  width: 100%;
  border-radius: 8px;
  margin: 20px 0;
}

.blog-content {
  font-size: 16px;
  line-height: 1.6;
  color: #334155;
}

//BlogItem/index.js
import {Link} from 'react-router-dom'
import './index.css'

const BlogItem = props => {
  const {blogData} = props
  const {id, title, topic, imageUrl, avatarUrl, author} = blogData

  return (
    <li className="blog-item">
      <Link to={`/blogs/${id}`} className="blog-link">
        <div>
          <img src={imageUrl} alt={title} className="blog-image" />
        </div>
        <div className="blog-content">
          <p className="blog-topic">{topic}</p>
          <h1 className="blog-title">{title}</h1>
          <div className="author-details">
            <img src={avatarUrl} alt={author} className="author-avatar" />
            <p className="author-name">{author}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BlogItem

//BlogItem/index.css
.blog-item-link {
  text-decoration: none;
  color: inherit;
}

.blog-link {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  border: 1px solid #d7dfe9;
  padding: 10px;
}

.blog-image {
  height: 200px;
  width: 200px;
  border-radius: 8px;
  margin-right: 20px;
}
.blog-content {
  width: 400px;
}
.blog-item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.blog-topic {
  color: #8e8e8e;
  font-size: 14px;
  margin: 0;
}

.blog-title {
  font-size: 20px;
  font-weight: 600;
  margin: 5px 0;
  color: #000000;
}

.author-details {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.author-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.author-name {
  font-size: 14px;
  color: #475569;
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

//UserInfo/index.js
import './index.css'

const UserInfo = () => (
  <div className="user-info-container">
    <img
      className="profile-img"
      src="https://assets.ccbp.in/frontend/react-js/profile-img.png"
      alt="profile"
    />
    <h1 className="user-name">Wade Warren</h1>
    <p className="user-designation">Software developer at UK</p>
  </div>
)

export default UserInfo

//UserInfo/index.css
.user-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-img {
  background-color: #ffffff;
  width: 100px;
  margin-top: 31px;
}

.user-name {
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 18px;
  color: #12022f;
  margin-top: 20px;
  margin-bottom: 8px;
}

.user-designation {
  font-family: 'Roboto';
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #616e7c;
}
