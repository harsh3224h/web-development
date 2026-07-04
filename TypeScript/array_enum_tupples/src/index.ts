const chaiFlavors:string[] = ["Masala", "Adrak"];
const chaiPrice:number[] = [10,20]

const rating:Array<number> = [4.5, 5.0]

type Chai = {
  name: string;
  price: number
}

const menu:Chai[] = [
  {name: "Masala", price: 15},
  {name: "Adrak", price:25}
]

const cities: readonly string[] = ["Jaipur", "Delhi"];
// cities.push("Pune")

const table: number[][] = [
  [1,2,3],
  [4,5,6]
]

let chaiTuple: [string, number];
chaiTuple = ["Masala", 20];
// chaiTuple = [25,"Adrak"];


let userInfo:[string, number, boolean?];
userInfo = ["harsh", 100];
userInfo = ["harsh", 100, true];

const location: readonly [number, number] = [28.5, 48.2];

const ChaiItems : [name:string, price:number] = ["Masala", 25];


enum cupSize {
  SMALL,
  MEDIUM,
  LARGE
}

const size = cupSize.LARGE

enum status {
  PENDING = 100,
  SERVED, // 101
  CANCEL // 101
}

enum ChaiType {
  MASALA = "masala",
  GINGER = "ginger",
}

function makeChai(type:ChaiType) {
  console.log(`Making ${type} chai.`)
}

makeChai(ChaiType.GINGER)
// makeChai("Masala")

enum RandomEnum {
  ID = 1,
  name = "Chai"
}

const enum Sugars {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3
}

const s = Sugars.LOW


let t : [string, number] = ["chai", 10];
// t.push("extra")