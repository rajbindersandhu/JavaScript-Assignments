// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

import fs from "fs";

const data = "hello world, this is test data";

fs.writeFile("easy/test.txt", data, (err) => {
    if(err){
        throw new Error(err);
    }
})