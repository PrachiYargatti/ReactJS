//src/App.js
import EmojiGame from './components/EmojiGame'

import './App.css'

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

const App = () => <EmojiGame emojisList={emojisList} />

export default App

//src/components/EmojiGame/index.js
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {clickedIds: [], topScore: 0, isGameOver: false}

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return [...emojisList].sort(() => Math.random() - 0.5)
  }

  endGameAndSetTopScore = finalScore => {
    this.setState(prev => ({
      topScore: finalScore > prev.topScore ? finalScore : prev.topScore,
      isGameOver: true,
    }))
  }

  onEmojiClick = id => {
    const {clickedIds} = this.state
    const {emojisList} = this.props

    if (clickedIds.includes(id)) {
      this.endGameAndSetTopScore(clickedIds.length)
    } else {
      const newClicked = [...clickedIds, id]
      if (newClicked.length === emojisList.length) {
        this.setState({clickedIds: newClicked}, () =>
          this.endGameAndSetTopScore(emojisList.length),
        )
      } else {
        this.setState({clickedIds: newClicked})
      }
    }
  }

  onPlayAgain = () => {
    this.setState({clickedIds: [], isGameOver: false})
  }

  renderGame = () => {
    const shuffled = this.shuffledEmojisList()
    return (
      <ul className="emojis-list">
        {shuffled.map(each => (
          <EmojiCard
            key={each.id}
            emoji={each}
            onClickEmoji={this.onEmojiClick}
          />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {clickedIds} = this.state
    const {emojisList} = this.props
    const isWon = clickedIds.length === emojisList.length
    const score = isWon ? emojisList.length : clickedIds.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={score}
        total={emojisList.length}
        onPlayAgain={this.onPlayAgain}
      />
    )
  }

  render() {
    const {clickedIds, topScore, isGameOver} = this.state
    return (
      <div className="emoji-game-bg">
        <NavBar
          score={clickedIds.length}
          topScore={topScore}
          showScores={!isGameOver}
        />
        <div className="content">
          {isGameOver ? this.renderResult() : this.renderGame()}
        </div>
      </div>
    )
  }
}

export default EmojiGame

//src/components/EmojiGame/index.css
.emoji-game-bg {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(135deg, #9796f0, #fbc7d4);
  font-family: Roboto, sans-serif;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.emojis-list {
  width: 100%;
  max-width: 900px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

//src/components/NavBar/index.js
import './index.css'

const NavBar = ({score, topScore, showScores}) => (
  <nav className="nav">
    <div className="brand">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
        alt="emoji logo"
      />
      <h1 className="title">Emoji Game</h1>
    </div>
    {showScores && (
      <div className="scores">
        <p className="score">Score: {score}</p>
        <p className="score">Top Score: {topScore}</p>
      </div>
    )}
  </nav>
)

export default NavBar

//src/components/NavBar/index.css
.nav {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #6a59ff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 36px;
  height: 36px;
}

.title {
  color: #ffffff;
  font-size: 20px;
  margin: 0;
}

.scores {
  display: flex;
  gap: 16px;
}

.score {
  margin: 0;
  color: #ffffff;
  font-weight: 500;
}

//src/components/EmojiCard/index.js
import './index.css'

const EmojiCard = ({emoji, onClickEmoji}) => {
  const {id, emojiUrl, emojiName} = emoji
  const onClick = () => onClickEmoji(id)

  return (
    <li className="emoji-card">
      <button type="button" className="emoji-btn" onClick={onClick}>
        <img className="emoji" src={emojiUrl} alt={emojiName} />
      </button>
    </li>
  )
}

export default EmojiCard

//src/components/EmojiCard/index.css
.emoji-card {
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.emoji-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.emoji {
  width: 80px;
  height: 80px;
  display: block;
}

//src/components/WinOrLoseCard/index.js
import './index.css'

const WinOrLoseCard = ({isWon, score, total, onPlayAgain}) => {
  const heading = isWon ? 'You Won' : 'You Lose'
  const imgUrl = isWon
    ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
  const label = isWon ? 'Best Score' : 'Score'

  return (
    <div className="result-card">
      <div className="text">
        <h1 className="status">{heading}</h1>
        <p className="label">{label}</p>
        <p className="value">
          {score}/{total}
        </p>
        <button type="button" className="again" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
      <img className="result-img" src={imgUrl} alt="win or lose" />
    </div>
  )
}

export default WinOrLoseCard

//src/components/WinOrLoseCard/index.css
.result-card {
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
}

.text {
  color: #3d3d3d;
}

.status {
  margin: 0 0 8px;
  font-size: 32px;
}

.label {
  margin: 0;
  font-weight: 600;
}

.value {
  margin: 8px 0 16px;
  font-size: 28px;
  color: #6a59ff;
  font-weight: 700;
}

.again {
  background-color: #ffce27;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
}

.result-img {
  width: 100%;
  max-width: 280px;
  justify-self: center;
}

@media (max-width: 767px) {
  .result-card {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
