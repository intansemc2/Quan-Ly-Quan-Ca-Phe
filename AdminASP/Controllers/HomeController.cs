using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AdminASP.Models;

namespace AdminASP.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            BanStoreContext banStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
            ViewData["Bans"] = banStoreContext.GetAll();
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
