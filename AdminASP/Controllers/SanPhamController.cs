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
    public class SanPhamController : Controller
    {
        public IActionResult GetAll()
        {
            SanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(SanPhamStoreContext)) as SanPhamStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<SanPham> thisModels = new List<SanPham>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as SanPham);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormSanPhamAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                SanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(SanPhamStoreContext)) as SanPhamStoreContext;
                int addResult = modelStoreContext.Add(new SanPham()
                {
                    IdSanPham = input.IdSanPham,
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = input.Ten,
                    Gia = input.Gia,
                    DiemTichLuy = input.DiemTichLuy,
                    Description = input.Description
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormSanPhamEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                SanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(SanPhamStoreContext)) as SanPhamStoreContext;
                SanPham oldSanPham = new SanPham()
                {
                    IdSanPham = input.IdSanPham,
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = null,
                    Gia = -1,
                    DiemTichLuy = -1,
                    Description = null
                };
                SanPham newSanPham = new SanPham()
                {
                    IdSanPham = input.IdSanPham,
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = input.Ten,
                    Gia = input.Gia,
                    DiemTichLuy = input.DiemTichLuy,
                    Description = input.Description
                };
                int editResult = modelStoreContext.Edit(oldSanPham, newSanPham);

                result = editResult;
                ViewData["newSanPham"] = newSanPham;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormSanPhamDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                SanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(SanPhamStoreContext)) as SanPhamStoreContext;
                SanPham taiKhoan = new SanPham()
                {
                    IdSanPham = input.IdSanPham,
                    IdLoaiSP = input.IdLoaiSP,
                    Ten = null,
                    Gia = -1,
                    DiemTichLuy = -1,
                    Description = null
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
            SanPhamStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(SanPhamStoreContext)) as SanPhamStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


