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
        public String GetAll()
        {
            if (!(CheckPermission.CheckStaff(this))) { return ""; }

            NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<NhanVien> outputs = new List<NhanVien>();
            foreach (BaseModel baseModel in baseModels)
            {
                outputs.Add(baseModel as NhanVien);
            }
            return JsonConvert.SerializeObject(outputs);
        }

        public String Add(FormNhanVienAddInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            NhanVien newNhanVien = null;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
                newNhanVien = new NhanVien()
                {
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    Loai = input.Loai,
                    IdTaiKhoan = input.IdTaiKhoan
                };
                int addResult = modelStoreContext.Add(newNhanVien);

                output = addResult;
                newNhanVien.IdNhanVien = -1;
                newNhanVien = modelStoreContext.Find(newNhanVien)[0] as NhanVien;
            }
            return JsonConvert.SerializeObject(new { output = output, errors = errors, newNhanVien = newNhanVien });
        }

        public String Edit(FormNhanVienEditInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
                NhanVien oldNhanVien = new NhanVien()
                {
                    IdNhanVien = input.IdNhanVien
                };
                NhanVien newNhanVien = new NhanVien()
                {
                    Ten = input.Ten,
                    Sdt = input.Sdt,
                    Loai = input.Loai,
                    IdTaiKhoan = input.IdTaiKhoan
                };
                int editResult = modelStoreContext.Edit(oldNhanVien, newNhanVien);

                output = editResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String Delete(FormNhanVienDeleteInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
                NhanVien nhanVien = new NhanVien()
                {
                    IdNhanVien = input.IdNhanVien
                };
                int deleteResult = modelStoreContext.Delete(nhanVien);

                output = deleteResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String DeleteMarked(FormNhanVienDeleteMarked deleteInput)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            List<String> inputs = JsonConvert.DeserializeObject<List<String>>(deleteInput.JsonInput);

            List<String> outputs = new List<String>();
            if (inputs.Count > 0)
            {
                NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
                foreach (String input in inputs)
                {
                    NhanVien nhanVien = new NhanVien() 
                    { 
                        IdNhanVien = Convert.ToInt32(input)
                    };
                    int deleteResult = modelStoreContext.Delete(nhanVien);
                    outputs.Add(JsonConvert.SerializeObject(new { IdNhanVien = input, Result = deleteResult }));
                }
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String DeleteAll()
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            NhanVienStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            output = deleteResult;

            return JsonConvert.SerializeObject(new { output = output });
        }

        public String GetLoais()
        {
            return JsonConvert.SerializeObject(NhanVien.GetTypes());
        }
    }
}


