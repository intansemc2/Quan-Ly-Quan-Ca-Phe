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
    public class BanController : Controller
    {
        public String GetAll()
        {
            BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<Ban> outputs = new List<Ban>();
            foreach (BaseModel baseModel in baseModels)
            {
                outputs.Add(baseModel as Ban);
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public IActionResult Add(FormBanAddInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
                int addResult = modelStoreContext.Add(new Ban() { 
                    IdBan = input.IdBan,Ten = input.Ten,TrangThai = input.TrangThai
                });

                result = addResult;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;
            return View();
        }

        public IActionResult Edit(FormBanEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
                Ban oldBan = new Ban()
                {
                    IdBan = input.IdBan,Ten = null,TrangThai = -1
                };
                Ban newBan = new Ban()
                {
                    IdBan = input.IdBan,Ten = input.Ten,TrangThai = input.TrangThai
                };
                int editResult = modelStoreContext.Edit(oldBan, newBan);

                result = editResult;
                ViewData["newBan"] = newBan;
            }
            ViewData["input"] = result;
            ViewData["errors"] = resultValidate;             
            return View();
        }

        public IActionResult Delete(FormBanDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
                Ban taiKhoan = new Ban()
                {
                    IdBan = input.IdBan,Ten = null,TrangThai = -1
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
            BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            ViewData["input"] = result;
            return View();
        }
    }
}


