/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/
function isAnagram(str1, str2) {
  if(str1.length != str2.length){
    return false;
  }
  let tempStr = str2.slice().toLowerCase();
  for(let i=0;i<str1.length;i++){
    if(!tempStr.includes(str1[i].toLowerCase())){
      return false;
    }else{
      let foundIndex = tempStr.indexOf(str1[i].toLowerCase());
      tempStr = tempStr.slice(0,foundIndex) + tempStr.slice(foundIndex+1)
    }
  }
  if(tempStr.length > 0){
    return false;
  }
  return true;
}
// console.log(isAnagram("Debit Card", "Bad Credit"))
module.exports = isAnagram;