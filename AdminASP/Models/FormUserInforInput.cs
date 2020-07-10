using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormUserInforInput
    {
        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String sdt;
        public String Sdt { get { return this.sdt; } set { this.sdt = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private String submit;
        public String Submit { get { return this.submit; } set { this.submit = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên đăng nhập không thể để trống");
            }

            if (!(Sdt != null && Sdt != ""))
            {
                errors.Add("Mật khẩu không thể để trống");
            }

            if (!(Password != null && Password != ""))
            {
                errors.Add(" Nhập lại mật khẩu không thể để trống");
            }

            return errors;
        }

        public bool IsSkip()
        {
            return this.Submit == null || this.Submit == "";
        }

    }
}
