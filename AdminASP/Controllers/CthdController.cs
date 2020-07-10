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
    public class CthdController : Controller
    {
        public String GetAll()
        {
            if (!(CheckPermission.CheckStaff(this))) { return ""; }

            CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
            List<BaseModel> baseModels = modelStoreContext.GetAll();
            List<Cthd> outputs = new List<Cthd>();
            foreach (BaseModel baseModel in baseModels)
            {
                outputs.Add(baseModel as Cthd);
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String Add(FormCthdAddInput input)
        {
            if (!(CheckPermission.CheckStaff(this))) { return ""; }

            int output = 0;
            Cthd newCthd = null;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
                newCthd = new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                    SoLuong = input.SoLuong,
                    DonGia = input.DonGia,
                    DiemTichLuy = input.DiemTichLuy
                };
                int addResult = modelStoreContext.Add(newCthd);

                output = addResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors, newCthd = newCthd });
        }

        public String Edit(FormCthdEditInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
                Cthd oldCthd = new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                };
                Cthd newCthd = new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                    SoLuong = input.SoLuong,
                    DonGia = input.DonGia,
                    DiemTichLuy = input.DiemTichLuy
                };
                int editResult = modelStoreContext.Edit(oldCthd, newCthd);

                output = editResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String Delete(FormCthdDeleteInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
                Cthd taiKhoan = new Cthd()
                {
                    IdHoaDon = input.IdHoaDon,
                    IdSanPham = input.IdSanPham,
                };
                int deleteResult = modelStoreContext.Delete(taiKhoan);

                output = deleteResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String DeleteMarked(FormCthdDeleteMarked deleteInput)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            List<Cthd> inputs = JsonConvert.DeserializeObject<List<Cthd>>(deleteInput.JsonInput);

            List<String> outputs = new List<String>();
            if (inputs.Count > 0)
            {
                CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
                foreach (Cthd input in inputs)
                {
                    Cthd cthd = new Cthd()
                    {
                        IdHoaDon = input.IdHoaDon,
                        IdSanPham = input.IdSanPham
                    };
                    int deleteResult = modelStoreContext.Delete(cthd);
                    outputs.Add(JsonConvert.SerializeObject(new { IdHoaDon = input.IdHoaDon, IdSanPham = input.IdSanPham, Result = deleteResult }));
                }
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String DeleteAll()
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            CthdStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(CthdStoreContext)) as CthdStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            output = deleteResult;

            return JsonConvert.SerializeObject(new { output = output });
        }
    }
}


