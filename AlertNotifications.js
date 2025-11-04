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
import AlertNotifications from './components/AlertNotifications'

import './App.css'

const App = () => <AlertNotifications />

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

//AlertNotifications/index.js
import {AiFillCheckCircle} from 'react-icons/ai'
import {RiErrorWarningFill} from 'react-icons/ri'
import {MdWarning, MdInfo} from 'react-icons/md'
import Notification from '../Notification'
import './index.css'

const AlertNotifications = () => (
  <div className="alert-notifications-container">
    <h1 className="alert-heading">Alert Notifications</h1>

    <Notification>
      <AiFillCheckCircle className="icon success-icon" />
      <div>
        <h1 className="notification-title success-text">Success</h1>
        <p className="notification-message">
          You can access all the files in the folder
        </p>
      </div>
    </Notification>

    <Notification>
      <RiErrorWarningFill className="icon error-icon" />
      <div>
        <h1 className="notification-title error-text">Error</h1>
        <p className="notification-message">
          Sorry, you are not authorized to have access to delete the file
        </p>
      </div>
    </Notification>

    <Notification>
      <MdWarning className="icon warning-icon" />
      <div>
        <h1 className="notification-title warning-text">Warning</h1>
        <p className="notification-message">
          Viewers of this file can see comments and suggestions
        </p>
      </div>
    </Notification>

    <Notification>
      <MdInfo className="icon info-icon" />
      <div>
        <h1 className="notification-title info-text">Info</h1>
        <p className="notification-message">
          Anyone on the internet can view these files
        </p>
      </div>
    </Notification>
  </div>
)

export default AlertNotifications

//AlertNotifications/index.css
.alert-notifications-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Roboto, sans-serif;
  background-color: #ffffff;
}

.alert-heading {
  color: #0f172a;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.success-icon {
  color: #2dca73;
}

.error-icon {
  color: #ff0b37;
}

.warning-icon {
  color: #ffb800;
}

.info-icon {
  color: #0f81e0;
}

.notification-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.notification-message {
  color: #475569;
  font-size: 14px;
  margin-top: 4px;
}

.success-text {
  color: #2dca73;
}

.error-text {
  color: #ff0b37;
}

.warning-text {
  color: #ffb800;
}

.info-text {
  color: #0f81e0;
}

//Notification.index.js
import {GrFormClose} from 'react-icons/gr'
import './index.css'

const Notification = props => {
  const {children} = props

  return (
    <div className="notification-container">
      <div className="notification-content">{children}</div>
      <GrFormClose className="close-icon" />
    </div>
  )
}

export default Notification

//Notification/index.css
.notification-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  width: 90%;
  max-width: 600px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.notification-content {
  display: flex;
  align-items: center;
}

.close-icon {
  color: #64748b;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
