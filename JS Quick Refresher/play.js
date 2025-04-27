const person = {
    name: "John Doe",
    age: 30,
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

// A constant variable. This stores the address of array and not the actual array
// so array can still be modified but the hobbies variable(address to the array) cannot be changed.
const hobbies = ["reading", "gaming", "hiking"];

for(i of hobbies) {
    console.log(i);
}

console.log(hobbies.map( hobbie => {
    return "Hobbie: " + hobbie;
}));

console.log(hobbies);

// Since the array itself is not immutable it will be updated.
hobbies.push("Jumping");
console.log(hobbies);

// Creating a copy of array. This is known as spread. 
// One other way to use it is to use hobbies.slice().
let hobbies2 =[...hobbies];
hobbies2.push("Sitting");
console.log(hobbies); //hobbies will not be modified as we modified a copy of the array.

// To make a copy of the object we can use below syntax
let person2 = {...person};
console.log(person2);

// We have concept of rest operator as well. This uses the same ... but is used in method argument
// to accept different length of arguments
const toArray = function(...args) {
    return args;
}

console.log(toArray(10, 14, 17, 16, 2));

// Destructuring -> we can extract few variables from the entire object when the 
// object is passed to the function
const printNameAndAge = function({name, age}) {
    console.log("Name: " + name + ", Age: " + age);
};

printNameAndAge(person);

// We can also do array destructuring in same way
const [h1, h2] = hobbies;
console.log("Hobbie1: " + h1 + ", Hobbie2: " + h2);