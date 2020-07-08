using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AdminASP.Controllers
{
    public class InfoController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Thongtinungdung", "Info");
        }

        public IActionResult Thongtinungdung()
        {
            return View();
        }

        public IActionResult Huongdansudung()
        {
            return View();
        }

        public IActionResult Thanhvienthamgia()
        {
            return View();
        }
    }
}
