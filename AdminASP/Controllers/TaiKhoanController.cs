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
    public class TaiKhoanController : Controller
    {
        public String GetAll()
        {
            if (!(CheckPermission.CheckStaff(this))) { return ""; }

            TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<TaiKhoan> outputs = new List<TaiKhoan>();
            foreach (BaseModel baseModel in baseModels)
            {
                outputs.Add(baseModel as TaiKhoan);
            }
            return JsonConvert.SerializeObject(outputs);
        }

        public String Add(FormTaiKhoanAddInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            TaiKhoan newTaiKhoan = null;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                newTaiKhoan  = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                    Type = input.Type
                };
                int addResult = modelStoreContext.Add(newTaiKhoan);

                output = addResult;
                newTaiKhoan.IdTaiKhoan = -1;
                newTaiKhoan = modelStoreContext.Find(newTaiKhoan)[0] as TaiKhoan;

            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors, newTaiKhoan = newTaiKhoan });
        }

        public String Edit(FormTaiKhoanEditInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                TaiKhoan oldTaiKhoan = new TaiKhoan()
                {
                    IdTaiKhoan = input.OldIdTaiKhoan
                };
                TaiKhoan newTaiKhoan = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = input.Password,
                    Type = input.Type
                };
                int editResult = modelStoreContext.Edit(oldTaiKhoan, newTaiKhoan);

                output = editResult;
                ViewData["newTaiKhoan"] = newTaiKhoan;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String Delete(FormTaiKhoanDeleteInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                TaiKhoan taiKhoan = new TaiKhoan()
                {
                    IdTaiKhoan = Convert.ToInt32(input.IdTaiKhoan)
                };
                int deleteResult = modelStoreContext.Delete(taiKhoan);

                output = deleteResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String DeleteMarked(FormTaiKhoanDeleteMarked deleteInput)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            List<String> inputs = JsonConvert.DeserializeObject<List<String>>(deleteInput.JsonInput);

            List<String> outputs = new List<String>();
            if (inputs.Count > 0)
            {
                TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                foreach (String input in inputs)
                {
                    TaiKhoan taiKhoan = new TaiKhoan()
                    {
                        IdTaiKhoan = Convert.ToInt32(input)
                    };
                    int deleteResult = modelStoreContext.Delete(taiKhoan);
                    outputs.Add(JsonConvert.SerializeObject(new { IdTaiKhoan = input, Result = deleteResult }));
                }
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String DeleteAll()
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            output = deleteResult;

            return JsonConvert.SerializeObject(new { output = output });
        }

        public String GetLoais()
        {
            return JsonConvert.SerializeObject(TaiKhoan.GetTypes());
        }
    }
}


