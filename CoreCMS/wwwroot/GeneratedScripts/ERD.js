var Square = (function () {
    function Square(px, py, psize) {
        this.x = px;
        this.y = py;
        this.size = psize;
        this.foo.bind(this);
    }
    Object.defineProperty(Square.prototype, "top", {
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    Square.prototype.foo = function () {
    };
    return Square;
}());
export { Square };
