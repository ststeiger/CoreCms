
"use strict";

// https://stackoverflow.com/questions/14486241/how-can-i-export-the-schema-of-a-database-in-postgresql
namespace VT
{


    interface IOptions
    {
        id: string,
        parent: string, // id
        label: string,
        opened: boolean,

        selected(id: string)

        placeholder: string,
        contextmenu: IContextMenuEntry[]
    }


    interface IContextMenuEntry
    {
        label: string,
        action(id: string)
    }


    export class VanillaTreeWithoutAjax
    {
        private container: HTMLElement;
        private tree: HTMLUListElement;
        private placeholder: string;
        private leafs: { [id: string]: IOptions; };

        // https://ponyfoo.com/articles/binding-methods-to-class-instance-objects
        // https://github.com/sindresorhus/auto-bind/blob/master/index.js
        private autoBind(self: VanillaTreeWithoutAjax)
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


        constructor(s: string | HTMLElement, options: IOptions)
        {
            this.autoBind(this);

            this.container = (typeof s === 'string' || s instanceof String) ?
                <HTMLElement>document.querySelector(<string>s) : <HTMLElement>s;

            this.tree = this.container.appendChild(<HTMLUListElement>this.create('ul', {
                className: 'vtree'
            }));

            this.placeholder = options && options.placeholder;
            this._placeholder();
            this.leafs = {};
            this.tree.addEventListener('click', function (evt)
            {
                if (evt.target.classList.contains("vtree-leaf-label"))
                {
                    this.select(evt.target.parentNode.getAttribute('data-vtree-id'));
                }
                else if (evt.target.classList.contains("vtree-toggle"))
                {
                    this.toggle(evt.target.parentNode.getAttribute('data-vtree-id'));
                }
            }.bind(this));

            if (options && options.contextmenu)
            {
                this.tree.addEventListener('contextmenu', function (evt: MouseEvent)
                {
                    let menu: HTMLElement
                        , contextMenus: NodeListOf<Element> = this.tree.querySelectorAll('.vtree-contextmenu');
                    
                    [].forEach.call(contextMenus, function (contextMenu: Element)
                    {
                        contextMenu.parentElement.removeChild(contextMenu);
                    });
                    
                    if ((<HTMLElement>evt.target).classList.contains("vtree-leaf-label"))
                    {
                        evt.preventDefault();
                        evt.stopPropagation();

                        menu = this.create('menu', {
                            className: 'vtree-contextmenu'
                        });
                        
                        let rect: ClientRect = (<Element>evt.target).getBoundingClientRect();
                        
                        this.setProperties(menu.style, {
                            // top: evt.offsetY,
                            // left: evt.offsetX + 18,
                            // top: rect.top + rect.height,
                            // left: rect.left,
                            
                            // important: measurement "absolute" is relative to the 
                            // nearest position-relative or position-absolute element 
                            // not relative to window.x0 window.y0
                            top: ((<HTMLElement>evt.target).offsetTop + rect.height)
                                .toString() + "px", // important, otherwise bs 
                            left: (<HTMLElement>evt.target).offsetLeft
                                .toString() + "px", // important, otherwise bs
                            display: 'block'
                        });


                        options.contextmenu.forEach(function (item: IContextMenuEntry)
                        {
                            menu.appendChild(
                                this.create('li', {
                                    className: 'vtree-contextmenu-item',
                                    innerHTML: item.label
                                })
                            )
                                .addEventListener('click'
                                    , item.action.bind(
                                        item
                                        , (<HTMLElement>evt.target).parentElement.getAttribute('data-vtree-id')
                                    )
                                );
                        }.bind(this));

                        (<HTMLElement>evt.target).parentElement.appendChild(menu);
                    }
                }.bind(this));

                document.addEventListener('click', function (evt)
                {
                    let contextMenus: NodeListOf<Element> = this.tree.querySelectorAll('.vtree-contextmenu');

                    [].forEach.call(contextMenus, function (menu: Element)
                    {
                        menu.parentElement.removeChild(menu);
                    });

                }.bind(this));

            } // End if (options && options.contextmenu) 

        } // End Constructor


        private setProperties(obj: HTMLElement
            , props: object & { [propertyName: string]: string }): HTMLElement
        {
            if (props)
            {
                for (let i = 0, keys = Object.keys(props); i < keys.length; i++)
                {
                    obj[keys[i]] = props[keys[i]];
                }
            }

            return obj;
        } // End Function setProperties


        public create(tagName: string, props: { [propertyName: string]: string }): HTMLElement
        {
            return this.setProperties(document.createElement(tagName), props);
        } // End Function create 


