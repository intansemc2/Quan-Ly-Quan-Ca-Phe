using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormNhanVienAddInput
    {

        private int idnhanvien;
        public int IdNhanVien { get { return this.idnhanvien; } set { this.idnhanvien = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String sdt;
        public String Sdt { get { return this.sdt; } set { this.sdt = value; } }

        private int loai;
        public int Loai { get { return this.loai; } set { this.loai = value; } }

        private int idTaiKhoan;
        public int IdTaiKhoan { get { return this.idTaiKhoan; } set { this.idTaiKhoan = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdNhanVien >= 0))
            {
                errors.Add("Id nhân viên không thể để trống");
            }

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên không thể để trống");
            }

            if (!(Sdt != null && Sdt != ""))
            {
                errors.Add("Số điện thoại không thể để trống");
            }

            if (!(Loai >= 0))
            {
                errors.Add("Loại không thể để trống");
            }

            if (!(IdTaiKhoan >= 0))
            {
                errors.Add("Id tài khoản không thể để trống");
            }

            return errors;
        }
    }
}


