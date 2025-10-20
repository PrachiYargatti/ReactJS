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
import './App.css'

import GithubPopularRepos from './components/GithubPopularRepos'

const App = () => <GithubPopularRepos />

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

//GithubPopularRepos/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoriesList: [],
    activeLanguage: 'ALL',
    isLoading: true,
    apiStatus: apiStatusConstant.success,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguage} = this.state
    this.setState({isLoading: true})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({
        repositoriesList: updatedData,
        isLoading: false,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({isLoading: false, apiStatus: apiStatusConstant.failure})
    }
  }

  updateActiveLanguage = id => {
    this.setState({activeLanguage: id}, this.getRepositories)
  }

  renderLanguages = () => {
    const {activeLanguage} = this.state
    return (
      <ul className="lang-list">
        {languageFiltersData.map(lang => (
          <LanguageFilterItem
            key={lang.id}
            langData={lang}
            isActive={lang.id === activeLanguage}
            updateActiveLanguage={this.updateActiveLanguage}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repo-list">
        {repositoriesList.map(repo => (
          <RepositoryItem key={repo.id} repoData={repo} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {isLoading, apiStatus} = this.state
    let content

    if (isLoading) {
      content = this.renderLoader()
    } else if (apiStatus === apiStatusConstant.failure) {
      content = this.renderFailureView()
    } else {
      content = this.renderRepositories()
    }

    return (
      <div className="app-container">
        <h1 className="repos-list-heading">Popular</h1>
        {this.renderLanguages()}
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos

//GithubPopularRepos/index.css
.app-container {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Roboto;
}

.repos-list-heading {
  font-family: Lobster;
  font-size: 36px;
  color: #0f172a;
  margin-top: 24px;
}

.lang-list {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin-bottom: 24px;
}

.repo-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.failure-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.failure-img {
  width: 200px;
}

.failure-text {
  color: #e73959;
  font-size: 20px;
}

//LanguageFilterItem/index.js
import './index.css'

const LanguageFilterItem = props => {
  const {langData, updateActiveLanguage, isActive} = props
  const {id, language} = langData
  const activeClass = isActive ? 'active-btn' : 'normal-btn'

  const onClickLanguage = () => {
    updateActiveLanguage(id)
  }

  return (
    <li className="lang-item">
      <button type="button" className={activeClass} onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

//LanguageFilterItem/index.css
.lang-item {
  margin: 0 10px;
}

.normal-btn {
  border: 1px solid #0284c7;
  background-color: transparent;
  color: #0284c7;
  border-radius: 16px;
  padding: 4px 12px;
  cursor: pointer;
}

.active-btn {
  background-color: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 4px 12px;
  cursor: pointer;
}

//RepositoryItem/index.js
import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoData

  return (
    <li className="repo-card">
      <img src={avatarUrl} alt={name} className="repo-avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repo-icon"
        />
        <p className="repo-text">{starsCount} stars</p>
      </div>
      <div className="repo-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repo-icon"
        />
        <p className="repo-text">{forksCount} forks</p>
      </div>
      <div className="repo-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repo-icon"
        />
        <p className="repo-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

//RepositoryItem/index.css
.repo-card {
  background-color: #f8f8ff;
  border-radius: 12px;
  width: 250px;
  margin: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.repo-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.repo-name {
  color: #e73959;
  font-size: 20px;
  margin-top: 12px;
}

.repo-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.repo-icon {
  width: 20px;
  margin-right: 8px;
}

.repo-text {
  color: #1e293b;
  font-size: 14px;
}
