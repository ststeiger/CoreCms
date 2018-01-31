
// import {autoBind as binder} from './autoBind';
// import autoBind from './autoBind'



// export namespace foo
namespace Http1
{
    

    export abstract class RequestBase
    {
        public complete: boolean;
        public contentType: string;
        public method: string;
        
        protected m_SuccessCallbacks: ((r) => any)[];
        protected m_CancelCallbacks: ((req: XMLHttpRequest) => any)[];
        protected m_NetworkFailureCallbacks: ((req: XMLHttpRequest) => any)[];
        protected m_FailureCallbacks: ((req: XMLHttpRequest) => any)[];
        protected m_CompleteCallbacks: ((req: XMLHttpRequest) => any)[];

        protected m_ProgressCallbacks: ((e: ProgressEvent) => any)[];
        protected m_ResultHook: ((a: any) => any)[];


        public url: string;
        //callbackName?: string,
        public timeout?: number;

        public queryData?: string | object;
        public postData?: string | object;
        public cache?: boolean;

        public user?: string;
        public password?: string;

/*
        private autoBind(self: any)
        {
            for (const key of Object.getOwnPropertyNames(self.constructor.prototype))
            {
                const val = self[key];

                if (key !== 'constructor' && typeof val === 'function')
                {
                    // console.log(key);
                    self[key] = val.bind(self);
                }
            } // Next key 

            return self;
        } // End Function autoBind
*/
        public constructor()
        {
            // binder.autoBind(this);
            // console.log("bindaq", binder);
            
            
            this.complete = false;
            
            this.m_SuccessCallbacks = [];
            this.m_CancelCallbacks = [];
            this.m_NetworkFailureCallbacks = [];
            this.m_FailureCallbacks = [];
            this.m_CompleteCallbacks = [];
            this.m_ProgressCallbacks = [];
            this.m_ResultHook = [];
        }
        
        
        protected successCallback(): void
        {
            // console.log("successCallback");
            this.complete = true;

            for (let i: number = 0; i < this.m_SuccessCallbacks.length; ++i)
            {
                this.m_SuccessCallbacks[i].apply(this, arguments);
            }
        }


        protected static failureDefault(r): void
        {
            console.log("failure");
            console.log(r);
            let msg: string = "Error " + r.status + " (" + r.statusText + "): \n\n";
            msg += "URL: \n" + r.responseURL + "\n\n";
            msg += r.responseText;
            alert(msg);
        }


        protected failureCallback(...args: any[]): void
        {
            this.complete = true;

            if (this.m_FailureCallbacks.length === 0)
                RequestBase.failureDefault.apply(this, arguments);
            // this.failureDefault.apply(this, arguments);

            for (let i: number = 0; i < this.m_FailureCallbacks.length; ++i)
            {
                this.m_FailureCallbacks[i].apply(this, arguments);
            }
        }


        protected cancelCallback(): void
        {
            this.complete = true;

            for (let i: number = 0; i < this.m_CancelCallbacks.length; ++i)
            {
                this.m_CancelCallbacks[i].apply(this, arguments);
            }
        }


        protected networkFailureCallback(...args: any[]): void
        {
            this.complete = true;

            if (this.m_NetworkFailureCallbacks.length === 0)
                this.failureCallback.apply(this, arguments);

            for (let i: number = 0; i < this.m_NetworkFailureCallbacks.length; ++i)
            {
                this.m_NetworkFailureCallbacks[i].apply(this, arguments);
            }
        }


        protected alwaysCallback(...args: any[]): void
        {
            this.complete = true;

            for (let i: number = 0; i < this.m_CompleteCallbacks.length; ++i)
            {
                this.m_CompleteCallbacks[i].apply(this, arguments);
            }
        }


        protected resultHookCallback(a: any): any
        {
            for (let i: number = 0; i < this.m_ResultHook.length; ++i)
            {
                a = this.m_ResultHook[i].apply(this, arguments);
            }

            return a;
        }


        protected progressCallback(): void
        {
            this.complete = true;

            for (let i: number = 0; i < this.m_ProgressCallbacks.length; ++i)
            {
                this.m_ProgressCallbacks[i].apply(this, arguments);
            }
        }


        public success(cb: (r: any) => any): RequestBase
        {
            if (cb != null)
                this.m_SuccessCallbacks.push(cb);
            else
                Error("Success-callback is NULL or UNDEFINED.");

            return this;
        }

        public cancel(cb: (req: XMLHttpRequest) => any): RequestBase
        {
            if (cb != null)
                this.m_CancelCallbacks.push(cb);
            else
                Error("Cancel-callback is NULL or UNDEFINED.");

            return this;
        }

