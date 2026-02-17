/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  let maxVal = numbers.length <=0 ? undefined : numbers[0];
  for(let i=0;i<numbers.length;i++){
    if(numbers[i] > maxVal){
      maxVal = numbers[i];
    }
  }
  return maxVal;
}
// console.log(findLargestElement([3, 7, 2, 9, 1]))
module.exports = findLargestElement;