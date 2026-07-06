'use strict'

const todoKeys = {
  id: 'id',
  text: 'text',
  is_completed: 'is_completed',
}

const todos = []

const errTodoNotFound = todoId => `Todo with id ${todoId} not found`

const getNewTodoId = todos =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false
  }
  todos.push(newTodo)
  return newTodo
}

const editTodoById = (todos, todoId, text) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId)
  if (!todo) {
    console.error(errTodoNotFound(todoId))
    return null
  }
  todo[todoKeys.text] = text
  return todo
}

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId)
  if (!todo) {
    console.error(errTodoNotFound(todoId))
    return null
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed]
  return todo
}

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId)
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId))
    return todos
  }
  todos.splice(todoIndex, 1)
  return todos
}

// При помощи метода querySelector получаем элементы .form, .input и .todos
const formElement = document.querySelector('.form')
const inputElement = document.querySelector('.input')
const todosElement = document.querySelector('.todos')

// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
const createTodoElement = todo => {
  const todoElement = document.createElement('li')
  todoElement.classList.add('todo')
  todoElement.dataset.id = todo[todoKeys.id]
  todoElement.innerHTML = `
    <div class="todo-text">${todo[todoKeys.text]}</div>
    <div class="todo-actions">
      <button class="button-edit button">&#x270E;</button>
      <button class="button-complete button">&#10004;</button>
      <button class="button-delete button">&#10006;</button>
    </div>
  `
  return todoElement
}

// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement
const handleCreateTodo = (todos, text) => {
  const todo = createTodo(todos, text)
  const todoElement = createTodoElement(todo)
  todosElement.prepend(todoElement)
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  const text = inputElement.value.trim()
  if (!text) return
  handleCreateTodo(todos, text)
  inputElement.value = ''
})

todosElement.addEventListener('click', ({ target }) => {
  const todo = target.closest('.todo')
  if (!todo) return
  const todoId = Number(todo.dataset.id)
  if (target.matches('.button-edit')) {
    const todoText = todo.querySelector('.todo-text')
    const newText = prompt('Изменить задачу', todoText.textContent)
    if (newText === null) return
    const text = newText.trim()
    if (!text) return
    const updatedTodo = editTodoById(todos, todoId, text)
    if (!updatedTodo) return
    todoText.textContent = updatedTodo[todoKeys.text]
  }
  if (target.matches('.button-complete')) {
    completeTodoById(todos, todoId)
    todo.classList.toggle('completed')
  }
  if (target.matches('.button-delete')) {
    deleteTodoById(todos, todoId)
    todo.remove()
  }
})
