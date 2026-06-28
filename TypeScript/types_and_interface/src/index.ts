// making reusable type to avoid code duplicacy
type ChaiOrder = {
  type: string;
  suger: number;
  strong: boolean;
}

function makeChai(order: ChaiOrder){
  console.log(order);
}

function serveChai(order: ChaiOrder){
  console.log(order)
}

// concept of interfaces starts here
type teaRecipie = {
  water: number;
  milk: number;
}

class MasalaChai implements teaRecipie {
  water = 100;
  milk = 50;
}

// example of union
interface CupSize {
  size: "small" | "large" // literal type
}

class chai implements CupSize {
  size: "small" | "large" = "small";
}


// similarly in designing the API responses, we might need to use interface
// type Response = {ok: true} | {ok: false};
// class myRes implements Response {
//   ok:boolean = true;
// }


// example of intersection
type BaseChai = {teaLeaves: number}
type Extra = {masala: number};

type NewChai = BaseChai & Extra;

const cup:NewChai = {
  teaLeaves: 2,
  masala: 1
}


// example of optional type
type User = {
  name: string;
  bio?: string
}

const u1: User = {
  name: "Steve",
}

const u2:User = {
  name: "John",
  bio: "I love driving, shooting and wants peace in life."
}


// readonly type 
type Config = {
  readonly Appname: string;
  version: number
}

const cfg: Config = {
  Appname: "MasterJi",
  version: 1
}

// cfg.Appname = "ChaiCode" 