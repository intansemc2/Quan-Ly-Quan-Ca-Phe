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
    public class KhachHangController : Controller
    {
        public IActionResult GetAll()
        {
            KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<KhachHang> thisModels = new List<KhachHang>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as KhachHang);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormKhachHangAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
                int addResult = modelStoreContext.Add(new KhachHang()
                {
                    IdKhachHang = input.IdKhachHang,
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    Username = input.Username,
                    DiemTichLuy = input.DiemTichLuy
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormKhachHangEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
                KhachHang oldKhachHang = new KhachHang()
                {
                    IdKhachHang = input.IdKhachHang,
                    Ten = null,
                    Sdt = null,
                    Username = null,
                    DiemTichLuy = -1
                };
                KhachHang newKhachHang = new KhachHang()
                {
                    IdKhachHang = input.IdKhachHang,
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    Username = input.Username,
                    DiemTichLuy = input.DiemTichLuy
                };
                int editResult = modelStoreContext.Edit(oldKhachHang, newKhachHang);

                result = editResult;
                ViewData["newKhachHang"] = newKhachHang;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormKhachHangDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
                KhachHang taiKhoan = new KhachHang()
                {
                    IdKhachHang = input.IdKhachHang,
                    Ten = null,
                    Sdt = null,
                    Username = null,
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
            KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


