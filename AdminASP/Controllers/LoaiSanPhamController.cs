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
    public class LoaiSanPhamController : Controller
    {
        public IActionResult GetAll()
        {
            LoaiSanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(LoaiSanPhamStoreContext)) as LoaiSanPhamStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<LoaiSanPham> thisModels = new List<LoaiSanPham>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as LoaiSanPham);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormLoaiSanPhamAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                LoaiSanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(LoaiSanPhamStoreContext)) as LoaiSanPhamStoreContext;
                int addResult = modelStoreContext.Add(new LoaiSanPham()
                {
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = input.Ten
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormLoaiSanPhamEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                LoaiSanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(LoaiSanPhamStoreContext)) as LoaiSanPhamStoreContext;
                LoaiSanPham oldLoaiSanPham = new LoaiSanPham()
                {
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = null
                };
                LoaiSanPham newLoaiSanPham = new LoaiSanPham()
                {
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = input.Ten
                };
                int editResult = modelStoreContext.Edit(oldLoaiSanPham, newLoaiSanPham);

                result = editResult;
                ViewData["newLoaiSanPham"] = newLoaiSanPham;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormLoaiSanPhamDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                LoaiSanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(LoaiSanPhamStoreContext)) as LoaiSanPhamStoreContext;
                LoaiSanPham taiKhoan = new LoaiSanPham()
                {
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = null
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
            LoaiSanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(LoaiSanPhamStoreContext)) as LoaiSanPhamStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


