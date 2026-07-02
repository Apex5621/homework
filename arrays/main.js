// Задание 1.
// Дан массив пользователей:
const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
]

users.push({ name: 'Ann', age: 19, isAdmin: false }, { name: 'Jack', age: 43, isAdmin: true })
console.log(users)

// Добавьте в конец массива двух пользователей:
// { name: 'Ann', age: 19, isAdmin: false },
// { name: 'Jack', age: 43, isAdmin: true }

// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.
function getUserAverageAge(users) {
  let sum = 0
  for (let i = 0; i < users.length; i++) {
    sum += users[i].age
  }
  return sum / users.length
}
console.log(getUserAverageAge(users))

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.
function getAllAdmins(users) {
  const admins = []
  for (let i = 0; i < users.length; i++) {
    if (users[i].isAdmin) {
      admins.push(users[i])
    }
  }
  return admins
}
console.log(getAllAdmins(users))

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

function first(arr, n) {
  const firstReturns = []
  if (n === undefined) {
    return arr[0]
  } else if (n === 0) {
    return firstReturns
  } else if (typeof n !== 'number' || n > arr.length) {
    console.error('Ошибка: неверное число элементов')
    return firstReturns
  } else {
    for (let i = 0; i < n; i++) {
      firstReturns.push(arr[i])
    }
  }
  return firstReturns
}

console.log(first(users, 2))
console.log(first(users, 0))
console.log(first(users, 'Пять'))
console.log(first(users, 10))
