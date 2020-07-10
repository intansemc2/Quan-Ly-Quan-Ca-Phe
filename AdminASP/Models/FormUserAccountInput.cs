using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormUserAccountInput
    {

        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private String rePassword;
        public String RePassword { get { return this.rePassword; } set { this.rePassword = value; } }

        private String submit;
        public String Submit { get { return this.submit; } set { this.submit = value; } }

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

            if (!(RePassword != null && RePassword != ""))
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


