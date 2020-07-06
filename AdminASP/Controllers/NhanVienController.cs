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
    public class NhanVienController : Controller
    {
        public IActionResult GetAll()
        {
            NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<NhanVien> thisModels = new List<NhanVien>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as NhanVien);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormNhanVienAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
                int addResult = modelStoreContext.Add(new NhanVien()
                {
                    IdNhanVien = input.IdNhanVien,
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    Loai = input.Loai,
                    Username = input.Username
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormNhanVienEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
                NhanVien oldNhanVien = new NhanVien()
                {
                    IdNhanVien = input.IdNhanVien,
                    Ten = null,
                    Sdt = null,
                    Loai = -1,
                    Username = null
                };
                NhanVien newNhanVien = new NhanVien()
                {
                    IdNhanVien = input.IdNhanVien,
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    Loai = input.Loai,
                    Username = input.Username
                };
                int editResult = modelStoreContext.Edit(oldNhanVien, newNhanVien);

                result = editResult;
                ViewData["newNhanVien"] = newNhanVien;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormNhanVienDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
                NhanVien taiKhoan = new NhanVien()
                {
                    IdNhanVien = input.IdNhanVien,
                    Ten = null,
                    Sdt = null,
                    Loai = -1,
                    Username = null
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
            NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


