using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormTaiKhoanDeleteInput
    {

        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(Username != null && Username != ""))
            {
                errors.Add("Tên đăng nhập không thể để trống");
            }

            return errors;
        }
    }
}


