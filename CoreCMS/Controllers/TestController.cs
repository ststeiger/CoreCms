
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreCMS.Models;






namespace CoreCMS.Controllers
{


    public class BlogPost
    {
        public string Id;
        public string Text;
        
        private string m_value;
        public string Value
        {
            get { return this.m_value; }
            set { this.m_value = value; }
        }

    }


    public class TestController : Controller
    {
        public IActionResult Index()
        {
            // @model IEnumerable<StackExplorer.Models.Post>
            
            System.Collections.Generic.List<BlogPost> ls = new List<BlogPost>();
            ls.Add(new BlogPost()
            {
                Id ="123"
                ,Text ="456"
                ,Value = "789"  
            });
            
            
            ls.Add(new BlogPost()
            {
                Id ="ABV"
                ,Text ="DEF"
                ,Value = "GHI"  
            });
            
            
            
            return View(ls);
        }


    }


}
