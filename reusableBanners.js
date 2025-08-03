//src/App.js
import './App.css'
import BannerCardItem from './components/BannerCardItem'

const bannerCardsList = [
  {
    id: 1,
    headerText: 'The Seasons Latest',
    description: 'Get the seasons all latest designs in a flick of your hand',
    className: 'card-1',
  },
  {
    id: 2,
    headerText: 'Our New Designs',
    description:
      'Get the designs developed by our in-house team all for yourself',
    className: 'card-2',
  },
  {
    id: 3,
    headerText: 'Insiders',
    description: 'Get the top class products for yourself with an extra off',
    className: 'card-3',
  },
]

const App = () => (
  <ul className="bg-container">
    {bannerCardsList.map(each => (
      <BannerCardItem
        key={each.id}
        className={each.className}
        headerText={each.headerText}
        description={each.description}
      />
    ))}
  </ul>
)

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

/* Write your code here. */
.bg-container {
  list-style-type: none;
  background-color: #ffffff;
  height: 100vh;
}

//src/components/BannerCardItem/index.js
import './index.css'

const BannerCardItem = props => {
  const {className, description, headerText} = props
  return (
    <li className={className}>
      <h1 className="head">{headerText}</h1>
      <p className="para">{description}</p>
      <button className="btn" type="button">
        Show More
      </button>
    </li>
  )
}

export default BannerCardItem

//src/components/BannerCardItem/index.css
.card-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-image: url('https://assets.ccbp.in/frontend/react-js/reusable-banners-card-1-bg.png');
  background-size: cover;
  margin: 20px;
  border: solid 2px #cbced2;
  padding: 10px;
}

.card-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-image: url('https://assets.ccbp.in/frontend/react-js/reusable-banners-card-2-bg.png');
  background-size: cover;
  margin: 20px;
  border: solid 2px #cbced2;
  padding: 10px;
}

.card-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: url('https://assets.ccbp.in/frontend/react-js/reusable-banners-card-3-bg.png');
  background-size: cover;
  margin: 20px;
  border: solid 2px #cbced2;
  padding: 10px;
}

/* Write your code here. */
.head {
  color: #326a9d;
  font-family: Roboto;
  font-size: 38px;
}
.para {
  color: #64748b;
  font-family: Roboto;
  font-size: 15px;
}
.btn {
  border: solid 3px #326a9d;
  color: #326a9d;
  padding: 10px;
  border-radius: 3px;
}
