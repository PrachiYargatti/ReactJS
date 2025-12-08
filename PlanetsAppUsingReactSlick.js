//App.js
import PlanetsSlider from './components/PlanetsSlider'

import './App.css'

const planetsList = [
  {
    id: 'c22777fe-f72e-11eb-9a03-0242ac130003',
    name: 'Mercury',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/mercury-img.png',
    description:
      'Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun planets.',
  },
  {
    id: 'c2277a74-f72e-11eb-9a03-0242ac130003',
    name: 'Venus',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/venus-img.png',
    description:
      'Venus is the second planet from the Sun and is Earth’s closest planetary neighbor. It’s one of the four inner, terrestrial (or rocky) planets, and it’s often called Earth’s twin because it’s similar in size and density. These are not identical twins, however – there are radical differences between the two worlds.',
  },
  {
    id: 'c2277b64-f72e-11eb-9a03-0242ac130003',
    name: 'Earth',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/earth-img.png',
    description:
      'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth’s surface is land consisting of continents and islands.',
  },
  {
    id: 'c2277c2c-f72e-11eb-9a03-0242ac130003',
    name: 'Mars',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/mars-img.png',
    description:
      'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury.',
  },
  {
    id: 'c2277cea-f72e-11eb-9a03-0242ac130003',
    name: 'Jupiter',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/jupiter-img.png',
    description:
      'Jupiter has a long history of surprising scientists – all the way back to 1610 when Galileo Galilei found the first moons beyond Earth. That discovery changed the way we see the universe.',
  },
  {
    id: 'c2277d9e-f72e-11eb-9a03-0242ac130003',
    name: 'Saturn',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/saturn-img.png',
    description:
      'Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. Adorned with a dazzling system of icy rings, Saturn is unique among the planets. It is not the only planet to have rings, but none are as spectacular or as complex as Saturn’s.',
  },
  {
    id: 'c2277e52-f72e-11eb-9a03-0242ac130003',
    name: 'Uranus',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/uranus-img.png',
    description:
      'Uranus is the seventh planet from the Sun and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope, Uranus was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star.',
  },
  {
    id: 'c2277f06-f72e-11eb-9a03-0242ac130003',
    name: 'Neptune',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/planets-app/neptune-img.png',
    description:
      'Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.',
  },
]

const App = () => <PlanetsSlider planetsList={planetsList} />

export default App

//App.css

//@import '~slick-carousel/slick/slick.css';
//@import '~slick-carousel/slick/slick-theme.css';

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

//PlanetsSlider/index.js
import Slider from 'react-slick'
import PlanetItem from '../PlanetItem'
import './index.css'

const PlanetsSlider = props => {
  const {planetsList} = props

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="planets-bg" data-testid="planets">
      <h1 className="heading">PLANETS</h1>
      <div className="slider-container">
        <Slider {...settings}>
          {planetsList.map(each => (
            <PlanetItem key={each.id} planetDetails={each} />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default PlanetsSlider

//PlanetsSlider/index.css
.planets-bg {
  background-image: url('https://assets.ccbp.in/frontend/react-js/planets-app/planets-bg-img.png');
  background-size: cover;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heading {
  color: #05acff;
  font-family: Roboto;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.slider-container {
  width: 80%;
  max-width: 800px;
}

//PlanetItem/index.js
import './index.css'

const PlanetItem = props => {
  const {planetDetails} = props
  const {name, imageUrl, description} = planetDetails

  return (
    <div className="planet">
      <img src={imageUrl} alt={`planet ${name}`} className="planet-img" />
      <h1 className="planet-name">{name}</h1>
      <p className="planet-desc">{description}</p>
    </div>
  )
}

export default PlanetItem

//PlanetItem/index.css
.planet {
  text-align: center;
}

.planet-img {
  width: 300px;
}

.planet-name {
  font-family: Roboto;
  font-size: 26px;
  color: #ffffff;
  margin-top: 18px;
}

.planet-desc {
  font-family: Roboto;
  font-size: 16px;
  color: #f1f5f9;
  max-width: 750px;
  margin: auto;
  margin-top: 12px;
}
