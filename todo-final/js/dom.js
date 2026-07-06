import { todoKeys } from './constants.js'
import { createTodo, editTodoById, completeTodoById, deleteTodoById } from './service.js'
import { setTodosToLocalStorage } from './storage.js'

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

export const renderTodos = todos => {
  todosElement.innerHTML = ''
  todos.forEach(todo => {
    const todoElement = createTodoElement(todo)
    if (todo[todoKeys.is_completed]) {
      todoElement.classList.add('completed')
    }
    todosElement.prepend(todoElement)
  })
}

// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement
const handleCreateTodo = (todos, text) => {
  const todo = createTodo(todos, text)
  const todoElement = createTodoElement(todo)
  setTodosToLocalStorage(todos)
  todosElement.prepend(todoElement)
}

export const initTodoHandlers = todos => {
  ;(formElement.addEventListener('submit', event => {
    event.preventDefault()
    const text = inputElement.value.trim()
    if (!text) return
    handleCreateTodo(todos, text)
    inputElement.value = ''
  }),
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
        setTodosToLocalStorage(todos)
        todoText.textContent = updatedTodo[todoKeys.text]
      }
      if (target.matches('.button-complete')) {
        completeTodoById(todos, todoId)
        setTodosToLocalStorage(todos)
        todo.classList.toggle('completed')
      }
      if (target.matches('.button-delete')) {
        deleteTodoById(todos, todoId)
        setTodosToLocalStorage(todos)
        todo.remove()
      }
    }))
}
