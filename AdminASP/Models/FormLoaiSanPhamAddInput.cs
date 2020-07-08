using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormLoaiSanPhamAddInput
    {

        private int idloaisp;
        public int IdLoaiSP { get { return this.idloaisp; } set { this.idloaisp = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdLoaiSP >= 0))
            {
                errors.Add("Id loại sản phẩm không thể để trống");
            }

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên không thể để trống");
            }

            return errors;
        }
    }
}


