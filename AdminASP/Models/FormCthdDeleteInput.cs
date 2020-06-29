using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormCthdDeleteInput
    {

        private int idnhanvien;
        public int IdNhanVien { get { return this.idnhanvien; } set { this.idnhanvien = value; } }

        private int idsanpham;
        public int IdSanPham { get { return this.idsanpham; } set { this.idsanpham = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdNhanVien >= 0))
            {
                errors.Add("Id nhân viên không thể để trống");
            }

            if (!(IdSanPham >= 0))
            {
                errors.Add("Id sản phẩm không thể để trống");
            }

            return errors;
        }
    }
}


