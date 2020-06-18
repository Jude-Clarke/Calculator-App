
// VARIABLES

var num1 = [];
var num2 = [];
var ready;
var next;
var done;
var op;
var answer;
// var blank = setInterval(blink, 500);

// HTML variables
var message = document.querySelector("#message-board");
var numbers = document.querySelectorAll(".number");
var operators = document.querySelectorAll(".operator");
var buttons = document.querySelectorAll(".button");
var equals = document.querySelector("#equals");

// ____________________________________________________

// FUNCTIONS
function think() {
  message.classList.remove("highlight");
}
function unstick(){
  for(var i = 0; i < operators.length; i++) {
    operators[i].parentElement.classList.remove("chosen");
  };
}
clear();
function clear() {
  think();
  unstick();
  ready = true;
  op    = false;
  next  = false;
  done  = false;
  num1  = [];
  num2  = [];
  operator = null;
  message.textContent = 0;
  // message.innerHTML = blank;
}

function select() {
  console.log("selecting");
  if(ready === true && this.classList.contains("number")) {
    if(this.id === "decimal"){
      num1.push(this.textContent);
    } else {
      num1.push(Number(this.textContent));
    }
    message.textContent = num1.join("");
    op = true;
  } else if((this.classList.contains("operator") === true && operator === null) && (op === true)) {
    operator = window[this.id];
    this.parentElement.classList.add("chosen");
    console.log(operator + " selected");
    think();
    ready = false;
    next = true;
    op = false;
    if(Array.isArray(num1) === true){
      num1 = Number(num1.join(""));
    };
  } else if(next === true && this.classList.contains("number") === true) {
    if(this.id === "decimal"){
      num2.push(this.textContent);
    } else {
      num2.push(Number(this.textContent));
      }
      message.textContent = num2.join("");
      done = true;
    };
    // if(done === true && this.id === "equals"){
    //     // num2 = Number(num2.join(""));
    // };
}
function respond() {
  if(done === true){
    num2 = Number(num2.join(""));
    num1 = calc(num1, num2, operator);
    message.textContent = num1;
    message.classList.add("highlight");
    unstick();
    op = true;
    operator = null;
    ready = true;
    done = false;
    num2 = [];
  }
}


// operator functions

function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}
function calc(num1, num2, operator) {
  return operator(num1, num2);
}

// FIX CODE
//
// function blink() {
//   if(message.innerHTML === "Hi") {
//     message.innerHTML = "Bye";
//   } else if (message.innerHTML === "Bye") {
//       message.innerHTML = "Hi";
//   }
// }

// EVENT LISTENERS

// for(var i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener("click", function() {
//     console.log("hey!");
//   });
//   }



for(var i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", select);
}
for(var i = 0; i < numbers.length; i ++) {
  numbers[i].addEventListener("click", select);
}
equals.addEventListener("click", respond);
operators[0].addEventListener("click", clear);
