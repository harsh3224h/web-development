let response:any = "42";

let numericLength = (response as string).length

type Book = {
  name: string
}

let bookString = '{"name": "Atomic Habits"}'

let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name)


// --- any doesn't gave any error 

let value:any;

value = 10;
value = "hello";
value = {test: "Test property"};

value.toUpperCase();

// -- using type guads along with unkown type
let newValue:unknown;

newValue = 10;
newValue = "hello";
newValue = {test: "Test property"};

if(typeof newValue === "string"){
  newValue.toUpperCase();
}

// checking if the error is instance of global Error class
try {
  
} catch (error) {
  if(error instanceof Error){
    console.log(error.message)
  }
  else{
    console.log("Error", error)
  }
}

const data:unknown = "Chai aur Code";

const strData:string = data as string;

console.log(strData);
console.log(typeof strData);

type Role = "admin" | "user" | "SuperAdmin";

function redirect(role: Role): void {
  if(role === "admin"){
    console.log(role);
    console.log("Redirecting to admin route");
    return;
  }
  if(role === "user"){
    console.log(role);
    console.log("Redirecting to user route");
    return;
  }
  role;
  console.log(role);
}

function neverReturn():never{
  while(true){
    
  }
}