// Declarations:

var numString = ''
var numArray = []

let display = document.getElementById('display')

let isPreviousResult = false

listen() // calls the listen function

function listen () {
  document.addEventListener('click', getButtonValue)
} // On a mouse click, access the getButtonValue function

function getButtonValue () {
  let button = event.target.value 
  if (!isNaN(button) || button === '.') { // If the button is not NOT a number (ie. it is a number!) OR it is a decimal...
    number(button)
  } else if (button === 'AC') {
    allClear() //If the AC button is pressed, run allClear function.
  } else if (button === 'CE') {
    clear() // Likewise, run clear function.
  } else if (button === '=') {
    calculate() // If the = button is pressed, run calculate function.
  } else {
    storeNumber(button) // if it's an integer, store it!
  }
}


function number (button) {
  if (button === '.' && numString.includes('.')) {
    return
  } else if (numString.charAt(0) === '0' && numString.length === 1 && button === '0') {
    return
  } else {
    if (isPreviousResult === true){
      numString = ''
      isPreviousResult = false
    }
    numString += button
    display.value = numString
  }
}


function allClear () { //Clear out everything and displaying a zero when done.
  numString = ''
  numArray = []
  display.value = '0'
}

function clear () { //Similarly, resets the string and diplays zero.
  numString = ''
  display.value = '0'
}

function storeNumber (button) {
  if (numString === '' && numArray.length === 0) { //Unsure of what this does here on this line. Halp!
    return
  } else if (numString === '') { // Pushes the input numbers into the numArray.
    numArray.length = numArray.length -1
    numArray.push(button)
  } else {
    numArray.push(numString)
    numArray.push(button)
    numString = ''
  }
}

function calculate ()  {
  numArray.push(numString) // pushes numString into the numArray.
  let currentNumber = Number(numArray[0]) // declaring a local variable and assigning it the value of Number(numArray[0]).
  for ( var i = 0; i < numArray.length; i++) { // iterates through numArray...
    let nextNumber = Number(numArray[i + 1]) // nextNumber is assigned to Number(numArray[i + 1])
    let symbol  = numArray[i]
    if (symbol === '+') { // Operates each symbol appropriately!
      currentNumber += nextNumber
    } else if (symbol === '-') {
      currentNumber -= nextNumber
    } else if (symbol === '*') {
      currentNumber *= nextNumber      
    } else if (symbol === '/') {
      currentNumber /= nextNumber
    }
  }
if (currentNumber < 0) { // Correctly displays minus numbers.
  currentNumber = Math.abs(currentNumber) + '-'
}

display.value = currentNumber //Displays what was entered
numString = JSON.stringify(currentNumber) // Not entirely sure what JSON does...?
isPreviousResult = true
numArray = []

}