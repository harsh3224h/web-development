let subs: string | number = "1M"

let apiRequestStatus: "pending" | "success" | "error" = "success"

let airlineSeat : "aisle" | "window" | "middle" = "aisle"

// airlineSeat = "corner" (incorrect)

const orders = ['12', '20', '28', '42'];
let currentOrder:string;

for(let order of orders){
  if(order == "28"){
    currentOrder = order;
    break;
  }
  currentOrder = '11'
}

// currentOrder = 42;

console.log(currentOrder)