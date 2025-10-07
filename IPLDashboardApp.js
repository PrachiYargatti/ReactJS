//index.js
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

//App.js
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import TeamMatches from './components/TeamMatches'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/team-matches/:id" component={TeamMatches} />
    <Route component={NotFound} />
  </Switch>
)

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

//Home/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const formattedData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teamsList: formattedData, isLoading: false})
  }

  renderTeams = () => {
    const {teamsList} = this.state
    return (
      <>
        <div className="ipl-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-title">IPL Dashboard</h1>
        </div>
        <ul className="teams-container">
          {teamsList.map(each => (
            <TeamCard key={each.id} team={each} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-bg">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeams()
        )}
      </div>
    )
  }
}

export default Home

//Home/index.css
.home-bg {
  background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-sm-bg.png');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Bree Serif';
  color: #ffffff;
}

@media (min-width: 768px) {
  .home-bg {
    background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-lg-bg.png');
  }
}

.ipl-header {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.ipl-logo {
  height: 50px;
  margin-right: 15px;
}

.ipl-title {
  font-size: 40px;
}

.teams-container {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  padding: 0;
}

//TeamCard/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      })),
    }

    this.setState({
      teamBannerUrl: formattedData.teamBannerUrl,
      latestMatch: formattedData.latestMatch,
      recentMatches: formattedData.recentMatches,
      isLoading: false,
    })
  }

  renderTeamMatches = () => {
    const {teamBannerUrl, latestMatch, recentMatches} = this.state

    return (
      <div className="matches-content">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <h1 className="section-title">Latest Matches</h1>
        <LatestMatch latestMatch={latestMatch} />
        <ul className="recent-matches-list">
          {recentMatches.map(each => (
            <MatchCard match={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="team-matches-bg">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches

//TeamCard/index.css
.team-link {
  text-decoration: none;
  color: #ffffff;
}

.team-card {
  background-color: #ffffff33;
  border: 1px solid #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 15px;
  padding: 15px;
  width: 320px;
  height: 120px;
}

.team-logo {
  height: 100px;
  margin-right: 15px;
}

.team-name {
  font-size: 22px;
  font-weight: 600;
}

//TeamMatches/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      })),
    }

    this.setState({
      teamBannerUrl: formattedData.teamBannerUrl,
      latestMatch: formattedData.latestMatch,
      recentMatches: formattedData.recentMatches,
      isLoading: false,
    })
  }

  renderTeamMatches = () => {
    const {teamBannerUrl, latestMatch, recentMatches} = this.state

    return (
      <div className="matches-content">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <h1 className="section-title">Latest Matches</h1>
        <LatestMatch latestMatch={latestMatch} />
        <ul className="recent-matches-list">
          {recentMatches.map(each => (
            <MatchCard match={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="team-matches-bg">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches

//TeamMatches/index.css
.team-matches-bg {
  background-color: #0f172a;
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Bree Serif';
}

.matches-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-banner {
  width: 100%;
  max-width: 1000px;
  margin: 20px 0;
  border-radius: 10px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 15px;
}

.recent-matches-list {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  width: 90%;
}

//LatestMatch/index.js
.team-matches-bg {
  background-color: #0f172a;
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Bree Serif';
}

.matches-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-banner {
  width: 100%;
  max-width: 1000px;
  margin: 20px 0;
  border-radius: 10px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 15px;
}

.recent-matches-list {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  width: 90%;
}

//LatestMatch/index.css
.latest-match-card {
  background-color: #1e293b;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1000px;
  margin-bottom: 20px;
}

.latest-left {
  flex: 1;
}

.latest-logo {
  height: 150px;
  align-self: center;
}

.latest-right {
  flex: 1;
  text-align: right;
}

.team-name {
  font-size: 26px;
  font-weight: bold;
}

//MatchCard/index.js
import './index.css'

const MatchCard = props => {
  const {match} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = match

  const statusClass = matchStatus === 'Won' ? 'status-green' : 'status-red'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-logo"
      />
      <p className="match-team">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${statusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

//MatchCard/index.css
.match-card {
  background-color: #1e293b;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  width: 220px;
  text-align: center;
  color: #ffffff;
  font-family: 'Bree Serif';
}

.match-logo {
  height: 80px;
  margin-bottom: 10px;
}

.match-team {
  font-size: 18px;
  margin-bottom: 8px;
}

.match-result {
  font-size: 14px;
  margin-bottom: 8px;
}

.match-status {
  font-size: 16px;
  font-weight: bold;
}

.status-green {
  color: #18ed66;
}

.status-red {
  color: #e31a1a;
}

//NotFound/index.js
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-text">Page Not Found!!</h1>
  </div>
)

export default NotFound

//NotFound/index.css
.not-found-container {
  background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-sm-bg.png');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Bree Serif';
  color: #ffffff;
}

@media (min-width: 768px) {
  .not-found-container {
    background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-lg-bg.png');
  }
}
.not-found-text {
  font-size: 28px;
  font-weight: 600;
}
