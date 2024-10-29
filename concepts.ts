//TypeScript

/*1.Intro:-
         1.Typescript is generally JavaScript with type checking
         2.The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.
         3.The TS is programming language built on top of JS
         4.We use TS for medium to large projects and we use JS for small simple projects
         5. Benefits: static type checking, code completion, Refacotring, Shorthand notations*/



/*2.Types by Inference:- TypeScript will use the value as its type
*/
let helloworld="Hello"



//3.Defining types:- We can use interface declarations for ojects and classes

//Interface:-we can explicitly describe/define the object’s shape using an interface declaration
interface User {
    name:string;
    id:number;
}
const user:User= {
    name:"Harry",
    id:0
}

//We can use an interface declaration with classes as well

interface User {
    name:string;
    id:number
}
class UserAccount {
    name:string;
    id:number;
    constructor(name:string,id:number) {
        this.name=name;
        this.id=id;
    }
}
const newuser:User=new UserAccount("Henry",1)

//We can use interfaces to annotate parameters and return values to functions
function deleteUser(user:User) {
    console.log(user.name)
}

function getAdminUser(): User {
    return{
        name:"Henry",
        id:1
    }
}


//4.Composing types:

//4.1:-Unions: With union we can say that type can be of many types.
type a=true|false;
type b= string | number;
type LockStates= "locked" | "unlocked"

//Unions provide a way to handle different types too
function getLength(obj: string | string []) {
    return obj.length;
}

//typeof
function wrappingArray(obj: string | string[]) {
    if (typeof obj === "string") {
      return [obj]
    }
    return obj;
  }

// function that can wrtie strings or numbers
function printId(id:number | string) {
    if (typeof id==="string") {
        console.log("Your id :" + id)
} else {
    console.log(id);
}
}
printId(101)
printId("101")


//4.2:- Generics: Generics provides a variable to types. For example, an array with generics can describe the values that the array contains
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>

//We can declare your own types that use generics
interface BackPack<Type> {
    add:(obj:Type) => void;
    get: () => Type;
}
declare const backpack:BackPack<string>
const object=backpack.get()
backpack.add("Hi")


/*5.Structural typing:-
                      ->One of TypeScript’s core principles is that type checking focuses on the shape that values have
                      ->In a structural type system, if two objects have the same shape, they are considered to be of the same type

*/

interface Point {
    x: number;
    y: number;
}
function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}
const point = { x: 12, y: 26 };
logPoint(point);

//Similarly for classes
class VirtualPoint {
    x:number;
    y:number;
    constructor(x:number,y:number) {
        this.x=x;
        this.y=y;
    }
}
const newPoint=new VirtualPoint(13,40)
logPoint(newPoint)


//6. any type; TypeScript also has a special type, any, that you can use whenever you don’t want a particular value to cause typechecking errors
let level;
function render(document:any) {
    console.log(document)
}


//7.Functions
//Parameter Type annotations
function greet(name:string) {
    console.log("Hi,"+name)
}
greet("Harry")

//Return Type Annotations
function getNumber(): number {
    return 26
}

//Functions Which Return Promises:-If we want to annotate the return type of a function which returns a promise then we should use the Promise type
async function getFavNumber(): Promise<number> {
    return 26
} 


//8.Anonymous Functions
const names=["Harry", "Ron", "Hermione"]
names.forEach(function (s) {
    console.log(s.toUpperCase())
})
//if we use arrow function bcz appplies also to contextual typing
names.forEach((s) => {
    console.log(s.toUpperCase())
})



//9.Object types
function printCoordinates(pt:{x:number, y:number}) {
    console.log("x is"+ pt.x)
    console.log("y is" +pt.y)
}
printCoordinates({x:3,y:5})

//optional properties(?)
function printName(obj:{firstName:string, lastName?:string}) {
    console.log(obj.firstName)
    console.log(obj.lastName)
    console.log(obj.firstName + " " + obj.lastName)
}
printName({firstName:"Harry"})
printName({firstName:"Ron", lastName:"Potter"})



//10.Type Alias
type newPoint= {
    x: number;
    y: number;
  };
  function printCo(pt:newPoint) {
    console.log("x is" + pt.x)
    console.log("y is " + pt.y)
} 
printCo({x:4,y:6})

//You can actually use a type alias to give a name to any type at all, not just an object type
type stringOrNumber= string | number;



//11.interfaces:An interface declaration is another way to name an object type
 
interface Point {
    x: number;
    y: number;
  }
function printCoord(pt: Point) {
    console.log("x is"+ pt.x);
    console.log("y is " + pt.y);
}
printCoord({ x: 100, y: 100 });

//Difference between Type Aliases and Interfaces
//Interfaces:- ->Extending an interface
               interface Animal {
                name:string;
               }
               interface Bear extends Animal {
                honey:boolean;
               }
               const bear: Bear=({name:"Henry", honey:true})
               bear.name
               bear.honey

            //->Adding new fields to an existing interface

//Type Aliases: -> Extending a type via intersections
type Animals = {
    name: string;
  }
  
  type Bears = Animal & { 
    honey: boolean;
  }
  
  const bear1:Bear=({name:"Henry", honey:true})
  bear1.name;
  bear1.honey;

                //->A type cannot be changed after being created



/*12.Type Assertions:-
                      ->TypeScript only allows type assertions which convert to a more specific or less specific version of a type
                      -> you can use two assertions, first to any or unknown, then to the desired type
*/
const x = "hello" as string;
const a = "expr" as any as string;


//13.Literal types

const ab:50=50
const abc:50 | 100= 100
let greeting:"hello"= "hello"
greeting="hello"

//numerical literals
function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
  }


/*14. null and Undefined: 
                         ->null=absent value and undefined=uninitiated value
*/
function doSomething(x: string | null) {
    if (x === null) {
      //.....
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
}

/*Non-null Assertion operator(!):-
                                   ->TypeScript also has a special syntax for removing null and undefined from a type without doing any explicit checking
                                   ->Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined
*/
function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed());
  }


//15.Enum

const enum Size {small=1, medium=2, large=3}
let mysize:Size=Size.medium
console.log(mysize)


//16.bigint: used for large integers
//created a bigint via bigint funtion
const number3:bigint= BigInt(100)
//created a bigint via literal syntax
const anotherNumber3:bigint=100n


//17.symbol(): primitive used to create  globally unique reference
const sym = Symbol();
let obj = {
  [sym]: "value",
};
console.log(obj[sym]);