        public networkFailure(cb: (req: XMLHttpRequest) => any): RequestBase
        {
            if (cb != null)
                this.m_NetworkFailureCallbacks.push(cb);
            else
                Error("Network-failure-callback is NULL or UNDEFINED.");

            return this;
        }


        public failure(cb: (req: XMLHttpRequest) => any): RequestBase
        {
            if (cb != null)
                this.m_FailureCallbacks.push(cb);
            else
                Error("Failure-callback is NULL or UNDEFINED.");

            return this;
        }


        public always(cb: (req: XMLHttpRequest) => any): RequestBase
        {
            if (cb != null)
                this.m_CompleteCallbacks.push(cb);
            else
                Error("Always-callback is NULL or UNDEFINED.");

            return this;
        }


        public progress(cb: (e: ProgressEvent) => any): RequestBase
        {
            if (cb != null)
                this.m_ProgressCallbacks.push(cb);
            else
                Error("Failure-callback is NULL or UNDEFINED.");

            return this;
        }


        public resultHook(fn: (a:any) => any): RequestBase
        {
            if (fn != null)
                this.m_ResultHook.push(fn);
            else
                Error("Result-hook-callback is NULL or UNDEFINED.");

            return this;
        }


        public send(data?: any & object): RequestBase
        {
            let url = this.url
                , postData: string | FormData = null;

            if (this.method == null)
                this.method = "GET";

            if (this.contentType == null)
                this.contentType = 'application/urlencode';

            if (this.cache == null || this.cache == false)
            {
                url += ((this.url.indexOf('?') === -1) ? "?" : "&") + "no_cache=" + (new Date()).getTime();
            }

            if (this.queryData != null)
            {
                if (!(typeof this.queryData == 'string' || this.queryData instanceof String))
                {
                    let query = [];
                    for (let i = 0, keys = Object.keys(this.queryData); i < keys.length; i++)
                    {
                        query.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(this.queryData[keys[i]]));
                    }

                    url += ((this.url.indexOf('?') === -1) ? "?" : "&") + query.join('&');
                }
                else
                {
                    let qs: string = <string>this.queryData;
                    if (qs.substr(0, 1) === "?" || qs.substr(0, 1) === "&")
                    {
                        qs = qs.substr(1);
                    }

                    url += ((this.url.indexOf('?') === -1) ? "?" : "&") + qs;
                }

            } // End if (options.queryData != null)

            if (this.postData != null)
            {
                if (this.method != null && this.method.toLowerCase() !== "post")
                {
                    Error("Can't have postData when method is not POST.");
                }

                if (this.method == null)
                {
                    this.method = "POST";
                }

                if (this.contentType == null)
                    this.contentType = 'application/x-www-form-urlencoded';


                if (this.contentType.indexOf("application/json") != -1)
                {
                    if (!(typeof this.postData == 'string' || this.postData instanceof String))
                        postData = JSON.stringify(postData);
                    else
                        postData = <string>this.postData;
                }
                else
                {

                    if (this.postData instanceof FormData)
                    {
                        //options.contentType = "multipart/form-data";
                        this.contentType = null;
                        postData = <FormData>this.postData;
                    }
                    else if (!(typeof this.postData == 'string' || this.postData instanceof String))
                    {
                        let query = [];
                        for (let i = 0, keys = Object.keys(this.postData); i < keys.length; i++)
                        {
                            query.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(this.postData[keys[i]]));
                        }
                        postData = query.join('&');
                    }
                    else
                        postData = <string>this.postData;
                }

            } // End if (options.postData != null) 

            let req: XMLHttpRequest = new XMLHttpRequest();


            // console.log(req.upload);
            if (req.upload && req.upload.addEventListener)
            {
                req.upload.addEventListener('progress', this.progressCallback, false);
                // req.upload.addEventListener('loadstart', function () { console.log("ls", new Date().toLocaleTimeString()); }, false);
                // req.upload.addEventListener('loadend', function () { console.log("le", new Date().toLocaleTimeString()); }, false);
                // req.upload.addEventListener('timeout', function () { console.log("to"); }, false);
            }

            if (req.onprogress)
                req.onprogress = this.progressCallback.bind(this);

            // for get
            //req.onprogress = function (e: ProgressEvent)
            //{
            //    if (e.lengthComputable)
            //    {
            //        console.log("ld", e.loaded + " / " + e.total)
            //    }
            //}

            //req.onload = function (e:Event)
            //{
            //    console.log('upload complete');
            //    //console.log(arguments);
            //};

            if (req == null)
            {
                this.failureCallback(req, "Browser doesn't support XmlHttpRequest...");
                return;
            } // End if (req == null)

