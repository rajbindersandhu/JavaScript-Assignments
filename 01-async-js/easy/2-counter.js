// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

let counter = 0;
const counterFn = () => {
    counter += 1;
    console.log(counter);
    setTimeout(counterFn, 1000);
}


setTimeout(counterFn, 1000);