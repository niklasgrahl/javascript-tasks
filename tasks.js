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
});

// Task 4

(function(){
  const START_TIME = 9 * 60; // 9:00
  const MAX_TIME = 600; // 19:00

  function timeStrToNumber(timeStr){
    const s = timeStr.split(':');
    return (+s[0]) * 60 + (+s[1]) - START_TIME;
  }
  function numberToTimeStr(number){
    const minute = number % 60;
    const hour = (START_TIME + number - minute) / 60;
    return hour + ":" + minute;
  }

  function areSchedulesFree(schedules, start, minutes){
    return schedules.every(s => {
      return s.every(s2 => {
        return (s2[0] >= start + minutes || s2[1] <= start);
      });
    });
  }
  
  function numberifySchedule(schedule){
    return schedule.map(s => {
      return [timeStrToNumber(s[0]), timeStrToNumber(s[1])];
    });
  }

  function firstAppointment(schedules, minutes){
    let currentTime = 0;
    let found = null;
    let schedulesNbr = schedules.map(numberifySchedule);

    while(!found && currentTime < MAX_TIME){
      if(areSchedulesFree(schedulesNbr, currentTime, minutes)){
        found = currentTime;
      }else{
        currentTime += schedulesNbr.reduce((prev, curr) => {
          let time = curr.reduce(a => {
            let endTime = a[1];
            return (prev && endTime >= prev) ? prev : endTime;
          });
          return Math.min(prev, time);
        });
      }
    }
    return found;
  }

  let schedules = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
  ];

  console.assert(timeStrToNumber('12:15') === 195);
  console.assert(numberToTimeStr(195) === '12:15');
  console.assert(numberifySchedule(schedules[0])[1][1] === 420);
  console.assert(areSchedulesFree(schedules.map(numberifySchedule), 195, 10));
  console.assert(!areSchedulesFree(schedules.map(numberifySchedule), 190, 10));
  //console.assert(firstAppointment(schedules, 60) === '12:15');
})();
