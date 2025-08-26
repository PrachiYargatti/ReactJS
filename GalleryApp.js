//src/components/Gallery/index.js
import {Component} from 'react'
import ThumbnailItem from '../ThumbnailItem'
import './index.css'

const imagesList = [
  {
    id: 0,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-pond-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-pond-thumbnail-img.png',
    imageAltText: 'nature mountain with pond',
    thumbnailAltText: 'nature mountain with pond thumbnail',
  },
  {
    id: 1,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-sunset-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-sunset-thumbnail-img.png',
    imageAltText: 'nature sunset',
    thumbnailAltText: 'nature sunset thumbnail',
  },
  {
    id: 2,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-ocean-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-ocean-thumbnail-img.png',
    imageAltText: 'nature mountain with ocean',
    thumbnailAltText: 'nature mountain with ocean thumbnail',
  },
  {
    id: 3,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-forest-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-mountain-with-forest-thumbnail-img.png',
    imageAltText: 'nature mountain with forest',
    thumbnailAltText: 'nature mountain with forest thumbnail',
  },
  {
    id: 4,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-leaves-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-leaves-thumbnail-img.png',
    imageAltText: 'nature leaves',
    thumbnailAltText: 'nature leaves thumbnail',
  },
  {
    id: 5,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-tree-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-tree-thumbnail-img.png',
    imageAltText: 'nature tree',
    thumbnailAltText: 'nature tree thumbnail',
  },
  {
    id: 6,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-waterfall-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-waterfall-thumbnail-img.png',
    imageAltText: 'nature waterfall',
    thumbnailAltText: 'nature waterfall thumbnail',
  },
  {
    id: 7,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/nature-river-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/nature-river-thumbnail-img.png',
    imageAltText: 'nature river',
    thumbnailAltText: 'nature river thumbnail',
  },
]

class Gallery extends Component {
  state = {
    activeImageId: 0,
  }

  setActiveImageId = id => {
    this.setState({activeImageId: id})
  }

  render() {
    const {activeImageId} = this.state
    const activeImage = imagesList.find(
      eachImage => eachImage.id === activeImageId,
    )

    return (
      <div className="gallery-container">
        <div className="image-wrapper">
          <img
            key={activeImage.id}
            src={activeImage.imageUrl}
            alt={activeImage.imageAltText}
            className="selected-image"
          />
        </div>
        <h1 className="heading">Nature Photography</h1>
        <p className="description">Nature Photography by Rahul</p>
        <ul className="thumbnails-list">
          {imagesList.map(eachImage => (
            <ThumbnailItem
              key={eachImage.id}
              imageDetails={eachImage}
              isActive={activeImageId === eachImage.id}
              setActiveImageId={this.setActiveImageId}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Gallery

//src/components/ThumbnailItem/index.js
import './index.css'

const ThumbnailItem = props => {
  const {imageDetails, isActive, setActiveImageId} = props
  const {id, thumbnailUrl, thumbnailAltText} = imageDetails

  const onClickThumbnail = () => {
    setActiveImageId(id)
  }

  const activeClass = isActive ? 'active-thumbnail' : ''

  return (
    <li className="thumbnail-item">
      <button
        type="button"
        className="thumbnail-btn"
        onClick={onClickThumbnail}
      >
        <img
          src={thumbnailUrl}
          alt={thumbnailAltText}
          className={`thumbnail-image ${activeClass}`}
        />
      </button>
    </li>
  )
}

export default ThumbnailItem

//src/components/ThumbnailItem/index.css
.thumbnail-item {
  display: flex;
}

.thumbnail-btn {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.thumbnail-image {
  width: 70px;
  height: 70px;
  opacity: 0.5;
  border-radius: 6px;
}

.active-thumbnail {
  opacity: 1;
}

//src/components/Gallery/index.css
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.image-wrapper {
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 16px;
}

.selected-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  opacity: 0;
  transform: scale(0.95);
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.heading {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0 4px 0;
}

.description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.thumbnails-list {
  list-style: none;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0;
}

//src/App.js
import Gallery from './components/Gallery'

import './App.css'

const App = () => <Gallery />

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
