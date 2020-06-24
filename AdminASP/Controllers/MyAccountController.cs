using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AdminASP.Controllers
{
    public class MyAccountController : Controller
    {
        public IActionResult Index() 
        {
            return this.SeeInfo();
        }

        public IActionResult SeeInfo() 
        {
            return View();
        }

        public IActionResult ChangeInfo() 
        {
            return View();
        }
    }
}