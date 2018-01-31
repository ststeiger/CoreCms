
/// <reference path="AsyncAjax.ts"/>
// https://stackoverflow.com/questions/12930049/how-do-i-import-other-typescript-files
// https://stackoverflow.com/questions/37263357/how-to-declare-and-import-typescript-interfaces-in-a-separate-file

namespace Http 
{


    export class RequestChain
    {
        private Requests: RequestBase[];
        private m_OnComplete: (() => any)[];

        constructor()
        {
            this.Requests = [];
            this.m_OnComplete = [];

            this.internalComplete.bind(this);
            this.add.bind(this);
            this.addRange.bind(this);
            this.whenDone.bind(this);
            this.process.bind(this);
        }


        private internalComplete(): RequestChain
        {
            let allComplete: boolean = true;

            for (let i: number = 0; i < this.Requests.length; ++i)
            {
                if (!this.Requests[i].complete)
                {
                    allComplete = false;
                    break;
                }
            }

            if (allComplete)
            {
                // console.log("all complete");
                for (let i: number = 0; i < this.m_OnComplete.length; ++i)
                {
                    this.m_OnComplete[i]();
                }
            }

            return this;
        } // End Function internalComplete


        public add(...args): RequestChain
        {
            let me = this;

            for (let i = 0; i < args.length; ++i)
            {
                args[i].always(
                    function ()
                    {
                        me.internalComplete();
                    }.bind(this)
                );

                this.Requests.push(args[i])
            } // Next i

            return this;
        }


        public addRange(req: RequestBase[]): RequestChain
        {
            let me = this;

            for (let i = 0; i < req.length; ++i)
            {
                req[i].always(
                    function ()
                    {
                        me.internalComplete();
                    }.bind(this)
                );

                this.Requests.push(req[i])
            } // Next i

            return this;
        }


        public whenDone(cb: () => any): RequestChain
        {
            this.m_OnComplete.push(cb);
            return this;
        }


        public process(): RequestChain
        {
            for (let i: number = 0; i < this.Requests.length; ++i)
            {
                this.Requests[i].send();
            }

            return this;
        }


    } // End Class RequestChain


} // End namespace Http 
