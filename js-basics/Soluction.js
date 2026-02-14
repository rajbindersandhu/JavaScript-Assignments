
function ques1(list){
    let result = 0;
    for(let i=0;i<list.length;i++){
        result+= list[i];
    }
    return result;
}

// let dummyObjt = { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] }

// let resultObjt = {};

// for(let key in dummyObjt){
//     let result = ques1(dummyObjt[key]);
//     resultObjt[key] = result;
// }

// console.log(resultObjt);

function ques2(list){
    let resultObjt = {};
    for(let i=0;i<list.length;i++){
        if(list[i] in resultObjt){
            resultObjt[list[i]] += 1;
        }else{
            resultObjt[list[i]] = 1;
        }
    }
    return resultObjt;
}

// console.log(ques2(["apple", "banana", "apple", "orange", "banana", "apple"]));

function ques3(objt){
    let resultObjt = {};
    for(let key in objt){
        resultObjt[objt[key]] = key;
    }
    return resultObjt;
}

// console.log(ques3({ a: "x", b: "y", c: "z" }));

function ques4(objt){
    let maxKey;
    for(let key in objt){
        if(!maxKey){
            maxKey = key
        }
        if(objt[key] > objt[maxKey]){
            maxKey = key;
        }
    }
    return maxKey;
}

// console.log(ques4({ a: 10, b: 50, c: 20 }));

function ques5(objt){
    let resultList = [];
    for(let key in objt){
        resultList = [...resultList,...objt[key]];
    }
    return resultList
}

// console.log(ques5({ fruits: ["apple", "banana"], veggies: ["carrot", "pea"] }))

function ques6(userList){
    let resultObjt = {};
    for(let i=0;i<userList.length;i++){
        let tempObjt = userList[i];
        if(tempObjt["city"] in resultObjt){
            resultObjt[tempObjt["city"]].push(tempObjt["name"]);
        }else{
            resultObjt[tempObjt["city"]] = [tempObjt["name"]];
        }
    }
    return resultObjt;
}
// console.log(ques6([
//   { name: "A", city: "Delhi" },
//   { name: "B", city: "Mumbai" },
//   { name: "C", city: "Delhi" }
// ]));

function ques7(objt){
    let resultObjt = {};
    for(let key in objt){
        if(objt[key] > 50){
            resultObjt[key] = objt[key];
        }
    }
    return resultObjt;

}

// console.log(ques7({ a: 20, b: 60, c: 40, d: 90 }))

function ques8(objt){
    let reqStudent;
    let maxAvg;
    for(let key in objt){
        let avg = (objt[key].reduce((acc, ele) => acc+ele, 0))/objt[key].length;
        if(!reqStudent){
            reqStudent = key;
            maxAvg = avg;
        }
        if(avg > maxAvg){
            reqStudent = key;
            maxAvg = avg;
        }

    }
    return reqStudent;
}

// console.log(ques8({ A: [80, 90], B: [70, 75, 85] }))

function ques9(objt){
    let resultList = [];
    for(let key in objt){
        for(let i=0;i<objt[key].length;i++){
            console.log(`${objt[key][i]} -> ${resultList} = ${resultList.includes(objt[key][i])}`);
            if(!(resultList.includes(objt[key][i]))){
                resultList.push(objt[key][i]);
            }
        }
    }
    return resultList;
}

// console.log(ques9({ x: [1,2,3], y: [2,3,4], z: [4,5] }));

function ques10(objt, filterList){
    let result = {};
    for(let i=0;i<filterList.length;i++){
        if(filterList[i] in objt){
            result[filterList[i]] = objt[filterList[i]];
        }
    }
    return result;
}

// console.log(ques10({ name: "Rahul", age: 23, city: "Noida" }, ["name","city"]))

function ques12(objt){
    let resultList = [];
    for(let key in objt){
        let tempList = [key, objt[key]]
        if(resultList.lengt == 0){
            resultList.push(tempList);
        }else{
            let i=0
            for(;i<resultList.length;i++){
                if(resultList[i][1]<tempList[1]){
                    break;
                }
            }
            resultList.splice(i,0,tempList);
        }
    }
    return resultList;
}

// console.log(ques12({ a: 3, b: 1, c: 2 }));

function ques13(objt){
    return Object.keys(objt).length;
}

// console.log(ques13({ a: 1, b: 2, c: 3 }))

function ques14(objt){
    let resultObjt = {};
    for(let key in objt){
        resultObjt[key] = (objt[key][0].toUpperCase() + objt[key].slice(1));
    }

    return resultObjt;
}

// console.log(ques14({ name: "alice", city: "delhi" }));

