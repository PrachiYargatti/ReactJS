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
import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import TeamMatches from './components/TeamMatches'

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

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch(teamsApiUrl)
    const fetchedData = await response.json()
    const formattedData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageURL: team.team_image_url,
    }))

    this.setState({
      teamsData: formattedData,
      isLoading: false,
    })
  }

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(team => (
          <TeamCard teamDetails={team} key={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home

//Home/index.css
.home-route-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-sm-bg.png');
  background-size: cover;
  min-height: 100vh;
}

@media screen and (min-width: 768px) {
  .home-route-container {
    background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-lg-bg.png');
  }
}

.teams-list-container {
  width: 90%;
  max-width: 600px;
}

@media screen and (min-width: 768px) {
  .teams-list-container {
    width: 90%;
    max-width: 1110px;
  }
}

.ipl-dashboard-heading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ipl-logo {
  width: 25px;
  height: 40px;
}

@media screen and (min-width: 768px) {
  .ipl-logo {
    width: 60px;
    height: 96px;
  }
}

.ipl-dashboard-heading {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 36px;
  margin-left: 12px;
}

@media screen and (min-width: 768px) {
  .ipl-dashboard-heading {
    font-size: 72px;
    margin-left: 16px;
  }
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.teams-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0px;
}

//TeamCard/index.js
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageURL} = teamDetails

  return (
    <li className="team-item">
      <Link to={`/team-matches/${id}`} className="link-item">
        <img src={teamImageURL} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard

//TeamCard/index.css
.team-item {
  list-style-type: none;
}

.link-item {
  display: flex;
  align-items: center;
  background-color: #ffffff33;
  height: 100px;
  width: 150px;
  border-radius: 12px;
  border: 1px solid #ffffff;
  padding-left: 7px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 7px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 24px;
  text-decoration: none;
}

@media screen and (min-width: 768px) {
  .link-item {
    height: 200px;
    width: 360px;
    padding-left: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 24px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 30px;
  }
}

.team-logo {
  width: 45px;
  height: 45px;
}

@media screen and (min-width: 768px) {
  .team-logo {
    width: 80px;
    height: 80px;
  }
}

@media screen and (min-width: 992px) {
  .team-logo {
    width: 150px;
    height: 150px;
  }
}

.team-name {
  text-align: center;
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 12px;
  margin-left: 4px;
}

@media screen and (min-width: 768px) {
  .team-name {
    font-size: 32px;
    margin-left: 16px;
  }
}

//TeamMatches/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SRH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches

//TeamMatches/index.css
.team-matches-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.rcb {
  background: linear-gradient(to top, #1e293b, #a4261d);
}

.kkr {
  background: linear-gradient(to top, #1e293b, #5755a7);
}

.kxp {
  background: linear-gradient(to top, #1e293b, #d91c1f);
}

.csk {
  background: linear-gradient(to top, #1e293b, #f7db00);
}

.rr {
  background: linear-gradient(to top, #1e293b, #da237b);
}

.mi {
  background: linear-gradient(to top, #1e293b, #13418b);
}

.srh {
  background: linear-gradient(to top, #1e293b, #f26d22);
}

.dc {
  background: linear-gradient(to top, #1e293b, #4f5db0);
}

.responsive-container {
  width: 90%;
  max-width: 500px;
  margin-top: 48px;
}

@media screen and (min-width: 768px) {
  .responsive-container {
    margin-top: 96px;
    max-width: 1110px;
  }
}

.team-banner {
  width: 100%;
}

.recent-matches-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-left: 0;
  margin-top: 24px;
}

@media screen and (min-width: 768px) {
  .recent-matches-list {
    margin-top: 32px;
  }
}

//LatestMatch/index.js
import './index.css'

const LatestMatch = props => {
  const {latestMatchData} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchData

  return (
    <div className="latest-match-container">
      <h1 className="latest-match-heading">Latest Matches</h1>
      <div className="latest-match-card">
        <div className="latest-match-details-logo-container">
          <div className="latest-match-details-1">
            <p className="latest-match-team-name">{competingTeam}</p>
            <p className="latest-match-date">{date}</p>
            <p className="match-details">{venue}</p>
            <p className="match-details">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            className="latest-match-team-logo"
            alt={`latest match ${competingTeam}`}
          />
        </div>
        <hr className="separator" />
        <div className="latest-match-details-2">
          <p className="latest-match-details-label">First Innings</p>
          <p className="latest-match-details-value">{firstInnings}</p>
          <p className="latest-match-details-label">Second Innings</p>
          <p className="latest-match-details-value">{secondInnings}</p>
          <p className="latest-match-details-label">Man Of The Match</p>
          <p className="latest-match-details-value">{manOfTheMatch}</p>
          <p className="latest-match-details-label">Umpires</p>
          <p className="latest-match-details-value">{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch

//LatestMatch/index.css
.latest-match-container {
  margin-top: 24px;
}

.latest-match-heading {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 16px;
  display: block;
}

.latest-match-card {
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  border-radius: 12px;
  padding-top: 16px;
  padding-bottom: 16px;
}

@media screen and (min-width: 768px) {
  .latest-match-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    padding-bottom: 24px;
  }
}

.latest-match-details-logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
}

@media screen and (min-width: 768px) {
  .latest-match-details-logo-container {
    width: 65%;
    padding-left: 32px;
    padding-right: 0px;
  }
}

@media screen and (min-width: 992px) {
  .latest-match-details-logo-container {
    width: 60%;
  }
}

.latest-match-details-1 {
  width: 70%;
}

@media screen and (min-width: 768px) {
  .latest-match-details-1 {
    width: 48%;
    align-self: flex-start;
  }
}

.latest-match-team-name {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 20px;
}

@media screen and (min-width: 768px) {
  .latest-match-team-name {
    font-size: 36px;
  }
}

.latest-match-date {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 18px;
}

@media screen and (min-width: 768px) {
  .latest-match-date {
    font-size: 24px;
  }
}

.match-details {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 12px;
}

@media screen and (min-width: 768px) {
  .match-details {
    font-size: 16px;
  }
}

.latest-match-team-logo {
  max-height: 60px;
}

@media screen and (min-width: 768px) {
  .latest-match-team-logo {
    max-width: 200px;
    max-height: 200px;
  }
}

.separator {
  border: 1px solid #475569;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .separator {
    display: none;
  }
}

.latest-match-details-2 {
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
}

@media screen and (min-width: 768px) {
  .latest-match-details-2 {
    text-align: right;
    width: 33%;
    padding-left: 0px;
    padding-right: 32px;
  }
}

.latest-match-details-label {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 14px;
}

@media screen and (min-width: 768px) {
  .latest-match-details-label {
    font-size: 18px;
  }
}

.latest-match-details-value {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 12px;
}

@media screen and (min-width: 768px) {
  .latest-match-details-value {
    font-size: 14px;
  }
}

//TeamCard/index.js
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = matchDetails
  const getMatchStatusClassName = status =>
    status === 'Won' ? 'match-won' : 'match-lost'
  const matchStatusClassName = `match-status ${getMatchStatusClassName(
    matchStatus,
  )}`

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        className="competing-team-logo"
        alt={`competing team ${competingTeam}`}
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

//TeamCard/index.css
.match-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0f172a;
  width: 48%;
  border-radius: 16px;
  padding-top: 12px;
  padding-left: 16px;
  padding-bottom: 12px;
  padding-right: 16px;
  margin-bottom: 24px;
}

@media screen and (min-width: 768px) {
  .match-item {
    width: 30%;
    padding: 24px;
    margin-bottom: 32px;
  }
}

.competing-team-logo {
  max-width: 60px;
  height: 40px;
}

@media screen and (min-width: 768px) {
  .competing-team-logo {
    max-width: 150px;
    height: 150px;
  }
}
.competing-team-name {
  text-align: center;
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 16px;
  flex-grow: 1;
}

@media screen and (min-width: 768px) {
  .competing-team-name {
    font-size: 24px;
  }
}

.result {
  text-align: center;
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 10px;
}

@media screen and (min-width: 768px) {
  .result {
    font-size: 16px;
  }
}

.match-status {
  font-family: 'Bree Serif';
  font-size: 14px;
}

@media screen and (min-width: 768px) {
  .match-status {
    font-size: 24px;
  }
}

.match-won {
  color: #18ed66;
}

.match-lost {
  color: #e31a1a;
}

//NotFound/index.js
import './index.css'

const NotFound = () => (
  <div className="not-found-route-container">
    <h1 className="not-found-heading">Page Not Found !!</h1>
  </div>
)

export default NotFound

//NotFound/index.css
.not-found-route-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-sm-bg.png');
  background-size: cover;
  min-height: 100vh;
}

@media screen and (min-width: 768px) {
  .not-found-route-container {
    background-image: url('https://assets.ccbp.in/frontend/react-js/ipl-dashboard-lg-bg.png');
  }
}

.not-found-heading {
  color: #ffffff;
  font-family: 'Bree Serif';
  font-size: 32px;
}

@media screen and (min-width: 768px) {
  .not-found-heading {
    font-size: 64px;
  }
}
