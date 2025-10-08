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
import BlogItemDetails from './components/BlogItemDetails'
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
        <Link className="route-link" to="/about">
          About
        </Link>
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
import BlogList from '../BlogList'
import UserInfo from '../UserInfo'

import './index.css'

const Home = () => (
  <div className="home-container">
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

//BlogList/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {isLoading: true, blogsData: []}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({isLoading: false, blogsData: formattedData})
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="blogs-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachBlogItem => (
              <BlogItem blogItemDetails={eachBlogItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList

//BlogList/index.css
.blogs-list-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
}

.blogs-list {
  padding-left: 0px;
}

//BlogItem/index.js
import {Link} from 'react-router-dom'

import './index.css'

const BlogItem = props => {
  const {blogItemDetails} = props
  const {id, imageUrl, topic, title, avatarUrl, author} = blogItemDetails

  return (
    <Link to={`/blogs/${id}`} className="blog-item-link">
      <li className="blog-item">
        <div className="blog-item-container">
          <img className="blog-item-image" src={imageUrl} alt={`item${id}`} />
          <div className="blog-item-info">
            <p className="blog-item-topic">{topic}</p>
            <h1 className="blog-item-title">{title}</h1>
            <div className="author-info">
              <img className="avatar" src={avatarUrl} alt={`avatar${id}`} />
              <p className="author-name">{author}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BlogItem

//BlogItem/index.css
.blog-item {
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  margin: 15px;
  list-style-type: none;
}

.blog-item-link {
  color: #000000;
  text-decoration: none;
}

.blog-item-container {
  display: flex;
  flex-direction: column;
  margin: 15px;
}
@media screen and (min-width: 575px) {
  .blog-item-container {
    flex-direction: row;
    max-width: 660px;
    height: 170px;
    margin: 15px;
  }
}

.blog-item-image {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 5px;
  height: 170px;
}

@media screen and (min-width: 575px) {
  .blog-item-image {
    width: 40%;
    border: 1px solid transparent;
    border-radius: 5px;
    margin-right: 15px;
  }
}

.blog-item-info {
  font-family: roboto;
  width: 100%;
}

@media screen and (min-width: 575px) {
  .blog-item-info {
    width: 60%;
  }
}

.blog-item-topic {
  color: #8e8e8e;
  font-size: 14px;
}

.blog-item-title {
  font-size: 18px;
  font-weight: 400;
}

.author-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.avatar {
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50%;
}
.author-name {
  color: #8e8e8e;
  font-size: 14px;
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
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h1 className="blog-details-title">{title}</h1>

        <div className="author-details">
          <img className="author-img" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
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

export default import {Component} from 'react'
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
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h1 className="blog-details-title">{title}</h1>

        <div className="author-details">
          <img className="author-img" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
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
.blog-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 15px;
}

@media screen and (min-width: 575px) {
  .blog-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

.blog-info {
  width: 100%;
}

@media screen and (min-width: 575px) {
  .blog-info {
    max-width: 660px;
  }
}

.blog-details-title {
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  font-family: roboto;
}

@media screen and (min-width: 575px) {
  .blog-details-title {
    font-size: 28px;
    text-align: center;
    font-family: roboto;
  }
}

.author-details {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.author-img {
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50%;
}

.blog-author-name {
  color: #8e8e8e;
  font-size: 14px;
}

.blog-image {
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
}

@media screen and (min-width: 575px) {
  .blog-image {
    max-width: 660px;
    height: 300px;
  }
}

.blog-content {
  margin-top: 15px;
  font-family: 'Roboto';
  line-height: 24px;
  color: #2f4f4f;
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


//
