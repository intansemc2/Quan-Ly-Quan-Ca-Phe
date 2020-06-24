using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormRegisterInput : BaseModel
    {
        private String firstname;
        public String Firstname { get { return this.firstname; } set { this.firstname = value; } }

        private String lastname;
        public String Lastname { get { return this.lastname; } set { this.lastname = value; } }

        private String sdt;
        public String Sdt { get { return this.sdt; } set { this.sdt = value; } }

        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private String repassword;
        public String RePassword { get { return this.repassword; } set { this.repassword = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();

            if (this.Firstname == null || this.Firstname == "")
            {
                errors.Add("Tên và tên đệm không thể để trống");
            }
            if (this.Lastname == null || this.Lastname == "")
            {
                errors.Add("Họ không thể để trống");
            }
            if (this.Sdt == null || this.Sdt == "")
            {
                errors.Add("Số điện thoại không thể để trống");
            }
            if (!new Regex("^[0-9]{10,15}$").IsMatch(this.Sdt))
            {
                errors.Add("Số điện thoại chỉ được có 10 - 15 số");
            }
            if (this.Username == null || this.Username == "")
            {
                errors.Add("Username không thể để trống");
            }
            if (this.Password == null || this.Password == "")
            {
                errors.Add("Password không thể để trống");
            }
            if (this.RePassword == null || this.RePassword == "")
            {
                errors.Add("Password không thể để trống");
            }
            if (this.Password != this.RePassword)
            {
                errors.Add("Password không được khác RePassword ");
            }

            return errors;
        }

        public bool isSkip()
        {
            return this.Username == null && this.Password == null && this.RePassword == null && this.Firstname == null && this.Lastname == null && this.Sdt == null;
        }
    }
}
