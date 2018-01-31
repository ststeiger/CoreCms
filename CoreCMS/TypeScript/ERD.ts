
export class Square
{
    public x:number;
    public y:number;

    public size:number;
    
    constructor(px:number, py:number, psize:number)
    {
        this.x = px;
        this.y = py;
        this.size=psize;
        this.foo.bind(this);
        
    }


    public get top():number
    {
        return this.x;
    }

    
    
    

    public foo():void
    {
        
    }
    
}