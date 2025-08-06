//src/components/Home/index.js
import {Component} from 'react'
import './index.css'
import Message from '../Message'
import Login from '../Login'
import Logout from '../Logout'

class Home extends Component {
  state = {isLoggedIn: false}

  toggleLogin = () => {
    this.setState(prev => ({isLoggedIn: !prev.isLoggedIn}))
  }

  render() {
    const {isLoggedIn} = this.state
    const messageText = isLoggedIn ? 'Welcome User' : 'Please Login'

    return (
      <div className="home-container">
        <div className="card">
          <Message text={messageText} />
          {isLoggedIn ? (
            <Logout onClick={this.toggleLogin} />
          ) : (
            <Login onClick={this.toggleLogin} />
          )}
        </div>
      </div>
    )
  }
}

export default Home

//src/components/Home/index.css
.home-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 40px;
}

.card {
  width: 520px;
  max-width: 90%;
  height: 360px;
  border-radius: 12px;
  background: linear-gradient(to bottom, #2b2c49, #6f6fa6, #c9c6ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

//src/components/Login/index.js
import './index.css'

const Login = ({onClick}) => (
  <button type="button" className="auth-button" onClick={onClick}>
    Login
  </button>
)

export default Login

//src/components/Login/index.css
.auth-button {
  background: #f3f6fb;
  color: #303150;
  padding: 12px 28px;
  border-radius: 18px;
  border: none;
  font-weight: 600;
}

//src/components/Logout/index.js
import './index.css'

const Logout = ({onClick}) => (
  <button type="button" className="auth-button logout" onClick={onClick}>
    Logout
  </button>
)

export default Logout

//src/components/Logout/index.css
.auth-button {
  background: #f3f6fb;
  color: #303150;
  padding: 12px 28px;
  border-radius: 18px;
  border: none;
  font-weight: 600;
}

//src/components/Message/index.js
import './index.css'

const Message = ({text}) => <h1 className="message-text">{text}</h1>

export default Message

//src/components/Message/index.css
.message-text {
  color: #ffffff;
  font-size: 40px;
  font-weight: 700;
  margin: 0 0 28px 0;
  text-align: center;
}
