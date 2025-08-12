//src/components/SimpleTodos/index.js
import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  render() {
    const {todosList} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos

//src/components/SimpleTodos/index.css
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffc2a0;
  min-height: 100vh;
}

.simple-todos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 16px;
  width: 90%;
  padding: 24px;
  margin-top: 48px;
  margin-bottom: 48px;
  max-width: 1110px;
}

@media screen and (min-width: 768px) {
  .simple-todos-container {
    padding: 48px;
    margin-top: 96px;
    margin-bottom: 96px;
  }
}

.heading {
  color: #ff8542;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 700;
  margin-top: 12px;
  margin-bottom: 16px;
}

@media screen and (min-width: 768px) {
  .heading {
    font-size: 48px;
    margin-top: 32px;
    margin-bottom: 48px;
  }
}

.todos-list {
  padding-left: 0px;
}

//src/components/TodoItem/index.js
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo} = props
  const {id, title} = todoDetails

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-item">
      <p className="title">{title}</p>
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem

//src/components/TodoItem/index.css
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
}

.title {
  color: #000000;
  font-family: 'Roboto';
  font-size: 16px;
}

@media screen and (min-width: 768px) {
  .title {
    font-size: 24px;
  }
}

.delete-btn {
  background-color: #ffffff;
  color: #ff0b37;
  font-family: 'Roboto';
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid #ff0b37;
  padding-top: 4px;
  padding-left: 8px;
  padding-bottom: 4px;
  padding-right: 8px;
  margin-left: 16px;
  outline: none;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .delete-btn {
    font-size: 18px;
    padding-top: 8px;
    padding-left: 16px;
    padding-bottom: 8px;
    padding-right: 16px;
    margin-left: 32px;
  }
}

//src/App.js
import SimpleTodos from './components/SimpleTodos'

import './App.css'

const App = () => <SimpleTodos />

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

//src.index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
