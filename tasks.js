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


// Task 3
// I had to google to find out you could use toString on a function to get the names of the parameters.
// It does not preserve the calling context
// It does not work if you are using a minifier that changes the argument names.

(function(){
  function add(a, b) {
    return a + b;
  };

  function getArgumentNames(fnc){
    const argStr = fnc.toString().match(/^function [^(]*\(([^)]*)\)/)[1];
    return argStr.split(',').map((s) => { return s.trim(); });
  }

  function defaultArguments(fnc, defaults){
    const originalArgs = getArgumentNames(fnc);
    const a = [];

    return function(){
      let args = Array.prototype.slice.call(arguments);
      let newArgs = [];
      let dLength = Object.keys(defaults).length;

      console.log('#', 'in', args, 'defaults', defaults);
      originalArgs.forEach((oa, i) => {
        console.log('  ', 'in', args, 'defaults', defaults);
        if(!defaults[oa] || ( defaults[oa] && args.length < dLength - i) ){ 
          console.log(originalArgs[i], 'not set, default', defaults[oa]);
          const a1 = args.shift();
          if(a1) newArgs.push(a1);
          else newArgs.push(undefined);
        } else {
          newArgs.push(defaults[oa]);
        }

        console.log('=', newArgs);
        console.log();

        return fnc.apply(null, newArgs);
      });
    }
  }

  let add_ = defaultArguments(add, { b: 9 });
  console.assert(add_(10) === 19); 
  console.assert(add_(10, 7) === 17); 
  console.assert(add_() === NaN); 

  add_ = defaultArguments(add_, { b: 3, a: 2 });
  console.assert(add_(10) === 13); 
  console.assert(add_() === 5); // returns 5

  add_ = defaultArguments(add_, { c: 3 }); // doesn't do anything, since c isn't an argument
  console.assert(add_(10) === NaN); // returns NaN
  console.assert(add_(10, 10) === 20); // returns 20
})();


