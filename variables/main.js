// Задача 1.
// Создайте переменные с корректными именами, чтобы сохранить следующую информацию:
// 1. firstName – имя (строка)
// 2. lastName – фамилия (строка)
// 3. isStudent – является ли учеником курса (булево значение)

// Задача 2.
// 1. Объявите переменную age с числовым значением возраста студента.
// 2. Объявите переменную currentYear и присвойте ей значение текущего года (например, 2025).
// 3. Используя age и currentYear вычислите год рождения студента, запишите результат в переменную birthYear.

// Задача 3.
// Выведите в консоли сообщение в таком формате:
// Меня зовут [firstName] [lastName], мне [age] лет. Я ученик/ученица курса: [isStudent].

// Задача 4.
// Какое значение будет у переменной result?
// let a = '123';
// let b = +'456';
// let c = Number('789'); = 0
// let d = Boolean(0); = false = 0
// let e = Boolean(' '); = true = 1
// let result = a + b + c + d + e;

// Ответ: result = 123 + 456 + 0 + false + true = 123 + 456 + 1 = 580.

const firstName = 'Artem'
const lastName = 'Hramov'
const isStudent = true

const age = 25
const currentYear = 2026
let x = currentYear - age
const birthYear = x

console.log(`Меня зовут`, firstName, lastName, `, мне`, age, `лет. Я ученик/ученица курса:`, isStudent)
