// This is a async code which will be executed once the wait time is over.
// All the sync code after this code will be executed in the mean time.
setTimeout(() => {
    console.log("This is done!");
}, 1);

console.log("Hello!");
console.log("Hello2!");

// Callback
const fetchData = (callback) => {
    setTimeout(() => {
        callback('Done');
    }, 1500);
}

setTimeout( () => {
    console.log("Callback function");
    fetchData(text => {
        console.log(text);
    })
}, 1500);

// Promises
const fetchData2 = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done from promise');
        }, 1500);
    })
    return promise;
};

setTimeout( () => {
    console.log("Promise function");
    fetchData2().then(text => console.log(text));
}, 1500);