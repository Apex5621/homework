// Задача 1.
// Напишите функцию calculateFinalPrice, которая принимает базовую цену товара, процент скидки и налоговую ставку. Функция должна вычислять скидку, затем прибавлять налог и возвращать итоговую цену.

function calculateFinalPrice(price, discount, cost) {
  return price * (1 - discount / 100) * (1 + cost)
}

console.log(calculateFinalPrice(500, 50, 0.2)) // 300 - работает верно

// Пример работы:
// console.log(calculateFinalPrice(100, 10, 0.2)); // 108
// console.log(calculateFinalPrice(100, 10, 0)); // 90

// Задача 2.
// Напишите функцию checkAccess, которая принимает имя пользователя и пароль. Если имя пользователя равно "admin" и пароль равен "123456", функция должна возвращать строку "Доступ разрешен", иначе — "Доступ запрещен".

function checkAccess(userName, password) {
  if (userName === 'admin' && password === 123456) {
    return 'Доступ разрешён'
  } else {
    return 'Доступ запрещён'
  }
}

console.log(checkAccess('admin', 123456)) // Доступ разрешён
console.log(checkAccess('admin', 1234566)) // Доступ запрещён

// Задача 3.
// Напишите функцию getTimeOfDay, которая принимает текущее время (число от 0 до 23) и возвращает строку:
// "Ночь" (с 0 до 5 часов),
// "Утро" (с 6 до 11 часов),
// "День" (с 12 до 17 часов),
// "Вечер" (с 18 до 23 часов).
// Если введённое значение не попадает в этот диапазон, возвращайте `"Некорректное время"`.

function getTimeOfDay(time) {
  if (isNaN(time) || time < 0 || time > 23) {
    return 'Некорректное время'
  }

  if (time >= 0 && time <= 5) {
    return 'Ночь'
  } else if (time >= 6 && time <= 11) {
    return 'Утро'
  } else if (time >= 12 && time <= 17) {
    return 'День'
  } else {
    return 'Вечер'
  }
}

console.log(getTimeOfDay(9)) // Утро

// Задача 4.
// Напишите функцию findFirstEven, которая принимает два числа start и end и находит первое чётное число в указанном диапазоне.
// Если чётного числа в этом диапазоне нет, функция должна вернуть "Чётных чисел нет".

function findFirstEven(start, end) {
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      return i
    }
  }
  return 'Чётных чисел в диапазоне нет'
}

console.log(findFirstEven(5, 15)) // Ответ - 6

// Пример работы:
// console.log(findFirstEven(1, 10)); // 2
// console.log(findFirstEven(9, 9)); // "Чётных чисел нет"
