/*
  Write a function `compression` which takes a string as input and returns a compressed version of the string. The compression is done by replacing consecutive repeating characters with the character followed by the count of repetitions. If a character does not repeat, it is not followed by a count.

  Example:
  - Input: "aaabbbbcccvvmm"
  - Output: "a3b4c3v2m2"

  - Input: "abc"
  - Output: "abc"

  - Input: "aabbcc"
  - Output: "a2b2c2"

  - Input: ""
  - Output: ""

  Note:
  - The function should work for any alphanumeric string.

  Once you've implemented the logic, test your code by running
  - `npm run test-compressString`
*/
function compression(str) {
  let resultStr = "";
  let movingPtr= 0;
  let countPtr = 0;
  while(movingPtr <= str.length){
    if(str[movingPtr] != str[countPtr]){
      if(movingPtr - countPtr == 1){
        resultStr += str[countPtr];
      }
      else{
        let diff = movingPtr - countPtr;
        resultStr += `${str[countPtr]}${diff}`;
      }
      countPtr = movingPtr;
    }
    movingPtr += 1;
  }
  return resultStr;
}

// console.log(compression("abc"))

module.exports = compression;