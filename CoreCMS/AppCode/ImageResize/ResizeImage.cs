using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.Primitives;

using System.Drawing;

using SixLabors.ImageSharp.PixelFormats;

using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Bmp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;


using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp.Helpers;

using SixLabors.ImageSharp.Drawing;
using SixLabors.ImageSharp.Drawing.Brushes;
using SixLabors.ImageSharp.Drawing.Pens;


namespace CoreCMS
{

    public class ImageResizingResult : Microsoft.AspNetCore.Mvc.IActionResult
    {
        
        public async Task ExecuteResultAsync(ActionContext context)
        {
            await context.HttpContext.Response.WriteAsync("hello world");
        }
        
    }

    public class ImageResizer
    {


        public static void fooo(string fileName, SaveFormat saveFormat)
        {
            //var imagePath = Microsoft.AspNetCore.Http.PathString.FromUriComponent("/" + url);
            //var fileInfo =  _fileProvider.GetFileInfo(imagePath);
            

            var fileInfo = new System.IO.FileInfo(fileName);
            //if (!fileInfo.Exists) { return NotFound(); }


            int width = 100;
            int height = 100;
            byte[] data = null;


            using (MemoryStream outputStream = new MemoryStream())
            {
                using (System.IO.Stream inputStream = fileInfo.OpenRead())
                {
                    using (Image<Rgba32> image = Image.Load(inputStream))
                    {
                        image.Mutate(
                          delegate (IImageProcessingContext<Rgba32> mutant)
                          {
                              mutant.Resize(image.Width / 2, image.Height / 2);
                          }
                        );

                        IImageEncoder enc = null;

                        if (saveFormat == SaveFormat.Jpg)
                            enc = new SixLabors.ImageSharp.Formats.Jpeg.JpegEncoder();
                        else if (saveFormat == SaveFormat.Png)
                            enc = new SixLabors.ImageSharp.Formats.Png.PngEncoder();
                        else if (saveFormat == SaveFormat.Png)
                            enc = new SixLabors.ImageSharp.Formats.Gif.GifEncoder();
                        else if (saveFormat == SaveFormat.Bmp)
                            enc = new SixLabors.ImageSharp.Formats.Bmp.BmpEncoder();

                        image.Save(outputStream, enc);
                    } // End Using image

                    data = outputStream.ToArray();
                } // End Using inputStream 
            } // End Using outputStream 

        } // End Sub fooo


        public enum SaveFormat
        {
            Jpg,Png,GIF, Bmp

        }


        public static byte[] ResizeImage(string fileName, SaveFormat saveFormat)
        {
            byte[] data = null;


            using (MemoryStream outputStream = new MemoryStream())
            {
                using (Image<Rgba32> image = Image.Load(fileName))
                {
                    image.Mutate(
                        delegate (IImageProcessingContext<Rgba32> mutant)
                        {
                            mutant.Resize(image.Width / 22, image.Height / 22);
                        }
                    );

                    IImageEncoder enc = null;

                    if (saveFormat == SaveFormat.Jpg)
                        enc = new SixLabors.ImageSharp.Formats.Jpeg.JpegEncoder();
                    else if (saveFormat == SaveFormat.Png)
                        enc = new SixLabors.ImageSharp.Formats.Png.PngEncoder();
                    else if (saveFormat == SaveFormat.GIF)
                        enc = new SixLabors.ImageSharp.Formats.Gif.GifEncoder();
                    else if (saveFormat == SaveFormat.Bmp)
                        enc = new SixLabors.ImageSharp.Formats.Bmp.BmpEncoder();

                    image.Save(@"D:\myfileformat." + saveFormat.ToString().ToLowerInvariant(), enc);

                    image.SaveAsJpeg(outputStream);
                } // End Using image 

                data = outputStream.ToArray();
            } // End Using outputStream 


            System.IO.File.WriteAllBytes(@"d:\myfile.jpg", data);

            return data;
        } // End Sub ResizeImage 


        private static void foo()
        {
            // Image.Load(string path) is a shortcut for our default type. 
            // Other pixel formats use Image.Load<TPixel>(string path))
            using (Image<Rgba32> image = Image.Load("foo.jpg"))
            {
                image.Mutate(x => x
                     .Resize(image.Width / 2, image.Height / 2)
                     .Grayscale());

                image.Save("bar.jpg"); // automatic encoder selected based on extension.
            } // End Using image 

        } // End Sub 


    } // End Class 


} // End Namespace 
