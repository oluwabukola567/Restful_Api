const fs = require("fs");
console.log("I wanted to rename the file");

oldname = "work.txt";
newname = "new.txt";

fs.rename(oldname, newname, function(err){
    if(err){
        return console.error(err)
    }
    console.log(
        `The file ${oldname} has been renamed as ${newname} successfully`
    );
});