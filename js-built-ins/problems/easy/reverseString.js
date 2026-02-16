/*
  Write a function `reve` which takes a string as input and returns the reversed version of the string.

  What is reversing a string?
  - Reversing a string means rearranging its characters in the opposite order.

  Example:
  - Input: "Sumana"
  - Output: "anamuS"

  - Input: "hello"
  - Output: "olleh"

  - Input: ""
  - Output: ""

  Once you've implemented the logic, test your code by running
  - `npm run test-reverseString`
*/

function reverseString(str) {
  let revStr = ""
  for(let i=0;i<str.length;i++){
    revStr += str[(str.length - 1)-i]
  }
  return revStr
}
// console.log(reverseString("Sumana"))
module.exports = reverseString;
