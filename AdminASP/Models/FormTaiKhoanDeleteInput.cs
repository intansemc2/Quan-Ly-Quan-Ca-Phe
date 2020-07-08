using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormTaiKhoanDeleteInput
    {

        private String idTaiKhoan;
        public String IdTaiKhoan { get { return this.idTaiKhoan; } set { this.idTaiKhoan = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdTaiKhoan != null && IdTaiKhoan != ""))
            {
                errors.Add("Tên đăng nhập không thể để trống");
            }

            return errors;
        }
    }
}