        private _dispatch(name: string, id: string): VanillaTreeWithoutAjax
        {
            let event: CustomEvent;

            try
            {
                event = new CustomEvent('vtree-' + name, {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        id: id
                    }
                });
            } catch (e)
            {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent('vtree-' + name, true, true, {id: id});
            }

            (this.getLeaf(id, true) || this.tree)
                .dispatchEvent(event);

            return this;
        } // End Function _dispatch 


        private _placeholder(): VanillaTreeWithoutAjax
        {
            let p: Element;
            if (!this.tree.children.length && this.placeholder)
            {
                this.tree.innerHTML = '<li class="vtree-placeholder">' + this.placeholder + '</li>'
            }
            else if (p = this.tree.querySelector('.vtree-placeholder'))
            {
                this.tree.removeChild(p);
            }

            return this;
        } // End Function _placeholder 


        // notThrow: optional...
        public getLeaf(id: string, notThrow?: boolean): Element
        {
            let leaf: Element = this.tree.querySelector('[data-vtree-id="' + id + '"]');

            if (!notThrow && !leaf)
                throw Error('No VanillaTreeWithoutAjax leaf with id "' + id + '"');

            return leaf;
        } // End Function getLeaf 


        public getChildList(id: string): HTMLUListElement
        {
            let list: HTMLUListElement, parent: Element;

            if (id)
            {
                parent = this.getLeaf(id);

                if (!(list = parent.querySelector('ul')))
                {
                    list = parent.appendChild(<HTMLUListElement>this.create('ul', {
                        className: 'vtree-subtree'
                    }));
                }
            }
            else
            {
                list = this.tree;
            }

            return list;
        } // End Function getChildList 


        public add(options: IOptions): VanillaTreeWithoutAjax
        {
            let id: string,
                leaf: HTMLLIElement = <HTMLLIElement>this.create('li', {
                    className: 'vtree-leaf'
                }),
                parentList: HTMLUListElement = this.getChildList(options.parent);

            leaf.setAttribute('data-vtree-id', id = options.id || Math.random().toString());

            leaf.appendChild(this.create('span', {
                className: 'vtree-toggle'
            }));

            leaf.appendChild(this.create('a', {
                className: 'vtree-leaf-label',
                innerHTML: options.label
            }));

            parentList.appendChild(leaf);

            if (parentList !== this.tree)
            {
                parentList.parentElement.classList.add('vtree-has-children');
            }

            this.leafs[id] = options;

            if (!options.opened)
            {
                this.close(id);
            }

            if (options.selected)
            {
                this.select(id);
            }

            return this._placeholder()._dispatch('add', id);
        } // End Function add


        public move(id: string, parentId: string): VanillaTreeWithoutAjax
        {
            let leaf: Element = this.getLeaf(id),
                oldParent: HTMLElement = leaf.parentElement,
                newParent: Element = this.getLeaf(parentId, true);

            if (newParent)
            {
                newParent.classList.add('vtree-has-children');
            }

            this.getChildList(parentId).appendChild(leaf);
            oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);

            return this._dispatch('move', id);
        } // End Function move 


        public remove(id: string): VanillaTreeWithoutAjax
        {
            let leaf: Element = this.getLeaf(id),
                oldParent: HTMLElement = leaf.parentElement;

            oldParent.removeChild(leaf);
            oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);

            return this._placeholder()._dispatch('remove', id);
        } // End Function remove
        
        
        public open(id: string): VanillaTreeWithoutAjax
        {
            this.getLeaf(id).classList.remove('closed');
            
            
            
            this.add(<IOptions>{
                id: "123",
                label: 'ABC',
                parent: null
            });
            
            return this._dispatch('open', id);
        } // End Function open
        
        public close(id: string): VanillaTreeWithoutAjax
        {
            this.getLeaf(id).classList.add('closed');
            return this._dispatch('close', id);
        } // End Function close 

        public toggle(id: string): VanillaTreeWithoutAjax
        {
            return this[this.getLeaf(id).classList.contains('closed') ? 'open' : 'close'](id);
        } // End Function toggle 

        public select(id: string): VanillaTreeWithoutAjax
        {
            let selectedLeafs: NodeListOf<Element>
                , leaf: Element = this.getLeaf(id);

            if (!leaf.classList.contains('vtree-selected'))
            {
                selectedLeafs = this.tree.querySelectorAll('li.vtree-leaf');

                [].forEach.call(selectedLeafs, function (selectedLeaf: Element)
                {
                    selectedLeaf.classList.remove('vtree-selected');
                });

                leaf.classList.add('vtree-selected');
                this._dispatch('select', id);
            } // End if (!leaf.classList.contains('vtree-selected'))

            return this;
        } // End Function select


    } // End Class 


} // End Namespace 
