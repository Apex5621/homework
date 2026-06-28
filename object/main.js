// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

const person = {
  firstName: 'Artem',
  lastName: 'Hramow',
  age: 25,
  location: 'Russia',
  hobby: 'Video games',
}

console.log(person)

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.
//for in no keys

const isEmpty = person => {
  if (person === undefined) {
    console.log(true)
  } else {
    console.log(false)
  }
}

// isEmpty(person)

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

const task = {
  title: 'Домашка',
  description: 'Нужно сделать 4 задачи',
  isCompleted: false,
}

const modification = {
  isCompleted: true,
  miniTask1: 'Сходить в магазин',
  miniTask2: 'Помыть посуду',
  priority: 'Высокий приоритет',
}

const cloneAndModify = (object, modifications) => {
  const updatedTask = { ...object, ...modifications }
  for (const key in updatedTask) {
    console.log(`${key}: ${updatedTask[key]}`)
  }
  return updatedTask
}

cloneAndModify(task, modification)

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

// Пример использования:
// const myObject = {
//     method1() {
//         console.log('Метод 1 вызван');
//     },
//     method2() {
//         console.log('Метод 2 вызван');
//     },
//     property: 'Это не метод'
// };
// callAllMethods(myObject);

const callAllMethods = obj => {
  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      obj[key]()
    }
  }
}

const myObject = {
  method1() {
    console.log('Метод 1 вызван')
  },
  method2() {
    console.log('Метод 2 вызван')
  },
  property: 'Это не метод',
}

callAllMethods(myObject)
