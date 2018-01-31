var Table = (function () {
    function Table(columns, data) {
        this.item.bind(this);
        this.rows = data;
        this.columns = columns;
        this.m_length = this.rows.length;
        this.m_columnMap = {};
        for (var i = 0; i < this.m_length; ++i) {
            this.m_columnMap[this.columns[i]] = i;
        }
    }
    Table.prototype.getIndex = function (name) {
        return this.m_columnMap[name];
    };
    Table.prototype.item = function (row, item) {
        return (this.rows[row][this.getIndex(item)]);
    };
    Object.defineProperty(Table.prototype, "columnCount", {
        get: function () {
            return this.m_length;
        },
        enumerable: true,
        configurable: true
    });
    return Table;
}());
export { Table };
var tab = new Table(["col1", "col2"], [[1, 2], [3, 4]]);
tab.columns = ["col1", "col2", "col3"];
tab.item(0, "col1");
var aaa = tab.item(0, "abc");
var x = tab.rows[0][1];
console.log(x);
