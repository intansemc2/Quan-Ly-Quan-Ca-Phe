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
    public class CthdController : Controller
    {
        public IActionResult GetAll()
        {
            CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<Cthd> thisModels = new List<Cthd>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as Cthd);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormCthdAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
                int addResult = modelStoreContext.Add(new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                    SoLuong = input.SoLuong,
                    DonGia = input.DonGia,
                    DiemTichLuy = input.DiemTichLuy
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormCthdEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
                Cthd oldCthd = new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                    SoLuong = -1,
                    DonGia = -1,
                    DiemTichLuy = -1
                };
                Cthd newCthd = new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                    SoLuong = input.SoLuong,
                    DonGia = input.DonGia,
                    DiemTichLuy = input.DiemTichLuy
                };
                int editResult = modelStoreContext.Edit(oldCthd, newCthd);

                result = editResult;
                ViewData["newCthd"] = newCthd;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormCthdDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
                Cthd taiKhoan = new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                    SoLuong = -1,
                    DonGia = -1,
                    DiemTichLuy = -1
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
            CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


