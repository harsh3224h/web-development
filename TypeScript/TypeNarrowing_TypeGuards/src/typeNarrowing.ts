function getChai(kind: string | number){
  if(typeof kind === "string"){
    return `Making ${kind} ...`
  }
  return `Chai order: ${kind}`
}

function orderChai(size: "small" | "medium" | "large" | number){
  if(size === "small"){
    return `Serving small cutting chai...`;
  }
  if(size === "medium" || size === "large"){
    return `Serving extra chai`;
  }
  return `Chai order #${size}`;
}

class kulhadChai{
  serve(){
    return `Serving kulhad chai`;
  }
}

class normalChai{
  serve(){
    `Serving normal masala chai`;
  }
}

function serve(chai: kulhadChai | normalChai){
  if(chai instanceof kulhadChai){
    return chai.serve();
  }
}

type chaiOrder = {
  type: string,
  suger: number,
}

function isChaiOrder(obj: any) : obj is chaiOrder {
  return (typeof obj === "object" && obj!== null && typeof obj.type === "string" && obj.suger === "number")
}

function serveOrder(item: chaiOrder | string){
  if(isChaiOrder(item)){
    return `serving ${item.type} chai with ${item.suger} suger.`
  }
  return `Serving ${item}`
}

type MasalaChai = {type: "Masala", spicelevel: number}
type GingerChai = {type: "Ginger", spicelevel: number}
type ElaichiChai = {type: "Elaichi", spicelevel: number}

type chai = MasalaChai | GingerChai | ElaichiChai

function makeChai(order: chai){
  switch (order.type) {
    case "Masala":
      return `Serving Masala Chai`
    
    case "Elaichi":
      return `Serving Elaichi Chai`

    case "Ginger":
      return `Serving Ginger Chai`
  
    default:
      break;
  }
}

const order_01:MasalaChai = {
  type: "Masala",
  spicelevel: 10
}

console.log(makeChai(order_01))