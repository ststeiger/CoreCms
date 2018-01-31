export var MySalute;
(function (MySalute) {
    function foo() {
        console.log("foo");
    }
    MySalute.foo = foo;
    var Greeter = (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        return Greeter;
    }());
    MySalute.Greeter = Greeter;
})(MySalute || (MySalute = {}));
