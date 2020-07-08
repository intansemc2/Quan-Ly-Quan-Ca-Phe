using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormSanPhamDeleteInput
    {

        private int idsanpham;
        public int IdSanPham { get { return this.idsanpham; } set { this.idsanpham = value; } }

        private int idloaisp;
        public int IdLoaiSP { get { return this.idloaisp; } set { this.idloaisp = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdSanPham >= 0))
            {
                errors.Add("Id sản phẩm không thể để trống");
            }

            if (!(IdLoaiSP >= 0))
            {
                errors.Add("Id loại sản phẩm không thể để trống");
            }

            return errors;
        }
    }
}


