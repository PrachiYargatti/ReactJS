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
import Events from './components/Events'

import './App.css'

const App = () => <Events />

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

//Events/index.js
import {Component} from 'react'
import EventItem from '../EventItem'
import ActiveEventRegistrationDetails from '../ActiveEventRegistrationDetails'
import './index.css'

const eventsList = [
  {
    id: 'f9bb2373-b80e-46b8-8219-f07217b9f3ce',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/event-canada-dance-festival-img.png',
    name: 'Canada Dance Festival',
    location: 'Canada, America',
    registrationStatus: 'YET_TO_REGISTER',
  },
  {
    id: 'c0040497-e9cb-4873-baa9-ef5b994abfff',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/events-kathakali-img.png',
    name: 'Puthanalkkal Kalavela',
    location: 'Karnataka, India',
    registrationStatus: 'REGISTERED',
  },
  {
    id: '0037d5e4-4005-4030-987b-ce41b691b92a',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/events-kuchipudi-img.png',
    name: 'Nithyopahara',
    location: 'Kerala, India',
    registrationStatus: 'REGISTRATIONS_CLOSED',
  },
  {
    id: 'c9ff08cb-610c-4382-9939-78e5e50a72b2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/events-bharatanatyam-img.png',
    name: 'Shivam',
    location: 'Andhra Pradesh, India',
    registrationStatus: 'YET_TO_REGISTER',
  },
  {
    id: 'd1153723-5b6e-4628-9a1a-ccd8f84f1273',
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/events-kolatam-img.png',
    name: 'Janapada Kolatam',
    location: 'Tamil Nadu, India',
    registrationStatus: 'REGISTERED',
  },
  {
    id: '7d6ec013-d0ae-4d84-b776-14b733a9174f',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/event-colonial-fest-img.png',
    name: 'Colonial Fest',
    location: 'Washington, America',
    registrationStatus: 'REGISTRATIONS_CLOSED',
  },
]

class Events extends Component {
  state = {activeEventRegistrationStatus: ''}

  updateActiveEventRegistrationStatus = registrationStatus => {
    this.setState({activeEventRegistrationStatus: registrationStatus})
  }

  render() {
    const {activeEventRegistrationStatus} = this.state
    return (
      <div className="event-container">
        <div className="event-item-container">
          <h1 className="event-heading">Events</h1>
          <ul className="events-list">
            {eventsList.map(eachEvent => (
              <EventItem
                eachEvent={eachEvent}
                key={eachEvent.id}
                updateActiveEventRegistrationStatus={
                  this.updateActiveEventRegistrationStatus
                }
              />
            ))}
          </ul>
        </div>
        <div className="active-event-container">
          <ActiveEventRegistrationDetails
            activeEventRegistrationStatus={activeEventRegistrationStatus}
          />
        </div>
      </div>
    )
  }
}

export default Events

//Events/index.css
.event-container {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

.event-item-container {
  width: 70%;
  background-color: #323f4b;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.event-heading {
  color: #ffffff;
  font-family: Roboto;
  font-size: 24px;
  margin-bottom: 20px;
}

.events-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 16px;
}

.active-event-container {
  width: 30%;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

//EventItem/index.js
import './index.css'

const EventItem = props => {
  const {eachEvent, updateActiveEventRegistrationStatus} = props
  const {imageUrl, name, location, registrationStatus} = eachEvent

  const onClickEvent = () => {
    updateActiveEventRegistrationStatus(registrationStatus)
  }

  return (
    <li className="event-item">
      <button type="button" className="event-button" onClick={onClickEvent}>
        <img src={imageUrl} alt="event" className="img" />
      </button>
      <p className="item-name">{name}</p>
      <p className="item-location">{location}</p>
    </li>
  )
}

export default EventItem

//EventItem/index.css
.event-item {
  margin: 10px;
}
.img {
  height: 200px;
  width: 300px;
  border-radius: 3px;
}
.item-name {
  color: #f8fafc;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 600;
}
.item-location {
  color: #f8fafc;
  font-size: 12px;
  font-family: Roboto;
}
.event-button {
  background: transparent;
  border: none;
  cursor: pointer;
}

//ActiveEventRegistrationDetails/index.js
import './index.css'

const ActiveEventRegistrationDetails = props => {
  const {activeEventRegistrationStatus} = props

  const renderNoActiveView = () => (
    <p className="no-active-text">
      Click on an event, to view its registration details
    </p>
  )

  const renderYetToRegisterView = () => (
    <div className="active-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-register-img.png"
        alt="yet to register"
        className="active-img"
      />
      <p className="active-description">
        A live performance brings so much to your relationship with dance.
      </p>
      <button type="button" className="register-button">
        Register Here
      </button>
    </div>
  )

  const renderRegisteredView = () => (
    <div className="active-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-regestered-img.png"
        alt="registered"
        className="active-img"
      />
      <h1 className="registered-heading">
        You have already registered for the event
      </h1>
    </div>
  )

  const renderRegistrationsClosedView = () => (
    <div className="active-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/events-registrations-closed-img.png"
        alt="registrations closed"
        className="active-img"
      />
      <h1 className="closed-heading">Registrations Are Closed Now!</h1>
      <p className="closed-description">
        Stay tuned. We will reopen the registrations soon!
      </p>
    </div>
  )

  switch (activeEventRegistrationStatus) {
    case 'YET_TO_REGISTER':
      return renderYetToRegisterView()
    case 'REGISTERED':
      return renderRegisteredView()
    case 'REGISTRATIONS_CLOSED':
      return renderRegistrationsClosedView()
    default:
      return renderNoActiveView()
  }
}

export default ActiveEventRegistrationDetails

//ActiveEventRegistrationDetails/index.css
.active-card {
  text-align: center;
  font-family: Roboto;
}
.active-img {
  width: 250px;
  margin: 10px 0;
}
.active-description {
  color: #475569;
  font-size: 15px;
  margin: 10px 0;
}
.register-button {
  background-color: #0967d2;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
}
.registered-heading {
  color: #323f4b;
  font-size: 18px;
}
.closed-heading {
  color: #323f4b;
  font-size: 18px;
}
.closed-description {
  color: #475569;
  font-size: 15px;
}
.no-active-text {
  color: #64748b;
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  margin-top: 150px;
}
