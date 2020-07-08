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
        public String GetAll()
        {
            if (!(CheckPermission.CheckStaff(this))) { return ""; }

            HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
            List<BaseModel> outputs = modelStoreContext.GetAll();
            List<HoaDon> thisModels = new List<HoaDon>();
            foreach (BaseModel baseModel in outputs)
            {
                thisModels.Add(baseModel as HoaDon);
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String Add(FormHoaDonAddInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            HoaDon newHoaDon = null;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
                newHoaDon = new HoaDon()
                {
                    IdKhachHang = input.IdKhachHang,
                    IdBan = input.IdBan,
                    IdNhanVien = input.IdNhanVien,
                    ThoiGianLap = input.ThoiGIanLap,
                    ThoiGianThanhToan = input.ThoiGIanThanhToan,
                    PhanTramTichLuy = input.PhanTramTichLuy,
                    SoLuongDiemDoi = input.SoLuongDiemDoi,
                    TyGiaDiemDoi = input.TyGiaDiemDoi
                };
                int addResult = modelStoreContext.Add(newHoaDon);

                output = addResult;
                newHoaDon.IdHoaDon = -1;
                newHoaDon = modelStoreContext.Find(newHoaDon)[0] as HoaDon;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors, newHoaDon = newHoaDon });
        }

        public String Edit(FormHoaDonEditInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
                HoaDon oldHoaDon = new HoaDon()
                {
                    IdHoaDon = input.IdHoaDon,
                };
                HoaDon newHoaDon = new HoaDon()
                {
                    IdKhachHang = input.IdKhachHang,
                    IdBan = input.IdBan,
                    IdNhanVien = input.IdNhanVien,
                    ThoiGianLap = input.ThoiGIanLap,
                    ThoiGianThanhToan = input.ThoiGianThanhToan,
                    PhanTramTichLuy = input.PhanTramTichLuy,
                    SoLuongDiemDoi = input.SoLuongDiemDoi,
                    TyGiaDiemDoi = input.TyGiaDiemDoi
                };
                int editResult = modelStoreContext.Edit(oldHoaDon, newHoaDon);

                output = editResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String Delete(FormHoaDonDeleteInput input)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            List<String> errors = input.GetValidate();
            if (errors.Count <= 0)
            {
                HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
                HoaDon taiKhoan = new HoaDon()
                {
                    IdHoaDon = input.IdHoaDon
                };
                int deleteResult = modelStoreContext.Delete(taiKhoan);

                output = deleteResult;
            }

            return JsonConvert.SerializeObject(new { output = output, errors = errors });
        }

        public String DeleteMarked(FormHoaDonDeleteMarked deleteInput)
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            List<String> inputs = JsonConvert.DeserializeObject<List<String>>(deleteInput.JsonInput);

            List<String> outputs = new List<String>();
            if (inputs.Count > 0)
            {
                HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
                foreach (String input in inputs)
                {
                    HoaDon hoaDon = new HoaDon()
                    {
                        IdHoaDon = Convert.ToInt32(input)
                    };
                    int deleteResult = modelStoreContext.Delete(hoaDon);
                    outputs.Add(JsonConvert.SerializeObject(new { IdHoaDon = input, Result = deleteResult }));
                }
            }

            return JsonConvert.SerializeObject(outputs);
        }

        public String DeleteAll()
        {
            if (!(CheckPermission.CheckAdmin(this))) { return ""; }

            int output = 0;
            HoaDonStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(HoaDonStoreContext)) as HoaDonStoreContext;
            int deleteResult = modelStoreContext.DeleteAll();

            output = deleteResult;

            return JsonConvert.SerializeObject(new { output = output });
        }
    }
}


