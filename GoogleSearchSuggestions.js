//src/components/GoogleSuggestions/index.js
import {Component} from 'react'
import SuggestionItem from '../SuggestionItem'
import './index.css'

class GoogleSuggestions extends Component {
  state = {searchInput: ''}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateSearchInput = value => {
    this.setState({searchInput: value})
  }

  render() {
    const {suggestionsList} = this.props
    const {searchInput} = this.state

    const searchResults = suggestionsList.filter(each =>
      each.suggestion.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
          alt="google logo"
          className="google-logo"
        />
        <div className="search-container">
          <div className="search-bar">
            <img
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              alt="search icon"
              className="search-icon"
            />
            <input
              type="search"
              placeholder="Search Google"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
          <ul className="suggestions-list">
            {searchResults.map(each => (
              <SuggestionItem
                key={each.id}
                suggestionDetails={each}
                updateSearchInput={this.updateSearchInput}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default GoogleSuggestions

//src/components/GoogleSuggestions/index.css
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}

.google-logo {
  width: 150px;
  margin-bottom: 30px;
}

.search-container {
  background-color: #ffffff;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
}

.search-bar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bfbfbf;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.search-icon {
  width: 20px;
  margin-right: 10px;
}

.search-input {
  border: none;
  flex-grow: 1;
  outline: none;
  font-size: 16px;
}

.suggestions-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

//src/components/SuggestionItem/index.js
import './index.css'

const SuggestionItem = props => {
  const {suggestionDetails, updateSearchInput} = props
  const {suggestion} = suggestionDetails

  const onClickArrow = () => {
    updateSearchInput(suggestion)
  }

  return (
    <li className="suggestion-item">
      <p className="suggestion-text">{suggestion}</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
        alt="arrow"
        className="arrow-icon"
        onClick={onClickArrow}
      />
    </li>
  )
}

export default SuggestionItem

//src/components/SuggestionItem/index.css
.suggestion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.suggestion-text {
  color: #475569;
  font-size: 16px;
}

.arrow-icon {
  width: 16px;
  cursor: pointer;
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
