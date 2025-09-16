//App.js
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(each => each.id !== id),
    }))
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleShowPasswords = event => {
    this.setState({showPasswords: event.target.checked})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      searchInput,
      showPasswords,
    } = this.state

    const filteredList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        {/* Header */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />

        {/* Add Password Section */}
        <div className="info-container">
          <div className="info-card">
            <h1 className="head">Add New Password</h1>
            <form className="form" onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="label-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                  className="input"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="label-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                  className="input"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="label-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                  className="input"
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="manager-img"
          />
        </div>

        {/* Passwords List Section */}
        <div className="passwords-container">
          <div className="passwords-header">
            <h1 className="head">
              Your Passwords <span>{filteredList.length}</span>
            </h1>
            <div className="search-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="label-img"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearch}
                className="input"
              />
            </div>
          </div>
          <div className="show-passwords">
            <input
              type="checkbox"
              id="showPasswords"
              checked={showPasswords}
              onChange={this.onToggleShowPasswords}
            />
            <label htmlFor="showPasswords">Show Passwords</label>
          </div>

          {/* Render List */}
          {filteredList.length === 0 ? (
            <div className="no-passwords">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-img"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-list">
              {filteredList.map(each => (
                <li key={each.id} className="password-item">
                  <p>{each.website}</p>
                  <p>{each.username}</p>
                  {showPasswords ? (
                    <p>{each.password}</p>
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                      className="stars-img"
                    />
                  )}
                  <button
                    type="button"
                    data-testid="delete"
                    onClick={() => this.onDeletePassword(each.id)}
                    className="delete-btn"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App

//App.css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bg-container {
  background: linear-gradient(to bottom, #9ba9eb, #c3caea);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
}

.logo {
  height: 50px;
  margin: 20px;
}

/* Top Section */
.info-container {
  background-color: #5763a5;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.info-card {
  background-color: #454f84;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.head {
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 5px 10px;
}

.label-img {
  height: 20px;
  margin-right: 8px;
}

.input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  padding: 5px;
}

.add-btn {
  background-color: #0b69ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
}

.add-btn:hover {
  background-color: #0957cc;
}

.manager-img {
  height: 250px;
  margin-left: 20px;
}

/* Passwords Section */
.passwords-container {
  background-color: #5763a5;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  color: #ffffff;
}

.passwords-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 5px 10px;
}

.search-box .input {
  border: none;
  outline: none;
  font-size: 14px;
}

.show-passwords {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.show-passwords label {
  margin-left: 5px;
  font-size: 14px;
  color: #ffffff;
}

/* No Passwords */
.no-passwords {
  text-align: center;
  margin-top: 30px;
}

.no-img {
  height: 200px;
  margin-bottom: 10px;
}

.no-passwords p {
  font-size: 16px;
  font-weight: 500;
}

/* Password List */
.passwords-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.password-item {
  background-color: #454f84;
  border-radius: 8px;
  padding: 12px;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.password-item p {
  margin: 0;
  font-size: 14px;
  word-break: break-word;
}

.stars-img {
  height: 14px;
}

.delete-btn {
  background: none;
  border: none;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.delete-btn img {
  height: 20px;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .info-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .manager-img {
    height: 200px;
    margin-top: 15px;
    margin-left: 0;
  }

  .info-card {
    width: 100%;
  }

  .passwords-list {
    justify-content: center;
  }
}
