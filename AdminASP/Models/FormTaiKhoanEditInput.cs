using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormTaiKhoanEditInput
    {

        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private int type;
        public int Type { get { return this.type; } set { this.type = value; } }

        private int oldIdTaiKhoan;
        public int OldIdTaiKhoan { get { return this.oldIdTaiKhoan; } set { this.oldIdTaiKhoan = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(Username != null && Username != ""))
            {
                errors.Add("Tên đăng nhập không thể để trống");
            }

            if (!(Password != null && Password != ""))
            {
                errors.Add("Mật khẩu không thể để trống");
            }

            if (!(Type >= 0))
            {
                errors.Add("Loại không thể để trống");
            }


            if (!(OldIdTaiKhoan >=0))
            {
                errors.Add("Id tài khoản cũ không thể để trống");
            }

            return errors;
        }
    }
}


