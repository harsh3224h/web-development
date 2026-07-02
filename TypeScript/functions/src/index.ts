function makeChai(type: string, cups:number): void{
  console.log(`Making ${cups} of ${type} chai.`);
}

makeChai("Masala", 2);


// interesting example with covering wider topics

function createChai(order: {
  type: string,
  suger: number,
  size: "small" | "large"
}):void {
  
  console.log(order)
  // return 10
}


const chaiOrder:{
  type: string,
  suger: number,
  size: "small" | "large"
} = {
  type: "Masala Chai",
  suger: 1,
  size: "large",
}

createChai(chaiOrder);