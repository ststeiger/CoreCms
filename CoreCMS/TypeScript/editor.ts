

// window.getSelection()
let x: Node = document.getSelection().getRangeAt(0).startContainer;
let pe:HTMLElement = window.getSelection().getRangeAt(0).startContainer.parentElement;

// HTMLElements inherit from Element which inherit from Node.
// HTMLElement refers explicitly to an HTML element whereas Element may refer to an XML element.
// However, HTMLElement is technically a subset of Element.

