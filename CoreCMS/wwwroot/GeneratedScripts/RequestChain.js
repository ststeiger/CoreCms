var Http;
(function (Http) {
    var RequestChain = (function () {
        function RequestChain() {
            this.Requests = [];
            this.m_OnComplete = [];
            this.internalComplete.bind(this);
            this.add.bind(this);
            this.addRange.bind(this);
            this.whenDone.bind(this);
            this.process.bind(this);
        }
        RequestChain.prototype.internalComplete = function () {
            var allComplete = true;
            for (var i = 0; i < this.Requests.length; ++i) {
                if (!this.Requests[i].complete) {
                    allComplete = false;
                    break;
                }
            }
            if (allComplete) {
                for (var i = 0; i < this.m_OnComplete.length; ++i) {
                    this.m_OnComplete[i]();
                }
            }
            return this;
        };
        RequestChain.prototype.add = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var me = this;
            for (var i = 0; i < args.length; ++i) {
                args[i].always(function () {
                    me.internalComplete();
                }.bind(this));
                this.Requests.push(args[i]);
            }
            return this;
        };
        RequestChain.prototype.addRange = function (req) {
            var me = this;
            for (var i = 0; i < req.length; ++i) {
                req[i].always(function () {
                    me.internalComplete();
                }.bind(this));
                this.Requests.push(req[i]);
            }
            return this;
        };
        RequestChain.prototype.whenDone = function (cb) {
            this.m_OnComplete.push(cb);
            return this;
        };
        RequestChain.prototype.process = function () {
            for (var i = 0; i < this.Requests.length; ++i) {
                this.Requests[i].send();
            }
            return this;
        };
        return RequestChain;
    }());
    Http.RequestChain = RequestChain;
})(Http || (Http = {}));
