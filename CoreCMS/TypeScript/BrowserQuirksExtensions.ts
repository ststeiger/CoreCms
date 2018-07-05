
interface Window
{
    CustomEvent: any;
    attachEvent: any;
    getStackTrace: any;
    AudioContext: any;
    webkitAudioContext: any;
}

interface Document
{
    attachEvent: any;
    attachCustomEvent: any;
}

interface Response
{
    useFinalURL: any;
}

interface ErrorConstructor
{
    // captureStackTrace: any;
}

interface EventTarget
{
    value: any;
}

interface HTMLScriptElement
{
    onreadystatechange: any;
}

interface HTMLElement
{
    attachEvent: any;
    detachEvent: any;
}

interface Event
{
    clientX: any;
    clientY: any;
}

interface CustomEvent
{
    pageX: number;
    pageY: number;
}
