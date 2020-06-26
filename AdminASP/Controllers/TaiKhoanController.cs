using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AdminASP.Models;
using System.Security.Cryptography;
using AdminASP.Helpers;
using Newtonsoft.Json;

namespace AdminASP.Controllers
{
    public class TaiKhoanController : Controller
    {
        public IActionResult GetAll()
        {
            TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            List<BaseModel> baseModels = taiKhoanStoreContext.GetAll();
            List<TaiKhoan> taiKhoans = new List<TaiKhoan>();
            foreach (BaseModel baseModel in baseModels)
            {
                taiKhoans.Add(baseModel as TaiKhoan);
            }
            ViewData["inputs"] = taiKhoans;
            return View();
        }
    }
}