function ques15(objt){
    let resultList = [];
    for(let key in objt){
        resultList.push(`${key}=${objt[key]}`); 
    }
    return resultList.join("&");
}

// console.log(ques15({ name: "Alice", age: 25 }))

function ques16(numbList){
    let result = {
        "even": 0,
        "odd": 0
    }

    for(let i=0;i<numbList.length;i++){
        if(numbList[i]%2==0){
            result["even"] += 1;
        }else{
            result["odd"] += 1;
        }
    }

    return result;
}

// console.log(ques16([1,2,3,4,5,6]));

function ques17(objt1, objt2){
    let keyList1 = Object.keys(objt1);
    let keyList2 = Object.keys(objt2);
    let resultList = [];

    for(let i=0;i<keyList1.length;i++){
        if(keyList2.includes(keyList1[i])){
            resultList.push(keyList1[i]);
        }
    }

    return resultList;
}

// console.log(ques17({ a: 1, b: 2, c: 3 }, { b: 4, c: 5, d: 6 }));

function ques18(userList){
    let resultObjt = {};

    for(let i=0;i<userList.length;i++){
        resultObjt[userList[i]["id"]] = userList[i];
    }

    return resultObjt;
}

// console.log(ques18([{ id: 1, name: "A" }, { id: 2, name: "B" }]));

function ques19(objt){
    for(let key in objt){
        if(Number.isNaN(parseInt(objt[key]))){
            return false
        }
    }
    return true;
}
// console.log(ques19({ a: 1, b: "hello", c: 3 }))

function ques20(userList){
    let resultObjt = {};

    for(let i=0;i<userList.length;i++){
        if(userList[i]["user"] in resultObjt){
            resultObjt[userList[i]["user"]] += userList[i]["amount"];
        }else{
            resultObjt[userList[i]["user"]] = userList[i]["amount"];
        }
    }

    return resultObjt;
}

// console.log(ques20([
//   { user: "A", amount: 100 },
//   { user: "B", amount: 200 },
//   { user: "A", amount: 50 }
// ]));

function ques21(resList){
    let resultObjt = {};
    for(let i=0;i<resList.length;i++){
        resultObjt[resList[i]["id"]] = resList[i]["name"];
    }

    return resultObjt;
}

// console.log(ques21([
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" }
// ]));

function ques22(objt){
    let resultObjt = {};

    for(let key in objt){
        if(objt[key]){
            resultObjt[key] = objt[key];
        }
    }

    return resultObjt;
}

// console.log(ques22({ a: 0, b: null, c: "hello", d: undefined, e: 5 }))

function ques23(user, request){
    let rolesObjt = {
        admin: ["read", "write"],
        user: ["read"],
        staff:["write"]
    }

    if(!(user in rolesObjt)){
        throw new Error(`${user} do not exist in DB`);
    }

    let permissionList = rolesObjt[user];
    if(permissionList.includes(request)){
        return true;
    }
    return false;
}

// console.log(ques23("user", "write"));

function q24(catList){
    let resultObjt = {};

    for(let i=0;i<catList.length;i++){
        if(catList[i]["category"] in resultObjt){
            resultObjt[catList[i]["category"]] += catList[i]["price"];
        }else{
            resultObjt[catList[i]["category"]] = catList[i]["price"];
        }
    }

    return resultObjt;
}

// console.log(q24([
//   { id: 1, category: "electronics", price: 100 },
//   { id: 2, category: "clothes", price: 50 },
//   { id: 3, category: "electronics", price: 200 }
// ]))

function q25(userList){
    let resultList = [];
    let idMem = {};
    for(let i=0;i<userList.length;i++){
        if(!(idMem[userList[i]["id"]])){
            idMem[userList[i]["id"]] = userList[i];
            resultList.push(userList[i]);
        }
    }
    return resultList;
}
// console.log(q25([
//   { id: 1, name: "A" },
//   { id: 2, name: "B" },
//   { id: 1, name: "A" }
// ]));

function q26(chunkObjt, size){
    let resultList = [];
    let tempChunk = [];
    let chunkList = Object.entries(chunkObjt);

    for(let i=0;i<chunkList.length;i++){
        if(tempChunk.length>=size){
            resultList.push(tempChunk);
            tempChunk = [];
        }
        tempChunk.push(chunkList[i]);
    }

    resultList.push(tempChunk);

    return resultList;

}

// console.log(q26({ a: 1, b: 2, c: 3, d: 4 }, 2))

function q27(objt){
    let valueList = Object.values(objt);
    let longestStr = ""
    for(let i=0;i<valueList.length;i++){
        if(valueList[i].length > longestStr.length){
            longestStr=valueList[i];
        }
    }
    return longestStr;
}