            let that = this;

            // var online = navigator.onLine;
            // Being online only entails that you are connected to a network, 
            // not the availability nor reachability of the services you are trying to connect to.

            // onerror fires when there is a failure on the network level.
            // If the error only exists on the application level, e.g., an HTTP error code is sent,
            // then onload still fires.
            // You need to test the returned status code explicitly in your onreadystatechange handler.
            req.onerror = function (this: XMLHttpRequestEventTarget, ev: ErrorEvent): any
            {
                console.log("req.onerror:", this, ev);

                that.networkFailureCallback(req, "There was an unexpected network error.\nSee the console log.\nError Details:\n" + ev);
                that.alwaysCallback(req, "There was an unexpected network error.\nSee the console log.\nError Details:\n" + ev);
                return false;
            }.bind(this);

            if (this.user != null && this.password != null)
                req.open(this.method, url, true, this.user, this.password);
            else
                req.open(this.method, url, true);

            // req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
            if (this.cache !== true)
                req.setRequestHeader('cache-control', 'no-cache');

            if (this.contentType != null)
                req.setRequestHeader('Content-type', this.contentType);


            req.onreadystatechange = function ()
            {
                if (req.readyState != 4) return;

                if (!(req.status != 200 && req.status != 304 && req.status != 0))
                {

                    if (this.contentType != null && this.contentType.toLowerCase().indexOf("application/json") !== -1)
                    {
                        let obj = null, jsonParseSuccessful = false;

                        try
                        {
                            obj = JSON.parse(req.responseText);
                            jsonParseSuccessful = true;
                        }
                        catch (e)
                        {
                            console.log(e.name);
                            console.log(e.message);
                            console.log(e.stack);
                            console.log(e);
                            console.log(req);
                            console.log(req.responseText);
                            this.failureCallback(req);
                        } // End Catch

                        if (jsonParseSuccessful)
                        {
                            if (obj.error == null)
                            {
                                this.successCallback(obj.data);
                            }
                            else
                            {
                                // console.log('JSON-parsing successful - but result indicates "server error": ', JSON.stringify(obj.error, null, 2));
                                this.failureCallback(req, obj.error);
                            }

                        } // End if (jsonParseSuccessful)

                    } // End if (contentType.toLowerCase().indexOf("application/json") !== -1) 
                    else
                    {
                        let response = req.responseText;
                        let noResponseProcessingError = false;

                        try
                        {
                            response = this.resultHookCallback(response);
                            noResponseProcessingError = true;
                        }
                        catch (e)
                        {
                            console.log('Result pre-processing error:\r\n', e);
                            this.failureCallback(req);
                        }

                        if (noResponseProcessingError)
                            this.successCallback(response);
                    }

                } // End if (!(req.status != 200 && req.status != 304 && req.status != 0)) 

                if (req.status != 200 && req.status != 304 && req.status != 0)
                {
                    this.failureCallback(req);
                    console.log("aaa");
                }

                if (req.status === 304 || req.status === 0)
                {
                    this.cancelCallback(req);
                }

                this.alwaysCallback(req);
            }.bind(this); // End req.onreadystatechange =  function() 

            if (req.readyState == 4) return;

            req.send(postData);

