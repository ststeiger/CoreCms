"use strict";
var VT;
(function (VT) {
    var VanillaTreeWithoutAjax = (function () {
        function VanillaTreeWithoutAjax(s, options) {
            this.autoBind(this);
            this.container = (typeof s === 'string' || s instanceof String) ?
                document.querySelector(s) : s;
            this.tree = this.container.appendChild(this.create('ul', {
                className: 'vtree'
            }));
            this.placeholder = options && options.placeholder;
            this._placeholder();
            this.leafs = {};
            this.tree.addEventListener('click', function (evt) {
                if (evt.target.classList.contains("vtree-leaf-label")) {
                    this.select(evt.target.parentNode.getAttribute('data-vtree-id'));
                }
                else if (evt.target.classList.contains("vtree-toggle")) {
                    this.toggle(evt.target.parentNode.getAttribute('data-vtree-id'));
                }
            }.bind(this));
            if (options && options.contextmenu) {
                this.tree.addEventListener('contextmenu', function (evt) {
                    var menu, contextMenus = this.tree.querySelectorAll('.vtree-contextmenu');
                    [].forEach.call(contextMenus, function (contextMenu) {
                        contextMenu.parentElement.removeChild(contextMenu);
                    });
                    if (evt.target.classList.contains("vtree-leaf-label")) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        menu = this.create('menu', {
                            className: 'vtree-contextmenu'
                        });
                        var rect = evt.target.getBoundingClientRect();
                        this.setProperties(menu.style, {
                            top: (evt.target.offsetTop + rect.height)
                                .toString() + "px",
                            left: evt.target.offsetLeft
                                .toString() + "px",
                            display: 'block'
                        });
                        options.contextmenu.forEach(function (item) {
                            menu.appendChild(this.create('li', {
                                className: 'vtree-contextmenu-item',
                                innerHTML: item.label
                            }))
                                .addEventListener('click', item.action.bind(item, evt.target.parentElement.getAttribute('data-vtree-id')));
                        }.bind(this));
                        evt.target.parentElement.appendChild(menu);
                    }
                }.bind(this));
                document.addEventListener('click', function (evt) {
                    var contextMenus = this.tree.querySelectorAll('.vtree-contextmenu');
                    [].forEach.call(contextMenus, function (menu) {
                        menu.parentElement.removeChild(menu);
                    });
                }.bind(this));
            }
        }
        VanillaTreeWithoutAjax.prototype.autoBind = function (self) {
            for (var _i = 0, _a = Object.getOwnPropertyNames(self.constructor.prototype); _i < _a.length; _i++) {
                var key = _a[_i];
                var val = self[key];
                if (key !== 'constructor' && typeof val === 'function') {
                    self[key] = val.bind(self);
                }
            }
            return self;
        };
        VanillaTreeWithoutAjax.prototype.setProperties = function (obj, props) {
            if (props) {
                for (var i = 0, keys = Object.keys(props); i < keys.length; i++) {
                    obj[keys[i]] = props[keys[i]];
                }
            }
            return obj;
        };
        VanillaTreeWithoutAjax.prototype.create = function (tagName, props) {
            return this.setProperties(document.createElement(tagName), props);
        };
        VanillaTreeWithoutAjax.prototype._dispatch = function (name, id) {
            var event;
            try {
                event = new CustomEvent('vtree-' + name, {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        id: id
                    }
                });
            }
            catch (e) {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent('vtree-' + name, true, true, { id: id });
            }
            (this.getLeaf(id, true) || this.tree)
                .dispatchEvent(event);
            return this;
        };
        VanillaTreeWithoutAjax.prototype._placeholder = function () {
            var p;
            if (!this.tree.children.length && this.placeholder) {
                this.tree.innerHTML = '<li class="vtree-placeholder">' + this.placeholder + '</li>';
            }
            else if (p = this.tree.querySelector('.vtree-placeholder')) {
                this.tree.removeChild(p);
            }
            return this;
        };
        VanillaTreeWithoutAjax.prototype.getLeaf = function (id, notThrow) {
            var leaf = this.tree.querySelector('[data-vtree-id="' + id + '"]');
            if (!notThrow && !leaf)
                throw Error('No VanillaTreeWithoutAjax leaf with id "' + id + '"');
            return leaf;
        };
        VanillaTreeWithoutAjax.prototype.getChildList = function (id) {
            var list, parent;
            if (id) {
                parent = this.getLeaf(id);
                if (!(list = parent.querySelector('ul'))) {
                    list = parent.appendChild(this.create('ul', {
                        className: 'vtree-subtree'
                    }));
                }
            }
            else {
                list = this.tree;
            }
            return list;
        };
        VanillaTreeWithoutAjax.prototype.add = function (options) {
            var id, leaf = this.create('li', {
                className: 'vtree-leaf'
            }), parentList = this.getChildList(options.parent);
            leaf.setAttribute('data-vtree-id', id = options.id || Math.random().toString());
            leaf.appendChild(this.create('span', {
                className: 'vtree-toggle'
            }));
            leaf.appendChild(this.create('a', {
                className: 'vtree-leaf-label',
                innerHTML: options.label
            }));
            parentList.appendChild(leaf);
            if (parentList !== this.tree) {
                parentList.parentElement.classList.add('vtree-has-children');
            }
            this.leafs[id] = options;
            if (!options.opened) {
                this.close(id);
            }
            if (options.selected) {
                this.select(id);
            }
            return this._placeholder()._dispatch('add', id);
        };
        VanillaTreeWithoutAjax.prototype.move = function (id, parentId) {
            var leaf = this.getLeaf(id), oldParent = leaf.parentElement, newParent = this.getLeaf(parentId, true);
            if (newParent) {
                newParent.classList.add('vtree-has-children');
            }
            this.getChildList(parentId).appendChild(leaf);
            oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);
            return this._dispatch('move', id);
        };
        VanillaTreeWithoutAjax.prototype.remove = function (id) {
            var leaf = this.getLeaf(id), oldParent = leaf.parentElement;
            oldParent.removeChild(leaf);
            oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);
            return this._placeholder()._dispatch('remove', id);
        };
        VanillaTreeWithoutAjax.prototype.open = function (id) {
            this.getLeaf(id).classList.remove('closed');
            this.add({
                id: "123",
                label: 'ABC',
                parent: null
            });
            return this._dispatch('open', id);
        };
        VanillaTreeWithoutAjax.prototype.close = function (id) {
            this.getLeaf(id).classList.add('closed');
            return this._dispatch('close', id);
        };
        VanillaTreeWithoutAjax.prototype.toggle = function (id) {
            return this[this.getLeaf(id).classList.contains('closed') ? 'open' : 'close'](id);
        };
        VanillaTreeWithoutAjax.prototype.select = function (id) {
            var selectedLeafs, leaf = this.getLeaf(id);
            if (!leaf.classList.contains('vtree-selected')) {
                selectedLeafs = this.tree.querySelectorAll('li.vtree-leaf');
                [].forEach.call(selectedLeafs, function (selectedLeaf) {
                    selectedLeaf.classList.remove('vtree-selected');
                });
                leaf.classList.add('vtree-selected');
                this._dispatch('select', id);
            }
            return this;
        };
        return VanillaTreeWithoutAjax;
    }());
    VT.VanillaTreeWithoutAjax = VanillaTreeWithoutAjax;
})(VT || (VT = {}));
