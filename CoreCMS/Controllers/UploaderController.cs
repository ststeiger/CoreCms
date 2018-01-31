
// Copyright © 2017 Dmitry Sikorsky. All rights reserved.
// Licensed under the Apache License, Version 2.0. 
// See License.txt in the project root for license information.

using System.Linq;
// using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;


namespace CoreCMS.Controllers
{
    
    
    public class UploaderController : Controller
    {
        private IHostingEnvironment hostingEnvironment;
        public static int s_progress { get; set; }
        
        
        public UploaderController(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }
        
        
        public ActionResult Upload()
        {
            return this.View();
        }
        
        
        [HttpPost]
        public async System.Threading.Tasks.Task<IActionResult> Index(
            System.Collections.Generic.IList<IFormFile> files)
        {
            UploaderController.s_progress = 0;
            long totalBytes = files.Sum(f => f.Length);
            
            foreach (IFormFile source in files)
            {
                string filename = ContentDispositionHeaderValue
                    .Parse(source.ContentDisposition).FileName.Value.Trim('"');
                
                filename = this.EnsureCorrectFilename(filename);
                
                byte[] buffer = new byte[16 * 1024];
                
                using (System.IO.FileStream output = System.IO.File.Create(
                    this.GetPathAndFilename(filename)
                ))
                {
                    using (System.IO.Stream input = source.OpenReadStream())
                    {
                        long totalReadBytes = 0;
                        int readBytes;
                        
                        while ((readBytes = input.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            await output.WriteAsync(buffer, 0, readBytes);
                            totalReadBytes += readBytes;
                            UploaderController.s_progress = (int) ((float) totalReadBytes 
                                                                   / (float) totalBytes * 100.0);
                            
                            // It is only to make the process slower
                            await System.Threading.Tasks.Task.Delay(10);
                        } // Whend 
                        
                    } // End Using input 
                    
                } // End Using output 
                
            } // Next source 
            
            return this.Content("success");
        }
        
        
        [HttpPost]
        public ActionResult Progress()
        {
            return this.Content(UploaderController.s_progress.ToString());
        }
        
        
        private string EnsureCorrectFilename(string filename)
        {
            int pos = filename.LastIndexOf("\\");
            if (pos != -1)
                filename = filename.Substring(pos + 1);
            
            return filename;
        }
        
        
        private string GetPathAndFilename(string filename)
        {
            string path = System.IO.Path.Combine(this.hostingEnvironment.WebRootPath, "uploads");
            
            if (!System.IO.Directory.Exists(path))
                System.IO.Directory.CreateDirectory(path);
            
            return System.IO.Path.Combine(path, filename);
        }
        
        
    } // End Class UploadController 
    
    
} // End Using 
