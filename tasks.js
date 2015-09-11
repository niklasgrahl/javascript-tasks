"use strict";


function binaryStrToDecimal(binaryStr) {
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
