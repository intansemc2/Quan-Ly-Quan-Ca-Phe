using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormLoginInput : BaseModel
    {
        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private String rememberMe;
        public String RememberMe { get { return this.rememberMe; } set { this.rememberMe = value; } }

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

            return errors;
        }

        public bool isSkip()
        {
            return this.Username == null && this.Password == null;
        }
    }
}
