// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require("fs");
fs.readFile("medium/test.txt", "utf8", (err, data) => {
    if(err){
        throw new Error(err);
    }
    const dataList = data.split(" ");
    console.log("dataList : ", dataList)
    let formatData = (dataList.filter(ele => ele && ele != " ")).join(" ");
    console.log("formData : ", formatData);
    fs.writeFile("medium/test.txt", formatData, (err) => {
        if(err){
            throw new Error(err);
        }
    })
})