// console.log(q27({ a: "apple", b: "banana", c: "kiwi" }));

function q28(lanObjt){
    let resultObjt = {};

    for(let lang in lanObjt){
        for(let wrd in lanObjt[lang]){
            if(wrd in resultObjt){
                resultObjt[wrd][lang] = lanObjt[lang][wrd]
            }else{
                resultObjt[wrd] = {};
                resultObjt[wrd][lang] = lanObjt[lang][wrd];
            }
        }
    }

    return resultObjt;
}

// console.log(q28({
//   en: { hello: "Hello", bye: "Goodbye" },
//   fr: { hello: "Bonjour", bye: "Au revoir" },
//   es: { hello: "Hola" }
// }))

function q29(catList){
    let resultObjt = {};

    for(let i=0;i<catList.length;i++){
        if(catList[i]["category"] in resultObjt){
            resultObjt[catList[i]["category"]].push(catList[i]["id"]);
        }else{
            resultObjt[catList[i]["category"]] = [catList[i]["id"]]
        }
    }
    return resultObjt;
}

// console.log(q29([
//   { id: 1, category: "fruit" },
//   { id: 2, category: "veggie" },
//   { id: 3, category: "fruit" }
// ]))

function q30(objt, remove){
    // console.log(Object.keys(objt));
    // console.log(`${remove} -> ${Object.keys(objt)} = ${remove in Object.keys(objt)}`)
    if(Object.keys(objt).includes(remove)){
        console.log("found ", remove)
        delete objt[remove];
        return 1;
    }else if(Object.keys(objt).length == 0){
        return 0;
    }

    for(let key in objt){
        let result = q30(objt[key], remove)
        if(result){
            return 1;
        }
    }
}

function remove(objt, remove){
    q30(objt, remove);
    return objt
}

// console.log(remove({ a: { b: { c: 1, d: 2 } } },'c'));

function q31(objt1, objt2){
    if(Object.keys(objt1).length == 0 && Object.keys(objt1).length == 0){
        return true;
    }else if((Object.keys(objt1).length == 0 && Object.keys(objt1).length > 0) || (Object.keys(objt1).length > 0 && Object.keys(objt1).length == 0)){
        return false;
    }
    for(let i=0;i<Object.keys(objt1).length;i++){
        if(!Object.keys(objt2).includes(Object.keys(objt1)[i])){
            return false;
        }
    }

    let res;
    for(let key in objt1){
        res = q31(objt1[key], objt2[key]);
    }
    return res
}

// console.log(q31({ a: { x: 1, y: 2 } }, { a: { x: 1 } }));

function q33(objt){
    let resultObjt = {};
    let valuesList = Object.values(objt);

    for(let i=0;i<valuesList.length;i++){
        for(let j=0;j<valuesList[i].length;j++){
            if(valuesList[i][j] in resultObjt){
                resultObjt[valuesList[i][j]] += 1;
            }else{
                resultObjt[valuesList[i][j]] = 1;
            }
        }
    }
    console.log(resultObjt)
    let maxCount = {value: "",count: 0};
    for(let key in resultObjt){
        if(resultObjt[key] > maxCount["count"]){
            maxCount["value"] = key;
            maxCount["count"] = resultObjt[key];
        }
    }
    console.log(maxCount);
    return maxCount["value"];
}

// console.log(q33({ fruits: ["apple","apple","banana"], drinks: ["apple","tea"] }))

function q34(objt){
    let resultLst = [];
    let keyList = Object.keys(objt);
    for(let i=0;i<objt[keyList[0]].length;i++){
        let found = true;
        for(let j=1;j<keyList.length;j++){
            if(!objt[keyList[j]].includes(objt[keyList[0]][i])){
                found = false;
                break;
            }
        }
        if(found){
            resultLst.push(objt[keyList[0]][i])
        }
    }

    return resultLst;

}

// console.log(q34({ a: [1,2,3], b: [2,3,4], c: [3,4,5] }))

let x = { a: { x: 1, y: 2 } }
let y = { a: { y: 3, z: 4 } }

let z = {a: {...x["a"], ...y["a"]}};
// console.log()

function q37(objt, n){
    let entryList = Object.entries(objt);

    let sortedList = entryList.sort((a,b) => b[1]-a[1]);
    return sortedList
}

// console.log(q37({ a: 10, b: 50, c: 30, d: 40 }, 2))

let k = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Alice", age: 22 }
];

console.log(k.sort((a,b) => {
    if(a.name < b.name){
        return -1
    }else if(a.name == b.name){
        return a.age - b.age
    }else{
        return 1
    }
}))
