/*
  Write a function `findDuplicates` which takes an array as input and returns an array containing all the duplicate elements.

  What are duplicates?
  - Elements that appear more than once in the array are considered duplicates.

  Example:
  - Input: [10, 20, 30, 10, 40]
  - Output: [10]

  - Input: [1, 2, 3, 4, 5]
  - Output: []

  - Input: []
  - Output: []

  Once you've implemented the logic, test your code by running
  - `npm run test-duplicates`
*/


function findDuplicates(arr) {
  let resultArr = [];
  for(let i=0;i<arr.length;i++){
    let tempArr = [...arr.slice(0,i),...arr.slice(i+1)];
    // console.log(tempArr)
    if(tempArr.includes(arr[i]) && !(resultArr.includes(arr[i]))){
      resultArr.push(arr[i]);
    }
  }
  return resultArr;
}
// console.log(findDuplicates([1, 2, 3, 4, 5]))
module.exports = findDuplicates;

