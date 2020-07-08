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
        public String GetAll()
        {
            KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<KhachHang> outputs = new List<KhachHang>();
            foreach (BaseModel baseModel in baseModels)
            {
                outputs.Add(baseModel as KhachHang);
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String Add(FormKhachHangAddInput input)
        {
            int output = 0;
            KhachHang newKhachHang = null;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
                newKhachHang = new KhachHang()
                {
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    IdTaiKhoan = input.IdTaiKhoan,
                    DiemTichLuy = input.DiemTichLuy
                };
                int addResult = modelStoreContext.Add(newKhachHang);

                output = addResult;
                newKhachHang.IdKhachHang = -1;
                newKhachHang = modelStoreContext.Find(newKhachHang)[0] as KhachHang;
            }
            return JsonConvert.SerializeObject(new { output = output, errors = errors, newKhachHang = newKhachHang });
        }

        public String Edit(FormKhachHangEditInput input)
        {
            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
                KhachHang oldKhachHang = new KhachHang()
                {
                    IdKhachHang = input.OldIdKhachHang
                };
                KhachHang newKhachHang = new KhachHang()
                {
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    IdTaiKhoan = input.IdTaiKhoan,
                    DiemTichLuy = input.DiemTichLuy
                };
                int editResult = modelStoreContext.Edit(oldKhachHang, newKhachHang);

                output = editResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String Delete(FormKhachHangDeleteInput input)
        {
            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
                KhachHang khachHang = new KhachHang()
                {
                    IdKhachHang = input.IdKhachHang
                };
                int deleteResult = modelStoreContext.Delete(khachHang);

                output = deleteResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String DeleteMarked(FormKhachHangDeleteMarked deleteInput)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            List<String> inputs = JsonConvert.DeserializeObject<List<String>>(deleteInput.JsonInput);

            List<String> outputs = new List<String>();
            if (inputs.Count > 0)
            {
                KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
                foreach (String input in inputs)
                {
                    KhachHang khachHang = new KhachHang()
                    {
                        IdKhachHang = Convert.ToInt32(input)
                    };
                    int deleteResult = modelStoreContext.Delete(khachHang);
                    outputs.Add(JsonConvert.SerializeObject(new { IdKhachHang = input, Result = deleteResult }));
                }
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String DeleteAll()
        {
            int output = 0;
            KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            output = deleteResult;

            return JsonConvert.SerializeObject(new { output = output });
        }
    }
}


