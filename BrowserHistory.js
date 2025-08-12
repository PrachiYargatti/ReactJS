//src/components/BrowserHistory/index.js
import {Component} from 'react'

import './index.css'

const initialHistoryList = [
  {
    id: 0,
    timeAccessed: '07:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/instagram-img.png',
    title: 'Instagram',
    domainUrl: 'instagram.com',
  },
  {
    id: 1,
    timeAccessed: '05:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/twitter-img.png',
    title: 'Twitter. It’s what’s happening / Twitter',
    domainUrl: 'twitter.com',
  },
  {
    id: 2,
    timeAccessed: '04:35 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/facebook-img.png',
    title: 'Facebook – log in or sign up',
    domainUrl: 'facebook.com',
  },
  {
    id: 3,
    timeAccessed: '04:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/linkedin-img.png',
    title: 'LinkedIn: Log In or Sign Up',
    domainUrl: 'linkedin.com',
  },
  {
    id: 4,
    timeAccessed: '04:00 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/hashnode-img.png',
    title: 'Hashnode: Everything you need to start blogging as a developer!',
    domainUrl: 'hashnode.com',
  },
  {
    id: 5,
    timeAccessed: '03:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/github-img.png',
    title: 'GitHub: Where the world builds software · GitHub',
    domainUrl: 'github.com',
  },

  {
    id: 6,
    timeAccessed: '02:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/react-img.png',
    title: 'React – A JavaScript library for building user interfaces',
    domainUrl: 'reactjs.org',
  },
  {
    id: 7,
    timeAccessed: '01:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/stackoverflow-img.png',
    title: 'Stack Overflow - Where Developers Learn, Share, & Build Careers',
    domainUrl: 'stackoverflow.com',
  },

  {
    id: 8,
    timeAccessed: '09:25 AM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/gmail-img.png',
    title: 'Gmail',
    domainUrl: 'mail.google.com',
  },
  {
    id: 9,
    timeAccessed: '09:00 AM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/google-img.png',
    title: 'Google',
    domainUrl: 'google.com',
  },
]

// Replace your code here
class BrowserHistory extends Component {
  state = {
    searchInput: '',
    historyList: initialHistoryList,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeleteHistory = id => {
    this.setState(prevState => {
      const {historyList} = prevState
      const updatedList = historyList.filter(each => each.id !== id)
      return {historyList: updatedList}
    })
  }

  render() {
    const {searchInput, historyList} = this.state
    const filteredList = historyList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="search-bar">
            <div className="search-icon-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/search-img.png"
                alt="search"
                className="search-icon"
              />
            </div>
            <input
              type="search"
              placeholder="Search history"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              className="search-input"
            />
          </div>
        </div>

        <div className="history-container">
          {filteredList.length === 0 ? (
            <div className="empty-view">
              <p>There is no history to show</p>
            </div>
          ) : (
            <ul className="history-list">
              {filteredList.map(each => (
                <li key={each.id} className="history-item">
                  <p className="time">{each.timeAccessed}</p>
                  <img
                    src={each.logoUrl}
                    alt="domain logo"
                    className="domain-logo"
                  />
                  <div className="title-domain-container">
                    <p className="title">{each.title}</p>
                    <p className="domain">{each.domainUrl}</p>
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    data-testid="delete"
                    onClick={() => this.onDeleteHistory(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default BrowserHistory

//src/components/BrowserHistory/index.css
.app-container {
  display: flex;
  flex-direction: column;
  font-family: Roboto;
}

.header {
  display: flex;
  align-items: center;
  background-color: #3367d6;
  padding: 10px 20px;
}

.app-logo {
  width: 120px;
  margin-right: auto;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #2850a7;
  border-radius: 4px;
}

.search-icon-container {
  padding: 8px;
}

.search-icon {
  width: 20px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  color: #f8fafc;
  padding: 8px;
  width: 450px;
}

.history-container {
  background-color: #f8fafc;
  padding: 20px;
}

.history-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ececec;
}

.time {
  color: #64748b;
  font-size: 14px;
  margin-right: 16px;
}

.domain-logo {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.title-domain-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  color: #475569;
  font-size: 14px;
  margin: 0;
}

.domain {
  color: #64748b;
  font-size: 12px;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.delete-icon {
  width: 20px;
}

.empty-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  color: #475569;
  font-size: 18px;
}

//src/App.js
import BrowserHistory from './components/BrowserHistory'

import './App.css'

const App = () => <BrowserHistory />

export default App

//src/App.css
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
