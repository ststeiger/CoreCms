
// https://stackoverflow.com/questions/11955298/use-sudo-with-password-as-parameter
// let setScriptSudo:string = "sudo chmod +s myscript";


export class Table
{
    public rows: Array<any[]>;
    private m_length:number;
    public columns: string[];
    private m_columnMap: { [columnName: string]: number; };
    
    
    constructor(columns: string[], data: Array<any[]>)
    {
        this.item.bind(this);
        this.rows = data;
        this.columns = columns;
        this.m_length = this.rows.length;
        this.m_columnMap = {};
        
        for (let i = 0; i < this.m_length; ++i)
        {
            this.m_columnMap[this.columns[i]] = i;
        }
    }
    
    public getIndex(name:string):number
    {
        return this.m_columnMap[name];
    }
    
    public item<T>(row:number, item: string)
    {
        return <T>(this.rows[row][this.getIndex(item)]);
    }
    
    public get columnCount(): number
    {
        return this.m_length;
    }
    
}


let tab = new Table(["col1","col2"], [[1,2], [3,4]]);
tab.columns=["col1","col2", "col3"];

tab.item(0, "col1");
let aaa:number = tab.item<number>(0,"abc");
let x = tab.rows[0][1];
console.log(x);



// http://fiyazhasan.me/npm-bower-nuget-gulp-the-four-horsemen-of-asp-net-core-apps/
// https://github.com/Microsoft/TypeScript/issues/17332
// https://github.com/Microsoft/TypeScript/issues/5134
