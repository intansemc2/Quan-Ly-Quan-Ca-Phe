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

        public IActionResult Add(FormTaiKhoanAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                int addResult = taiKhoanStoreContext.Add(new TaiKhoan() { 
                    Username = input.Username,
                    Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                    Type = input.Type
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormTaiKhoanEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                TaiKhoan oldTaiKhoan = new TaiKhoan()
                {
                    Username = input.OldUsername,
                    Password = null,
                    Type = -1
                };
                TaiKhoan newTaiKhoan = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                    Type = input.Type
                };
                int editResult = taiKhoanStoreContext.Edit(oldTaiKhoan, newTaiKhoan);

                result = editResult;
                ViewData["newTaiKhoan"] = newTaiKhoan;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;             
            return View();
        }

        public IActionResult Delete(FormTaiKhoanDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                TaiKhoan taiKhoan = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = null,
                    Type = -1
                };
                int deleteResult = taiKhoanStoreContext.Delete(taiKhoan);

                result = deleteResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult DeleteAll()
        {
            int result = 0;
            TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            int deleteResult = taiKhoanStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}
