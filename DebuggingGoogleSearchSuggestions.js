//src/components/GoogleSuggestions/index.js

import {Component} from 'react'
import SuggestionItem from '../SuggestionItem'
import './index.css'

class GoogleSuggestions extends Component {
  state = {
    searchInput: '',
  }

  updateSearchInput = value => {
    this.setState({searchInput: value})
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {searchInput} = this.state
    const {suggestionsList} = this.props
    const searchResults = suggestionsList.filter(eachSuggestion =>
      eachSuggestion.suggestion
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div className="google-suggestions-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
            alt="google logo"
            className="google-logo"
          />
          <div className="search-input-suggestions-container">
            <div className="search-input-container">
              <img
                alt="search icon"
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search Google"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
            <ul className="suggestions-list">
              {searchResults.map(eachSuggestion => (
                <SuggestionItem
                  key={eachSuggestion.id}
                  suggestionDetails={eachSuggestion}
                  updateSearchInput={this.updateSearchInput}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleSuggestions

//src/components/GoogleSuggestions/index.css
.app-container {
  display: flex;
  justify-content: center;
}

.google-suggestions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 125px;
}

@media screen and (min-width: 768px) {
  .google-suggestions-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 250px;
  }
}

.google-logo {
  width: 150px;
  height: 55px;
}

@media screen and (min-width: 768px) {
  .google-logo {
    width: 432px;
    height: 140px;
  }
}

.search-input-suggestions-container {
  width: 300px;
  border-radius: 12px;
  margin-top: 24px;
  box-shadow: 0px 0px 10px 0px #bfbfbf;
}

@media screen and (min-width: 768px) {
  .search-input-suggestions-container {
    width: 600px;
    border-radius: 20px;
    margin-top: 48px;
  }
}

.search-input-container {
  display: flex;
  align-items: center;
  padding-top: 4px;
  padding-left: 8px;
  padding-bottom: 4px;
  padding-right: 8px;
}

@media screen and (min-width: 768px) {
  .search-input-container {
    display: flex;
    align-items: center;
    padding-top: 4px;
    padding-left: 12px;
    padding-bottom: 4px;
    padding-right: 12px;
  }
}

.search-icon {
  width: 16px;
  height: 16px;
}

@media screen and (min-width: 768px) {
  .search-icon {
    width: 24px;
    height: 24px;
  }
}

.search-input {
  color: #64748b;
  font-family: 'Roboto';
  font-size: 16px;
  width: 100%;
  height: 40px;
  border: none;
  margin-left: 16px;
  outline: none;
}

@media screen and (min-width: 768px) {
  .search-input {
    font-size: 20px;
    height: 40px;
    margin-left: 8px;
  }
}

.suggestions-list {
  padding-left: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
  margin: 0;
}

@media screen and (min-width: 768px) {
  .suggestions-list {
    padding-left: 24px;
    padding-right: 32px;
    padding-bottom: 24px;
  }
}

//src/components/SuggestionItem/index.js

import './index.css'

const SuggestionItem = props => {
  const {suggestionDetails, updateSearchInput} = props
  const {suggestion} = suggestionDetails

  const onClickSuggestion = () => {
    updateSearchInput(suggestion)
  }

  return (
    <li className="suggestion-item">
      <p className="suggestion-text">{suggestion}</p>
      <button
        type="button"
        className="arrow-button"
        onClick={onClickSuggestion}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
          alt="arrow"
          className="arrow"
        />
      </button>
    </li>
  )
}

export default SuggestionItem

//src/components/SuggestionItem/index.css
.suggestion-item {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  list-style-type: none;
}

.suggestion-text {
  color: #475569;
  font-family: 'Roboto';
  font-size: 16px;
  margin: 0;
}

@media screen and (min-width: 768px) {
  .suggestion-text {
    font-size: 20px;
  }
}

.arrow-button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.arrow {
  height: 16px;
  width: 16px;
}

@media screen and (min-width: 768px) {
  .arrow {
    height: 24px;
    width: 24px;
  }
}

//src/App.js
import GoogleSuggestions from './components/GoogleSuggestions'

import './App.css'

const suggestionsList = [
  {id: 1, suggestion: 'Price of Ethereum'},
  {id: 2, suggestion: 'Oculus Quest 2 specs'},
  {id: 3, suggestion: 'Tesla Share Price'},
  {id: 4, suggestion: 'Price of Ethereum today'},
  {id: 5, suggestion: 'Latest trends in AI'},
  {id: 6, suggestion: 'Latest trends in ML'},
]

const App = () => <GoogleSuggestions suggestionsList={suggestionsList} />

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

//src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
