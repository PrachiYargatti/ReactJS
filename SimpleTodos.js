//src/components/SimpleTodo/index.js
import {useState} from 'react'
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

// Write your code here

const SimpleTodos = () => {
  const [todos, setTodos] = useState(initialTodosList)

  const deleteItem = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  return (
    <div className="bg-container">
      <div className="container">
        <h1 className="title">Simple Todos</h1>
        <ul className="todo-list">
          {todos.map(eachItem => (
            <TodoItem
              key={eachItem.id}
              eachItem={eachItem}
              deleteItem={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SimpleTodos

//src/components/SimpleTodo/index.css
.bg-container {
  background-color: #ffc2a0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.container {
  width: 90%;
  padding: 30px;
  margin: 40px;
  background-color: white;
  border: 0;
  border-radius: 20px;
}
.title {
  color: #ff8542;
  font-size: 40px;
  text-align: center;
}
.todo-list {
  list-style-type: none;
}

//src/components/TodoItem/index.js
import './index.css'

const TodoItem = props => {
  const {eachItem, deleteItem} = props
  const {title, id} = eachItem

  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li className="todo-item">
      <p className="list-title">{title}</p>
      <button type="button" className="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem

//src/components/TodoItem/index.css
.todo-item {
  display: flex;
  margin: 30px;
  justify-content: space-between;
  align-items: center;
}
.list-title {
  color: black;
  font-size: 20px;
  text-align: left;
}
.button {
  margin-left: 20px;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: #ff0b37 3px solid;
  border-radius: 10px;
  padding: 12px 20px;
  color: #ff0b37;
  font-size: 20px;
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
