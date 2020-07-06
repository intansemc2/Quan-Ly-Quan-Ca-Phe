﻿
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
            TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<TaiKhoan> thisModels = new List<TaiKhoan>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as TaiKhoan);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormTaiKhoanAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                int addResult = modelStoreContext.Add(new TaiKhoan()
                {
                    Username = input.Username,
                    Password = input.Password,
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
                TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                TaiKhoan oldTaiKhoan = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = null,
                    Type = -1
                };
                TaiKhoan newTaiKhoan = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = input.Password,
                    Type = input.Type
                };
                int editResult = modelStoreContext.Edit(oldTaiKhoan, newTaiKhoan);

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
                TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                TaiKhoan taiKhoan = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = null,
                    Type = -1
                };
                int deleteResult = modelStoreContext.Delete(taiKhoan);

                result = deleteResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult DeleteAll()
        {
            int result = 0;
            TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


