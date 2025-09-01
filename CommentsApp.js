//src/components/Comments/index.js
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    if (nameInput !== '' && commentInput !== '') {
      const initialBackgroundColorClassName =
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ]

      const newComment = {
        id: uuidv4(),
        name: nameInput,
        comment: commentInput,
        date: new Date(),
        isLiked: false,
        initialClassName: initialBackgroundColorClassName,
      }

      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        commentInput: '',
      }))
    }
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state
    return (
      <div className="comments-app">
        <h1 className="heading">Comments</h1>
        <div className="top-section">
          <form className="form" onSubmit={this.onAddComment}>
            <p className="label">Say something about 4.0 Technologies</p>
            <input
              type="text"
              className="name-input"
              placeholder="Your Name"
              value={nameInput}
              onChange={this.onChangeNameInput}
            />
            <textarea
              className="comment-input"
              placeholder="Your Comment"
              value={commentInput}
              onChange={this.onChangeCommentInput}
              rows="4"
            />
            <button type="submit" className="add-button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments-img"
          />
        </div>
        <hr className="separator" />
        <p className="comments-count">
          <span className="count">{commentsList.length}</span> Comments
        </p>
        <ul className="comments-list">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleIsLiked={this.toggleIsLiked}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments

//src/components/Comments/index.css
.comments-app {
  padding: 20px;
}

.heading {
  color: #1e293b;
  font-family: Roboto;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 350px;
}

.label {
  color: #475569;
  margin-bottom: 10px;
}

.name-input,
.comment-input {
  border: 1px solid #cbd2d9;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
  font-family: Roboto;
}

.add-button {
  background-color: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}

.comments-img {
  max-width: 350px;
}

.separator {
  margin: 20px 0;
}

.comments-count {
  color: #475569;
  font-family: Roboto;
}

.count {
  background-color: #0284c7;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
}

.comments-list {
  list-style: none;
  padding: 0;
}

//src/components/CommentItem/index.js
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, deleteComment} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails

  const initial = name ? name[0].toUpperCase() : ''

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    toggleIsLiked(id)
  }

  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-header">
        <div className={`avatar ${initialClassName}`}>{initial}</div>
        <div className="comment-meta">
          <p className="username">{name}</p>
          <p className="time">{formatDistanceToNow(date)} ago</p>
        </div>
      </div>
      <p className="comment-text">{comment}</p>
      <div className="comment-actions">
        <button className="like-button" type="button" onClick={onClickLike}>
          <img src={likeImgUrl} alt="like" className="like-icon" />
          <span className={isLiked ? 'liked' : ''}>Like</span>
        </button>
        <button
          className="delete-button"
          type="button"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem

//src/components/CommentItem/index.css
.amber {
  background-color: #f59e0b;
}

.blue {
  background-color: #0b69ff;
}

.orange {
  background-color: #f97316;
}

.emerald {
  background-color: #10b981;
}

.teal {
  background-color: #14b8a6;
}

.red {
  background-color: #b91c1c;
}

.light-blue {
  background-color: #0ea5e9;
}

.comment-item {
  border-bottom: 1px solid #dee0e3;
  padding: 10px 0;
}

.comment-header {
  display: flex;
  align-items: center;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
}

.comment-meta {
  display: flex;
  flex-direction: column;
}

.username {
  color: #334155;
  font-weight: 500;
  margin: 0;
}

.time {
  color: #94a3b8;
  font-size: 12px;
}

.comment-text {
  color: #64748b;
  margin: 8px 0;
}

.comment-actions {
  display: flex;
  align-items: center;
}

.like-button {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  margin-right: 12px;
  cursor: pointer;
  color: #64748b;
}

.like-icon {
  margin-right: 6px;
}

.liked {
  color: #0284c7;
  font-weight: 500;
}

.delete-button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.delete-icon {
  height: 18px;
}

//src/App.js
import Comments from './components/Comments'

import './App.css'

const App = () => <Comments />

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
