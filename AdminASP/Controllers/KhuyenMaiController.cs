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
    public class KhuyenMaiController : Controller
    {
        public IActionResult GetAll()
        {
            KhuyenMaiStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhuyenMaiStoreContext)) as KhuyenMaiStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<KhuyenMai> thisModels = new List<KhuyenMai>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as KhuyenMai);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormKhuyenMaiAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                KhuyenMaiStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhuyenMaiStoreContext)) as KhuyenMaiStoreContext;
                int addResult = modelStoreContext.Add(new KhuyenMai()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
                    Ten = input.Ten,
                    ThoiGIanDienRa = input.ThoiGIanDienRa,
                    ThoiGIanKetThuc = input.ThoiGIanKetThuc
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormKhuyenMaiEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                KhuyenMaiStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhuyenMaiStoreContext)) as KhuyenMaiStoreContext;
                KhuyenMai oldKhuyenMai = new KhuyenMai()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
                    Ten = null,
                    ThoiGIanDienRa = null,
                    ThoiGIanKetThuc = null
                };
                KhuyenMai newKhuyenMai = new KhuyenMai()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
                    Ten = input.Ten,
                    ThoiGIanDienRa = input.ThoiGIanDienRa,
                    ThoiGIanKetThuc = input.ThoiGIanKetThuc
                };
                int editResult = modelStoreContext.Edit(oldKhuyenMai, newKhuyenMai);

                result = editResult;
                ViewData["newKhuyenMai"] = newKhuyenMai;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormKhuyenMaiDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                KhuyenMaiStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhuyenMaiStoreContext)) as KhuyenMaiStoreContext;
                KhuyenMai taiKhoan = new KhuyenMai()
                {
                    IdKhuyenMai = input.IdKhuyenMai,
                    Ten = null,
                    ThoiGIanDienRa = null,
                    ThoiGIanKetThuc = null
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
            KhuyenMaiStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhuyenMaiStoreContext)) as KhuyenMaiStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


