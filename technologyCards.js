//src/App.js
import './App.css'
import TechCard from './components/CardItem'

const cardsList = [
  {
    id: 1,
    title: 'Data Scientist',
    description:
      'Data scientists gather and analyze large sets of structured and unstructured data',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/data-scientist-img.png',
    className: 'card-1',
  },
  {
    id: 2,
    title: 'IOT Developer',
    description:
      'IoT Developers are professionals who can develop, manage, and monitor IoT devices.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/iot-developer-img.png',
    className: 'card-2',
  },
  {
    id: 3,
    title: 'VR Developer',
    description:
      'A VR developer creates completely new digital environments that people can see.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/vr-developer-img.png',
    className: 'card-3',
  },
  {
    id: 4,
    title: 'ML Engineer',
    description:
      'Machine learning engineers feed data into models defined by data scientists.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/ml-engineer-img.png',
    className: 'card-4',
  },
]

const App = () => (
  <div className="bg-container">
    <h1 className="main-head">Learn 4.0 Technologies</h1>
    <p className="main-para">
      Get trained by alumni of IITs and top companies like Amazon, Microsoft,
      Intel, Nvidia, Qualcomm, etc. Learn directly from professionals involved
      in Product Development.
    </p>
    <ul className="cards-container">
      {cardsList.map(each => (
        <TechCard each={each} key={each.id} />
      ))}
    </ul>
  </div>
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

/* Write CSS code here */
.bg-container {
  background-color: #f4faff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-head {
  text-align: center;
  color: #171f46;
  font-family: Roboto;
  font-size: 40px;
}
.main-para {
  color: #64748b;
  text-align: center;
  font-family: Roboto;
}
.cards-container {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
}

//src/components/CardItem/index.js
// Write your code here.
import './index.css'

const TechCard = props => {
  const {each} = props
  const {title, description, imgUrl, className} = each

  return (
    <li className={`card ${className}`}>
      <h1 className="head">{title}</h1>
      <p className="para">{description}</p>
      <img src={imgUrl} className="image" alt={title} />
    </li>
  )
}

export default TechCard

//src/components/CardItem/index.css
.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  width: 400px;
  margin: 15px;
}

.card-1 {
  border-top: 5px solid #ff4f64;
}

.card-2 {
  border-top: 5px solid #00a8e7;
}

.card-3 {
  border-top: 5px solid #44c4a1;
}

.card-4 {
  border-top: 5px solid #fcc200;
}

/* Write CSS code here. */
.head {
  color: #171f46;
  font-size: 35px;
  font-family: Roboto;
}
.para {
  color: #64748b;
  font-family: Roboto;
}
.image {
  height: 150px;
  align-self: flex-end;
}
