/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator { 
  constructor(){
    this.result = 0;
  }
  add(numb){
    this.result += numb;
  }
  subtract(numb){
    this.result -= numb;
  }
  multiply(numb){
    this.result *= numb;
  }
  divide(numb){
    if(numb == 0){
      throw new Error("Division by 0")
    }
    this.result /= numb;
  }
  clear(){
    this.result = 0;
  }
  getResult(){
    return this.result;
  }
  calculate(str){
    //remove spaces
    str = str.trim();
    let rmSpc  = ""
    for(let i=0;i<str.length;i++){
      if(/\D/.test(str[i]) && !(" +-/*().".includes(str[i]))){
        throw new Error(`${str[i]} is a invalid token in expression`);
      }else if(str[i]!= " "){
        rmSpc += str[i];
      }
    }

    // console.log("After removing all spaces", rmSpc);

    // Do bracket operation
    let rmBrk = ""
    if(rmSpc.includes("(") && rmSpc.includes(")")){
      let splitList = rmSpc.split("");
      let tempQ = []
      for(let i=0;i<splitList.length;i++){
        // console.log(`Found ${splitList[i]}`);
        if(splitList[i]== ")" && !tempQ.includes("(")){
          throw new Error(`invalid expression as ')' exist without ')' at index ${i} `)}
        else if(splitList[i]== ")"){
          // console.log("Solving for ')'")
          let result = 0
          let operator = "";
          while(tempQ[tempQ.length-1] != "(" && tempQ.length>0){
            let index = tempQ.length - 1;
            if(/\d/.test(tempQ[index])){
              if(operator.length == 0){
                result = parseFloat(tempQ[index])
              }else{
                switch(operator){
                  case "+":
                    result = parseFloat(tempQ[index]) + result;
                    break;
                  case "-":
                    result = parseFloat(tempQ[index]) -result;
                    break;
                  case "*":
                    result = parseFloat(tempQ[index]) * result;
                    break;
                  case "/":
                    if(result == 0){
                      throw new Error("Division by zero")
                    }
                    result = parseFloat(tempQ[index])/result;
                    break;
                }
                operator = "";
              }
            }else if(operator.length > 0){
              throw new Error(`2 operator -> ${operator} & ${tempQ[index]} with no operand in between`)
            }else{
              operator = tempQ[index]
            }
            tempQ.pop();
          }
          if(tempQ.length > 0){
            tempQ.pop()
          }
          tempQ.push(result);
          // console.log("After solving for ')' -> ", tempQ)
        }else if(/\d/.test(splitList[i]) || splitList[i] == "."){
          // console.log("Solving for number")
          if(tempQ.length > 0 && (/\d/.test(tempQ[tempQ.length - 1])|| splitList[i] == ".")){
            let newNumb = tempQ[tempQ.length - 1] + splitList[i];
            tempQ.pop()
            tempQ.push(newNumb);
            
          }else{
            tempQ.push(splitList[i]);
            // console.log()
          }
          // console.log("After adding number -> ", tempQ)
        }else{
          // console.log("Solving for operator")
          tempQ.push(splitList[i])
          // console.log("After adding operator -> ", tempQ)
        }
      }
      rmBrk = tempQ.join("");
    }else if((rmSpc.includes("(") && !rmSpc.includes(")")) || (!rmSpc.includes("(") && rmSpc.includes(")"))){
      throw new Error("Invalid expression, as missing bracket")
    }else{
      rmBrk = rmSpc.slice();
    }

    // console.log("After solving all bracket", rmBrk)

    // remaing math operation

    if(rmBrk.length > 1){
      let splitList = rmBrk.split("");
      let tempQ = []
      for(let i=0;i<splitList.length;i++){
        if(/\d/.test(splitList[i]) || splitList[i] == "."){
          if(tempQ.length > 0 && (/\d/.test(tempQ[tempQ.length - 1]) || splitList[i] == ".")){
            let newNumb = tempQ[tempQ.length - 1] + splitList[i];
            tempQ.pop()
            tempQ.push(newNumb);
          }else{
            tempQ.push(splitList[i]);
          }
        }else{
          tempQ.push(splitList[i])
        }
      }
      // console.log(tempQ)
      if(tempQ.includes("/")){
        while(tempQ.includes("/")){
          let index = tempQ.indexOf("/");
          if(tempQ[index+1] == "0" || tempQ[index+1] == 0){
            throw new Error("Division by zero")
          }
          let result = parseFloat(tempQ[index-1])/parseFloat(tempQ[index+1]);
          tempQ.splice(index-1,3, result);
        }
      }
      if(tempQ.includes("*")){
        while(tempQ.includes("*")){
          let index = tempQ.indexOf("*");
          let result = parseFloat(tempQ[index-1])*parseFloat(tempQ[index+1]);
          tempQ.splice(index-1,3, result);
        }
      }
      if(tempQ.includes("+")){
        while(tempQ.includes("+")){
          let index = tempQ.indexOf("+");
          let result = parseFloat(tempQ[index-1])+parseFloat(tempQ[index+1]);
          tempQ.splice(index-1,3, result);
        }
      }
      if(tempQ.includes("-")){
        while(tempQ.includes("-")){
          let index = tempQ.indexOf("-");
          let result = parseFloat(tempQ[index-1])-parseFloat(tempQ[index+1]);
          tempQ.splice(index-1,3, result);
        }
      }

      this.result = tempQ[0];
    }else if(rmBrk == 1 && /\d/.test(rmBrk)){
      this.result = rmBrk;
    }
    
  }
}

// let cal = new Calculator();
// cal.calculate("(10/0)");
// console.log("Final result = ", cal.getResult())

module.exports = Calculator;