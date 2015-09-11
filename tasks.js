"use strict";

// Task 1

(function(){
  function binaryStrToDecimal(binaryStr){
    let result = 0;
    for(let i = 0; i < binaryStr.length; i++){
      let pos = Math.pow(2, (binaryStr.length-i-1));
      result += binaryStr.charAt(i) * pos;
    }
    return result;
  }

  function calculate(n1, n2) {
    return binaryStrToDecimal(n1) + binaryStrToDecimal(n2); 
  }

  console.assert(calculate('10', '10') === 4);
  console.assert(calculate('10', '0') === 2);
  console.assert(calculate('101', '10') === 7);
})();


// Task 2

(function(){
  function num(n){
    return function(operator){
      if(operator){
        return operator(n);
      }else{
        return n;
      }
    }
  }
  function plus(operandRight){
    return function(operandLeft){
      return operandLeft + operandRight;
    }
  }
  function minus(operandRight){
    return function(operandLeft){
      return operandLeft - operandRight;
    }
  }
  function times(operandRight){
    return function(operandLeft){
      return operandLeft * operandRight;
    }
  }
  function dividedBy(operandRight){
    return function(operandLeft){
      return operandLeft / operandRight;
    }
  }

  let zero = num(0),
    one = num(1),
    two = num(2),
    three = num(3),
    four = num(4),
    five = num(5),
    six = num(6),
    seven = num(7),
    eight = num(8),
    nine = num(9);

  console.assert(seven(times(five())) === 35);
  console.assert(four(plus(nine())) === 13);
  console.assert(eight(minus(three())) === 5);
  console.assert(six(dividedBy(two())) === 3);
})();
  
