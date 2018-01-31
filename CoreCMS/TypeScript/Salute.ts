

export module MySalute 
{
    
    export function foo()
    {
        console.log("foo");
    }


    export class Greeter
    {
        greeting: string;
        constructor(message: string)
        {
            this.greeting = message;
        }
        greet()
        {
            return "Hello, " + this.greeting;
        }
    }


}
