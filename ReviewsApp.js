//src/components/ReviewsCarousel/index.js
import {Component} from 'react'
import './index.css'

class ReviewsCarousel extends Component {
  state = {currentIndex: 0}

  onClickLeft = () => {
    const {currentIndex} = this.state
    if (currentIndex > 0) {
      this.setState(prevState => ({currentIndex: prevState.currentIndex - 1}))
    }
  }

  onClickRight = () => {
    const {reviewsList} = this.props
    const {currentIndex} = this.state
    if (currentIndex < reviewsList.length - 1) {
      this.setState(prevState => ({currentIndex: prevState.currentIndex + 1}))
    }
  }

  render() {
    const {reviewsList} = this.props
    const {currentIndex} = this.state
    const {imgUrl, username, companyName, description} =
      reviewsList[currentIndex]

    return (
      <div className="bg-container">
        <h1 className="heading">Reviews</h1>
        <div className="carousel-container">
          <button
            data-testid="leftArrow"
            type="button"
            onClick={this.onClickLeft}
            className="arrow-btn"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
              alt="left arrow"
              className="arrowImg"
            />
          </button>

          <div className="review-container">
            <img src={imgUrl} alt={username} className="profileImg" />
            <p className="username">{username}</p>
            <p className="company">{companyName}</p>
            <p className="description">{description}</p>
          </div>

          <button
            data-testid="rightArrow"
            type="button"
            onClick={this.onClickRight}
            className="arrow-btn"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
              alt="right arrow"
              className="arrowImg"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default ReviewsCarousel

//src/components/ReviewsCarousel/index.css
.bg-container {
  background-image: url('https://assets.ccbp.in/frontend/react-js/reviews-bg.png');
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  color: #ffffff;
  margin: 0;
}

.heading {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.arrowImg {
  width: 24px;
  height: 24px;
}

.review-container {
  text-align: center;
  margin: 0 20px;
  max-width: 400px;
}

.profileImg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.username {
  font-size: 18px;
  font-weight: 500;
  margin: 6px 0;
}

.company {
  font-size: 14px;
  color: #171f46;
  margin: 4px 0;
}

.description {
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.5;
  color: #171f46;
}

//src/App.js
import ReviewsCarousel from './components/ReviewsCarousel'

import './App.css'

const reviewsList = [
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/wade-warren-img.png',
    username: 'Wade Warren',
    companyName: 'Rang',
    description:
      'The most important thing I learnt is that nothing is a failure, but what we learn from that is a rich and rewarding experience.',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/adrian-williams-img.png',
    username: 'Adrian Williams',
    companyName: 'WheelO',
    description:
      'Coming to Startup School is the best thing that has happened to me. I wish every startup in the country should get this opportunity.',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/sherry-jhonson-img.png',
    username: 'Sherry Johnson',
    companyName: 'MedX',
    description:
      'I am glad to have such experienced mentors guiding us in every step through out the 4 weeks. I have improved personally and developed many interpersonal skills.',
  },
  {
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/ronald-jones-img.png',
    username: 'Ronald Jones',
    companyName: 'Infinos Tech',
    description:
      'I am really loving the way how mentors are taking care of us, the way they are explaining big theories with lots of case studies and innovative methods.',
  },
]

const App = () => <ReviewsCarousel reviewsList={reviewsList} />

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
