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

        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

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

            if (!(Username != null && Username != ""))
            {
                errors.Add("Tên đăng nhập không thể để trống");
            }

            if (!(DiemTichLuy >= 0))
            {
                errors.Add("Điểm tích lũy không thể để trống");
            }

            return errors;
        }
    }
}


