// simple chai object

const chai0 = {
  name: "Masala Chai",
  price: 20,
  isHot: true,
}


// type creation of object

type Chai = {
  name: string,
  price: number,
  isHot: boolean,
}

const Tea: Chai = {
  name: "Masala Chai",
  price: 20,
  isHot: true,
}

console.log(Tea);
console.log(typeof Tea)
// console.log(Chai) // it will result in the runtime error


// union type declaration
type add = string | number

const first:add = "one"
const second:add = 2

console.log(first)
console.log(second)


// duck typing example
type User = {
  name: string,
  age: number
}

const person = {
  name: "Harsh",
  age: 20,
}

const user:User = person

// This works because person has the same structure.




// different type names

type Student = {
  name: string,
  age: number
}

type Employee = {
  name: string,
  age: number,
}

const emp:Employee = {
  name: "Alice",
  age: 30,
}

const student:Student = emp;  //TypeScript compares only the properties.



// missing property error
type User01 = {
  name: string,
  age: number,
}

const test01:User01 = {
  name: "Steve",
}

// extra property error
const test02:User01 = {
  name: "John",
  age: 35,
  style: "actor"
}

// extra property works if assigned by the way of variable

const test_user = {
  name: "Steve",
  age: 40,
  game: "Minecraft",
}


const minecraft_user:User01 = test_user;

console.log(test_user)



// optional properties (declared with ?: syntax)

type car = {
  brand: string,
  model?: string,
  year: number,
}

const car1:car = {
  brand: "BMW",
  year: 2026,
}

const car2:car = {
  brand: "Merceedes",
  model: "AMG",
  year: 2026
}



// splitting of large types makes the code more readable

// bad example type

type bad_employee_type = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
}

// good example type

type Address = {
  city: string,
  state: string,
  country: string,
}

type Contact = {
  email: string,
  phone: string,
}

type company_employee = {
  id: number,
  first_name: string,
  last_name: string,
  address: Address,
  contact: Contact
}

// utility types in TypeScript

// original obj

type user09 = {
  name: string,
  age: number
}

// using partial

type PartialUser = Partial<user09>

// this is equavalent to

type user10 = {
  name?:string,
  age?:number
}

// real world example be in the update functions where not all properties to be present

// example ->

const UpdateUser:Partial<user09> = {
  age: 20,
}

console.log(UpdateUser)


// required

const RequiredUser:Required<user09> = {
  name: "steve",
  age: 20,
}

// using pick

type Publisher = {
  id: number,
  name: string,
  age: number,
  isActive: boolean
}

type pub1 = Pick<Publisher, "id" | "name">;

const pub1_user:pub1 = {
  id: 1,
  name: "user"
}



// using omit

type pub2 = Omit<Publisher, "id" | "age" | "isActive">;

const pub2_user:pub2 = {
  name: "user"
}


