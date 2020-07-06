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
    public class HoaDonController : Controller
    {
        public IActionResult GetAll()
        {
            HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<HoaDon> thisModels = new List<HoaDon>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as HoaDon);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormHoaDonAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
                int addResult = modelStoreContext.Add(new HoaDon()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdKhachHang = input.IdKhachHang,
                    IdBan = input.IdBan,
                    IdNhanVien = input.IdNhanVien,
                    ThoiGIan = input.ThoiGIan,
                    PhanTramTichLuy = input.PhanTramTichLuy,
                    SoLuongDiemDoi = input.SoLuongDiemDoi,
                    TyGiaDiemDoi = input.TyGiaDiemDoi
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormHoaDonEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
                HoaDon oldHoaDon = new HoaDon()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdKhachHang = -1,
                    IdBan = -1,
                    IdNhanVien = -1,
                    ThoiGIan = null,
                    PhanTramTichLuy = -1,
                    SoLuongDiemDoi = -1,
                    TyGiaDiemDoi = -1
                };
                HoaDon newHoaDon = new HoaDon()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdKhachHang = input.IdKhachHang,
                    IdBan = input.IdBan,
                    IdNhanVien = input.IdNhanVien,
                    ThoiGIan = input.ThoiGIan,
                    PhanTramTichLuy = input.PhanTramTichLuy,
                    SoLuongDiemDoi = input.SoLuongDiemDoi,
                    TyGiaDiemDoi = input.TyGiaDiemDoi
                };
                int editResult = modelStoreContext.Edit(oldHoaDon, newHoaDon);

                result = editResult;
                ViewData["newHoaDon"] = newHoaDon;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormHoaDonDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
                HoaDon taiKhoan = new HoaDon()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdKhachHang = -1,
                    IdBan = -1,
                    IdNhanVien = -1,
                    ThoiGIan = null,
                    PhanTramTichLuy = -1,
                    SoLuongDiemDoi = -1,
                    TyGiaDiemDoi = -1
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
            HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


