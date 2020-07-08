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
    public class CtkmController : Controller
    {
        public IActionResult GetAll()
        {
            CtkmStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CtkmStoreContext)) as CtkmStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<Ctkm> thisModels = new List<Ctkm>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as Ctkm);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormCtkmAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                CtkmStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CtkmStoreContext)) as CtkmStoreContext;
                int addResult = modelStoreContext.Add(new Ctkm()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
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

        public IActionResult Edit(FormCtkmEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                CtkmStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CtkmStoreContext)) as CtkmStoreContext;
                Ctkm oldCtkm = new Ctkm()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
                    IdSanPham = input.IdSanPham,
                    SoLuong = -1,
                    DonGia = -1,
                    DiemTichLuy = -1
                };
                Ctkm newCtkm = new Ctkm()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
                    IdSanPham = input.IdSanPham,
                    SoLuong = input.SoLuong,
                    DonGia = input.DonGia,
                    DiemTichLuy = input.DiemTichLuy
                };
                int editResult = modelStoreContext.Edit(oldCtkm, newCtkm);

                result = editResult;
                ViewData["newCtkm"] = newCtkm;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormCtkmDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                CtkmStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CtkmStoreContext)) as CtkmStoreContext;
                Ctkm taiKhoan = new Ctkm()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
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
            CtkmStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CtkmStoreContext)) as CtkmStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


