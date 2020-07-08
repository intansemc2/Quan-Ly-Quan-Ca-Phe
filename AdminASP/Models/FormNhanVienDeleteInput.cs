using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormNhanVienDeleteInput
    {

        private int idnhanvien;
        public int IdNhanVien { get { return this.idnhanvien; } set { this.idnhanvien = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdNhanVien >= 0))
            {
                errors.Add("Id nhân viên không thể để trống");
            }

            return errors;
        }
    }
}