            return this;
        } // End Function send 


        public sendAsync(): Promise<any>
        {
            return new Promise(
                function (resolve, reject)
                {
                    this.success(function (result: any)
                    {
                        // console.log("onSuccess:", arguments);
                        resolve(result);
                    });

                    this.failure(function (xhr: XMLHttpRequest)
                    {
                        // console.log("onSuccess:", arguments);
                        console.log("onError", arguments);
                        reject(arguments);
                    });

                    this.cancel(function (xhr: XMLHttpRequest)
                    {
                        console.log("onCancel", arguments);
                        reject(arguments);
                    });

                    // this.always(function (xhr: XMLHttpRequest){ });

                    this.send();
                }.bind(this)
            );
        } // End Function sendAsync 


    }


    export class Get extends RequestBase
    {

        constructor(url: string, data?: string | object, success?: any)
        {
            super();

            if (success != null)
                this.success(success);

            this.method = "GET";
            this.url = url;
            this.queryData = data;
        }

    } // End export class Get


    export class Post extends RequestBase
    {

        constructor(url: string, data?: string | object | FormData, success?: any)
        {
            super();

            if (success != null)
                this.success(success);

            this.method = "POST";
            this.url = url;
            this.contentType = "application/x-www-form-urlencoded";
            this.postData = data;
        }

    } // End export class Post


    export class PostEval extends RequestBase
    {

        constructor(url: string, data?: string | object, success?: any)
        {
            super();
            
            this.method = "POST";
            this.url = url;
            this.contentType = "application/x-www-form-urlencoded";
            this.postData = data;
            
            if (success != null)
                this.success(success);
            
            this.resultHook(
                function (data)
                {
                    return eval('(' + data + ')');
                }.bind(this)
            );
            
        }

    } // End export class PostEval
    
    
    export class PostJSON extends RequestBase
    {

        constructor(url: string, data?: string | object, success?: any)
        {
            super();

            this.method = "POST";
            this.contentType = "application/x-www-form-urlencoded";
            this.url = url;
            this.postData = data;

            if (success != null)
                this.success(success);

            this.resultHook(
                function (data)
                {
                    // console.log("PostJSON.resultHook", data);
                    return JSON.parse(data);
                }.bind(this)
            );

        }
        
    } // End export class PostJSON


    export class Json extends RequestBase
    {

        constructor(url: string, data?: string | object, success?: any)
        {
            super();

            if (success != null)
                this.success(success);


            this.method = "POST";
            this.contentType = "application/json; charset=UTF-8";
            this.url = url;
            this.postData = data;

            if (success != null)
                this.success(success);

            this.resultHook(
                function (data)
                {
                    // console.log("PostJSON.resultHook", data);
                    return JSON.parse(data);
                }.bind(this)
            );
        }

    } // End Class Json


    export class JSONP extends RequestBase
    {

        constructor(url:string, data:any, success: any)
        {
            super();
            this.send.bind(this);
            this.sendAsync.bind(this);


            this.url = url;
            this.queryData = data;

            if (success != null)
                this.success(success);
        }
        
        
        public send()
        {
            
            function uuid(): string
            {
                function s4(): string
                {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
            
            // this.Complete = false;
            let id: string = uuid();
            let url:string = this.url;
            let callback_name:string = "callback";
            let timeout:number = 10;

            if (url.indexOf('?') === -1)
                url += "?callback={@callback}";
            else
                url += "&callback={@callback}";

            // replace first occurence of callback only...
            url = url.replace("{@callback}", encodeURIComponent(callback_name));

            if (this.queryData != null)
            {
                if (!(typeof this.queryData == 'string' || this.queryData instanceof String))
                {
                    let query = [];
                    for (let i = 0, keys = Object.keys(this.queryData); i < keys.length; i++)
                    {
                        query.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(this.queryData[keys[i]]));
                    }

                    url += "&" + query.join('&');
                }
                else
                {
                    let qs: string = <string>this.queryData;
                    if (qs.substr(0, 1) === "?" || qs.substr(0, 1) === "&")
                    {
                        qs = qs.substr(1);
                    }

                    url += "&" + qs;
                }

            } // End if (this.queryData != null)

            
            function removeElement(id: string)
            {
                let el = document.getElementById(id);
                if (el != null)
                    el.parentElement.removeChild(el);
            }


            let timeout_trigger: number = window.setTimeout(function ()
            {
                window[callback_name] = function () { };
                console.log("JSONP: script.ontimeout", arguments);

                this.cancelCallback(arguments);
                this.alwaysCallback(arguments);
                removeElement(id);
            }.bind(this), timeout * 1000);

            window[callback_name] = function (data)
            {
                window.clearTimeout(timeout_trigger);
                this.successCallback(data);
                this.alwaysCallback(data);
                removeElement(id);
            }.bind(this);

            let script: HTMLScriptElement = document.createElement('script');
            script.id = id;
            script.type = 'application/javascript';
            script.async = true;
            script.src = url;
            script.onerror = function (that: HTMLElement, ev: ErrorEvent)
            {
                window.clearTimeout(timeout_trigger);
                console.log("JSONP: script.onerror", arguments);
                this.failureCallback(arguments);
                this.alwaysCallback(arguments);
                removeElement(id);
            }.bind(this);
            
            document.getElementsByTagName('head')[0].appendChild(script);
            return this;
        }


        public sendAsync(): Promise<any>
        {
            return new Promise(
                function (resolve, reject)
                {
                    
                    this.success(function (result: any)
                    {
                        // console.log("onSuccess:", arguments);
                        resolve(result);
                    });
                    
                    this.failure(
                        function ()
                        {
                            console.log("onError", arguments);
                            reject(arguments);
                        }
                    );
                    
                    this.cancel(function ()
                    {
                        console.log("onCancel", arguments);
                        reject(arguments);
                    });

                    this.send();
                }.bind(this)
            );
        } // End Function sendAsync
        
        
    } // End export class JSONP  
    
    
}
