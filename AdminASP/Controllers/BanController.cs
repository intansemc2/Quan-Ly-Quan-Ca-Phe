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

        public String Add(FormBanAddInput input)
        {
            int result = 0;

            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
                int addResult = modelStoreContext.Add(new Ban() { 
                   Ten = input.Ten
                });

                result = addResult;
            }
            return JsonConvert.SerializeObject(new { output = result, errors = resultValidate });
        }

        public String Edit(FormBanEditInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
                Ban oldBan = new Ban()
                {
                    IdBan = input.IdBan,Ten = null
                };
                Ban newBan = new Ban()
                {
                    IdBan = input.IdBan,Ten = input.Ten
                };
                int editResult = modelStoreContext.Edit(oldBan, newBan);

                result = editResult;
                ViewData["newBan"] = newBan;
            }
            return JsonConvert.SerializeObject(new { output = result, errors = resultValidate });
        }

        public String Delete(FormBanDeleteInput input)
        {
            int result = 0;
            List<String> resultValidate = input.GetValidate();
            if (resultValidate.Count <= 0)
            {
                BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
                Ban taiKhoan = new Ban()
                {
                    IdBan = input.IdBan,Ten = null
                };
                int deleteResult = modelStoreContext.Delete(taiKhoan);

                result = deleteResult;
            }
            return JsonConvert.SerializeObject(new { output = result, errors = resultValidate });
        }

        public String DeleteAll()
        {
            int result = 0;
            BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            result = deleteResult;
            return JsonConvert.SerializeObject(new { output = result});
        }
    }
}


