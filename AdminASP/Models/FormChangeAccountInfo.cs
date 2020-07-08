using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormChangeAccountInfo : BaseModel
    {
        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private String repassword;
        public String RePassword { get { return this.repassword; } set { this.repassword = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();

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
            return this.Username == null && this.Password == null && this.RePassword == null;
        }
    }
}
