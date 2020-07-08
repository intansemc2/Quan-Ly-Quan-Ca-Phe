using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormKhachHangAddInput
    {

        private int idkhachhang;
        public int IdKhachHang { get { return this.idkhachhang; } set { this.idkhachhang = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String sdt;
        public String Sdt { get { return this.sdt; } set { this.sdt = value; } }

        private int idTaiKhoan;
        public int IdTaiKhoan { get { return this.idTaiKhoan; } set { this.idTaiKhoan = value; } }

        private int diemtichluy;
        public int DiemTichLuy { get { return this.diemtichluy; } set { this.diemtichluy = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdKhachHang >= 0))
            {
                errors.Add("Id khách hàng không thể để trống");
            }

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên không thể để trống");
            }

            if (!(Sdt != null && Sdt != ""))
            {
                errors.Add("Số điện thoại không thể để trống");
            }

            if (!(IdTaiKhoan >= 0))
            {
                errors.Add("Id tài khoản không thể để trống");
            }

            if (!(DiemTichLuy >= 0))
            {
                errors.Add("Điểm tích lũy không thể để trống");
            }

            return errors;
        }
    }
}


