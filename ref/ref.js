// IR: Variable declarations: an array, an integer.

var entries = [];
var total = 0;

// IR: Event handler - on button click, calls a function that inputs the value of .text.

var temp = ''; // Empty string for the the calculator input
$("button").on('click', function() {
 	var val = $(this).text();

  // Got a number, add to temp
  if (!isNaN(val) || val === '.') {  // JS: If not a number (text) is true  or its a decimal/floating point
    temp += val; // temp = temp + value
    $("#answer").val(temp.substring(0,10)); // IR: Using substring(0 to 9) 'temp' is checked to find the value of the answer.
    
  // Got some symbol other than equals, add temp to our entries
  // then add our current symbol and clear temp
  } else if (val === 'AC') {
    entries = []; // IR: Resets entries to zero.
    temp = ''; // IR: Clears calculator input back to zero.
    total = 0; // IR: Resets total to zero.
    $("#answer").val('') // JS This takes the value if it fails the first if statement. 
      // IR: The element with the "answer" ID has been selected. 

  // Clear last entry
  } else if (val === 'CE') {
    temp = ''; // JS: Resets temp storage to zero too.
    $("#answer").val('')  // JS: Same as above line. This takes "answer" ID
    
  // Change multiply symbol to work with eval
    // IR: Pushes temp and '*' into the entries array, meaning that 'x' will  act as an operator, multiplying the values.
  } else if (val === 'x') { //JS: 1) When X is pressed got to step 2
    entries.push(temp); // JS: 3) 'x' is push to the entries array
    entries.push('*');  // JS: 4) 'x' is replaced by new item pushed to the array which is the correct                                      operator.
    temp = ''; // JS: 2) 'x' is passed to 'temp' temp
    
  // Change divide symbol to work with eval
  // IR: This does exactly the same as above, but with '/' and '÷'.
  } else if (val === '÷') { 
    entries.push(temp);
    entries.push('/');
    temp = '';

  // Got the equals sign, perform calculation
  // IR: If the input is an equals sign, push temp to entries and calculate the answer.
  } else if (val === '=') {
  	entries.push(temp);

    var nt = Number(entries[0]); // IR: assigns nt to the first number inputted.
    for (var i = 1; i < entries.length; i++) { // IR: Iterates through the inputted numbers, starting with nt.
      var nextNum = Number(entries[i+1]) // IR: assigns nextNum to the second number.
      var symbol = entries[i];
      
      if (symbol === '+') { nt += nextNum; }  // JS: This whole section  deals with checking  for the                                                       operator and what to do with it
      else if (symbol === '-') { nt -= nextNum; } 
      else if (symbol === '*') { nt *= nextNum; } 
      else if (symbol === '/') { nt /= nextNum; }
      
      i++; // JS: This is is to iterate/move onward after 
    }
    
    // Swap the '-' symbol so text input handles it correctly
    // JS: If nt is less than 0 the below if statement allows the value to be correctly calculated/rendered as a negative integer.
    if (nt < 0) {
      nt = Math.abs(nt) + '-';
    }
    
    $("#answer").val(nt);
		entries = [];
    temp = '';
    
  // Push number
  // IR: pushes temp (the calculator input) and the value to the entries array, which contains the user inputted numbers.
  } else {
    entries.push(temp);
    entries.push(val);
    temp = '';
  }
});