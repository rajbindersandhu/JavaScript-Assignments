/*
  Write a function `reverseInteger` which takes an integer as input and returns the integer with its digits reversed. If the input is negative, the reversed integer should also be negative.

  What is reversing an integer?
  - Reversing an integer means rearranging its digits in the opposite order while maintaining its sign.

  Example:
  - Input: 123
  - Output: 321

  - Input: -456
  - Output: -654

  - Input: 100
  - Output: 1

  - Input: 0
  - Output: 0

  Once you've implemented the logic, test your code by running
  - `npm run test-reverseInteger`
*/

function reverseInteger(num) {
  let tempNum = num<0 ? -1 *(num): num;
  let result = 0;
  while(tempNum > 0){
    result = (10*result) + (tempNum%10);
    tempNum = Math.floor(tempNum/10);
  }
  return (num < 0 ? (result * -1) : result)
}

// console.log(reverseInteger(100))

module.exports = reverseInteger;
