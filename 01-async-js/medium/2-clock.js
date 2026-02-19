// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)


function showTime(){
    let dateObjt = new Date();
    let hours = dateObjt.getHours();
    let mins = dateObjt.getMinutes();
    let sec = dateObjt.getSeconds();
    let dayType = hours>=0 && hours<12 ? "AM": "PM"
    let displayTime = `${hours}:${mins}:${sec} ${dayType}`;
    process.stdout.write("\r");
    process.stdout.write(displayTime);
}
showTime();
setInterval(showTime, 1000);