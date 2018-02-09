
namespace  JQuery.Replacement 
{
    
    
    /*
    $('.feed').on('click', '.feed-item', function (event)
    {
        // Do something
    })
    */
    
    
    // https://stackoverflow.com/questions/15112067/how-does-jquery-on-work
    // https://elliotekj.com/2016/11/05/jquery-to-pure-js-event-listeners-on-dynamically-created-elements/
    function on(  staticParent: string | HTMLElement
                , eventName:string
                , dynamicChildSelector:string
                , fn)
    {
        let parent:HTMLElement =<HTMLElement> staticParent;
        if (typeof(staticParent) === 'string')
            parent = document.querySelector(<string>staticParent);
        
        let eligibleChildren = parent.querySelectorAll("dynamicChildSelector");
        
        // jQuery().off( eventName );
        parent.addEventListener(eventName,
            function (event)
            {
                // if (e.target.tagName.toLowerCase() === 'span')
                // if (event.target.classList.contains(dynamicChildSelector))
                // fn(event);
                // https://stackoverflow.com/questions/4706236/how-to-pass-all-arguments-as-collection-to-another-function-and-not-as-single-ar
                // fn.apply(this, arguments);
                
                for (let i = 0; i < eligibleChildren.length; ++i)
                {
                    if (event.target === eligibleChildren[i])
                    {
                        return fn.apply(this, arguments);
                    }

                }

                return null;
            }
        );

    }
    
    
}