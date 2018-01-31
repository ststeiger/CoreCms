
// Copyright © 2017 Dmitry Sikorsky. All rights reserved. 
// Licensed under the Apache License, Version 2.0. 
// See License.txt in the project root for license information. 

// let intervalId;
// https://christopher5106.github.io/web/2015/12/13/HTML5-file-image-upload-and-resizing-javascript-with-progress-bar.html
// https://www.html5rocks.com/en/tutorials/file/xhr2/#disqus_thread

async function uploadFiles(inputId)
{
    console.log("change", this); //, arguments);
    
    let input:HTMLInputElement = <HTMLInputElement>document.getElementById(inputId);
    let files:FileList = input.files;
    let formData:FormData = new FormData();

    for (let i = 0; i != files.length; i++)
    {
        formData.append("files", files[i]);
    }
    
    // startUpdatingProgressIndicator();
    
    // let data = await new Http.Post("/uploader", formData).sendAsync();
    // stopUpdatingProgressIndicator();
    // alert("Files Uploaded!");
    
    let bar: HTMLElement = document.getElementById("bar");
    let label: HTMLElement = document.getElementById("label");


    new Http.Post("/uploader", formData)
        .progress(function (event)
        {
            // console.log(this.fileName);
            // console.log(decodeURIComponent(event.target.fileName));
            let percent = Math.floor(event.loaded / event.total * 100);
            console.log("aaa", 'Uploading: ' + percent + '%');
            
            bar.style.width = percent + "%";
            label.innerHTML = "";
            label.appendChild(
                document.createTextNode(percent + "%")
            );
        })
        .success(function (data)
        {
            console.log("success", data);
            // stopUpdatingProgressIndicator();
            alert("Files Uploaded!");
        }).send();
    //.sendAsync();
    document.getElementById("progress").style.display = "block";
    
    /*
    $.ajax(
        {
            url: "/uploader",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data)
            {
                stopUpdatingProgressIndicator();
                alert("Files Uploaded!");
            }
        }
    );
    */
}

/*
function startUpdatingProgressIndicator()
{
    console.log("startUpdatingProgressIndicator");

    document.getElementById("progress").style.display="block";
    
    var bar = document.getElementById("bar");
    var label = document.getElementById("label");
    
    intervalId = setInterval(
        async function()
        {
            console.log("executing");
            
            var progress = await new Http.Post("/uploader/progress").sendAsync();
            console.log("awaited", progress, typeof (progress));
            bar.style.width = progress + "%";
            label.innerHTML = "";
            label.appendChild(
                document.createTextNode(progress + "%")
            );
            
            // We use the POST requests here to avoid caching problems (we could use the GET requests and disable the cache instead)
            //$.post(
            //    "/uploader/progress",
            //    function (progress)
            //    {
            //        console.log("awaited", progress, typeof (progress));
            //        $("#bar").css({width: progress + "%"});
            //        $("#label").html(progress + "%");
            //    }
            //);
            
        },
        20
    );
    console.log("seti", intervalId);
}

function stopUpdatingProgressIndicator()
{
    console.log("lcear", intervalId);
    clearInterval(intervalId);
}
*/
