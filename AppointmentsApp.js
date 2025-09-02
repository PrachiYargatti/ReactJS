//src/components/Appointments/index.js
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isStarredFilterActive: false,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    if (titleInput !== '' && dateInput !== '') {
      const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        id: uuidv4(),
        title: titleInput,
        date: formattedDate,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  toggleFilter = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isStarredFilterActive} = this.state
    if (isStarredFilterActive) {
      return appointmentsList.filter(each => each.isStarred)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isStarredFilterActive} = this.state
    const filteredAppointments = this.getFilteredAppointments()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="form-section">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                type="text"
                value={titleInput}
                onChange={this.onChangeTitle}
                placeholder="Title"
              />

              <label htmlFor="date">DATE</label>
              <input
                id="date"
                type="date"
                value={dateInput}
                onChange={this.onChangeDate}
              />

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>

          <hr />

          <div className="appointments-list-section">
            <div className="appointments-header">
              <h1>Appointments</h1>
              <button
                type="button"
                className={`filter-btn ${
                  isStarredFilterActive ? 'active' : ''
                }`}
                onClick={this.toggleFilter}
              >
                Starred
              </button>
            </div>

            <ul className="appointments-list">
              {filteredAppointments.map(each => (
                <AppointmentItem
                  key={each.id}
                  appointmentDetails={each}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

//src/components/Appointments/index.css
.app-container {
  background: linear-gradient(#fbc7d4, #9796f0);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.appointments-container {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 900px;
}

.form-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-btn {
  background-color: #8b5cf6;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.appointments-img {
  width: 250px;
}

.appointments-list-section {
  margin-top: 20px;
}

.appointments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-btn {
  border: 1px solid #8b5cf6;
  background: transparent;
  color: #8b5cf6;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.filter-btn.active {
  background-color: #8b5cf6;
  color: #ffffff;
}

.appointments-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
  padding: 0;
}

//src/components/AppointmentItem/index.js
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="appointment-details">
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button
        type="button"
        className="star-btn"
        onClick={onClickStar}
        data-testid="star"
      >
        <img src={starImgUrl} alt="star" className="star-img" />
      </button>
    </li>
  )
}

export default AppointmentItem

//src/components/AppointmentItem/index.css
.appointment-item {
  border: 1px solid #b5b7c4;
  border-radius: 8px;
  padding: 12px;
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-weight: bold;
  color: #171f46;
}

.date {
  font-size: 14px;
  color: #b5b7c4;
}

.star-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.star-img {
  width: 20px;
  height: 20px;
}

//src/App.js
import Appointments from './components/Appointments'

import './App.css'

const App = () => <Appointments />

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
