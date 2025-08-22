//src/components/Feedback/index.js
import {Component} from 'react'
import './index.css'

class Feedback extends Component {
  state = {isFeedbackGiven: false}

  onClickEmoji = () => {
    this.setState({isFeedbackGiven: true})
  }

  renderFeedbackQuestion = () => {
    const {resources} = this.props
    const {emojis} = resources

    return (
      <div className="feedback-container">
        <h1 className="question">
          How satisfied are you with our customer support performance?
        </h1>
        <ul className="emojis-list">
          {emojis.map(emoji => (
            <li key={emoji.id} className="emoji-item">
              <button
                type="button"
                className="emoji-btn"
                onClick={this.onClickEmoji}
              >
                <img src={emoji.imageUrl} alt={emoji.name} className="emoji" />
                <p className="emoji-name">{emoji.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderThankYouScreen = () => {
    const {resources} = this.props
    const {loveEmojiUrl} = resources

    return (
      <div className="thankyou-container">
        <img src={loveEmojiUrl} alt="love emoji" className="love-emoji" />
        <h1 className="thankyou-heading">Thank You!</h1>
        <p className="thankyou-description">
          We will use your feedback to improve our customer support performance.
        </p>
      </div>
    )
  }

  render() {
    const {isFeedbackGiven} = this.state

    return (
      <div className="app-container">
        {isFeedbackGiven
          ? this.renderThankYouScreen()
          : this.renderFeedbackQuestion()}
      </div>
    )
  }
}

export default Feedback

//src/components/Feedback/index.css
.app-container {
  background-color: #ffeeee;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
}

.feedback-container,
.thankyou-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  max-width: 500px;
}

.question {
  color: #0f172a;
  font-size: 22px;
  margin-bottom: 24px;
}

.emojis-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.emoji-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.emoji {
  width: 50px;
  height: 50px;
}

.emoji-name {
  color: #1e293b;
  margin-top: 8px;
  font-size: 14px;
}

.love-emoji {
  width: 70px;
  height: 70px;
  margin-bottom: 16px;
}

.thankyou-heading {
  color: #0f172a;
  font-size: 24px;
  margin-bottom: 12px;
}

.thankyou-description {
  color: #1e293b;
  font-size: 16px;
}

/* --- Responsive tweaks --- */
@media (max-width: 576px) {
  .feedback-container,
  .thankyou-container {
    width: 90%;
    padding: 24px;
  }
  .question {
    font-size: 18px;
  }
  .emoji {
    width: 40px;
    height: 40px;
  }
}

//src/App.js
import Feedback from './components/Feedback'

import './App.css'

const resources = {
  emojis: [
    {
      id: 0,
      name: 'Sad',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/sad-emoji-img.png',
    },
    {
      id: 1,
      name: 'None',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/none-emoji-img.png',
    },
    {
      id: 2,
      name: 'Happy',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/happy-emoji-img.png',
    },
  ],
  loveEmojiUrl: 'https://assets.ccbp.in/frontend/react-js/love-emoji-img.png',
}

const App = () => <Feedback resources={resources} />

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
