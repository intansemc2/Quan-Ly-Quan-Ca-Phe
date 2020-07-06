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
    public class DatBanController : Controller
    {
        public IActionResult GetAll()
        {
            DatBanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(DatBanStoreContext)) as DatBanStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<DatBan> thisModels = new List<DatBan>();
            foreach (BaseModel baseModel in baseModels)
            {
                thisModels.Add(baseModel as DatBan);
            }
            ViewData["inputs"] = thisModels;
            return View();
        }

        public IActionResult Add(FormDatBanAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                DatBanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(DatBanStoreContext)) as DatBanStoreContext;
                int addResult = modelStoreContext.Add(new DatBan()
                {
                    Username = input.Username,
                    IdBan = input.IdBan,
                    ThoiGIanLap = input.ThoiGIanLap,
                    ThoiGIanNhan = input.ThoiGIanNhan,
                    GhiChu = input.GhiChu
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormDatBanEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                DatBanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(DatBanStoreContext)) as DatBanStoreContext;
                DatBan oldDatBan = new DatBan()
                {
                    Username = input.Username,
                    IdBan = input.IdBan,
                    ThoiGIanLap = input.ThoiGIanLap,
                    ThoiGIanNhan = null,
                    GhiChu = null
                };
                DatBan newDatBan = new DatBan()
                {
                    Username = input.Username,
                    IdBan = input.IdBan,
                    ThoiGIanLap = input.ThoiGIanLap,
                    ThoiGIanNhan = input.ThoiGIanNhan,
                    GhiChu = input.GhiChu
                };
                int editResult = modelStoreContext.Edit(oldDatBan, newDatBan);

                result = editResult;
                ViewData["newDatBan"] = newDatBan;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Delete(FormDatBanDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                DatBanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(DatBanStoreContext)) as DatBanStoreContext;
                DatBan taiKhoan = new DatBan()
                {
                    Username = input.Username,
                    IdBan = input.IdBan,
                    ThoiGIanLap = input.ThoiGIanLap,
                    ThoiGIanNhan = null,
                    GhiChu = null
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
            DatBanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(DatBanStoreContext)) as DatBanStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


