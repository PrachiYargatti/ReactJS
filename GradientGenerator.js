//index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

//App.js
import GradientGenerator from './components/GradientGenerator'

import './App.css'

const App = () => <GradientGenerator />

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

//GradientGenerator/index.js
import {Component} from 'react'
import GradientDirectionItem from '../GradientDirectionItem'
import {
  MainContainer,
  Heading,
  Paragraph,
  UnorderedList,
  ColorsContainer,
  ColorContainer,
  ColorLabel,
  Input,
  GenerateButton,
} from './styledComponents'

const gradientDirectionsList = [
  {directionId: 'TOP', value: 'top', displayText: 'Top'},
  {directionId: 'BOTTOM', value: 'bottom', displayText: 'Bottom'},
  {directionId: 'RIGHT', value: 'right', displayText: 'Right'},
  {directionId: 'LEFT', value: 'left', displayText: 'Left'},
]

class GradientGenerator extends Component {
  state = {
    activeDirection: gradientDirectionsList[0].value,
    firstColor: '#8ae323',
    secondColor: '#014f7b',
    gradient: {
      direction: gradientDirectionsList[0].value,
      firstColor: '#8ae323',
      secondColor: '#014f7b',
    },
  }

  updateDirection = value => {
    this.setState({activeDirection: value})
  }

  onChangeFirstColor = event => {
    this.setState({firstColor: event.target.value})
  }

  onChangeSecondColor = event => {
    this.setState({secondColor: event.target.value})
  }

  onGenerate = () => {
    const {activeDirection, firstColor, secondColor} = this.state
    this.setState({
      gradient: {direction: activeDirection, firstColor, secondColor},
    })
  }

  render() {
    const {activeDirection, firstColor, secondColor, gradient} = this.state
    const gradientValue = `to ${gradient.direction}, ${gradient.firstColor}, ${gradient.secondColor}`

    return (
      <MainContainer data-testid="gradientGenerator" gradient={gradientValue}>
        <Heading>Generate a CSS Color Gradient</Heading>
        <Paragraph>Choose Direction</Paragraph>
        <UnorderedList>
          {gradientDirectionsList.map(each => (
            <GradientDirectionItem
              key={each.directionId}
              directionDetails={each}
              isActive={each.value === activeDirection}
              updateDirection={this.updateDirection}
            />
          ))}
        </UnorderedList>

        <Paragraph>Pick the Colors</Paragraph>
        <ColorsContainer>
          <ColorContainer>
            <ColorLabel>{firstColor}</ColorLabel>
            <Input
              type="color"
              value={firstColor}
              onChange={this.onChangeFirstColor}
            />
          </ColorContainer>
          <ColorContainer>
            <ColorLabel>{secondColor}</ColorLabel>
            <Input
              type="color"
              value={secondColor}
              onChange={this.onChangeSecondColor}
            />
          </ColorContainer>
        </ColorsContainer>
        <GenerateButton type="button" onClick={this.onGenerate}>
          Generate
        </GenerateButton>
      </MainContainer>
    )
  }
}

export default GradientGenerator

//GradientGenerator/styledComponents.js
import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
  background-image: linear-gradient(${props => props.gradient});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
`

export const Heading = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
`

export const Paragraph = styled.p`
  color: #ededed;
  margin: 12px 0;
  font-size: 16px;
`

export const UnorderedList = styled.ul`
  display: flex;
  gap: 12px;
  list-style-type: none;
  padding: 0;
  margin: 0 0 24px;
`

export const ColorsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 16px 0;
`

export const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ColorLabel = styled.p`
  color: #ffffff;
  margin-bottom: 8px;
`

export const Input = styled.input`
  border: none;
  height: 40px;
  width: 80px;
  background: transparent;
  cursor: pointer;
`

export const GenerateButton = styled.button`
  background-color: #00c9b7;
  color: #1e293b;
  border: none;
  border-radius: 5px;
  padding: 10px 24px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px;
`

//GradientDirectionItem/index.js
import {ListItem, DirectionButton} from './styledComponents'

const GradientDirectionItem = props => {
  const {directionDetails, isActive, updateDirection} = props
  const {value, displayText} = directionDetails

  const onClickDirection = () => {
    updateDirection(value)
  }

  return (
    <ListItem>
      <DirectionButton
        type="button"
        isActive={isActive}
        onClick={onClickDirection}
      >
        {displayText}
      </DirectionButton>
    </ListItem>
  )
}

export default GradientDirectionItem

//GradientDirectionItem/styledComponents.js
import styled from 'styled-components'

export const ListItem = styled.li``

export const DirectionButton = styled.button`
  background-color: #ffffff79;
  color: #1e293b;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 500;
  cursor: pointer;
  opacity: ${props => (props.isActive ? 1 : 0.5)};
`
