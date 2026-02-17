/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  let start=0;
  let end = str.length-1;
  while(start < end){
    if(!(/[a-z]/.test(str[start].toLowerCase()))){
      start += 1
      continue;
    }
    if(!(/[a-z]/.test(str[end].toLowerCase()))){
      end -= 1;
      continue;
    }

    if(str[start].toLowerCase() != str[end].toLowerCase()){
      return false;
    }
    start+=1
    end-=1
  }
  return true;
}
// console.log(isPalindrome("Nant"))
module.exports = isPalindrome;