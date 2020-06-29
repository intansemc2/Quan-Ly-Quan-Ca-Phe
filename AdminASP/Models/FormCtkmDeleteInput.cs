using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormCtkmDeleteInput
    {

        private int idkhuyenmai;
        public int IdKhuyenMai { get { return this.idkhuyenmai; } set { this.idkhuyenmai = value; } }

        private int idsanpham;
        public int IdSanPham { get { return this.idsanpham; } set { this.idsanpham = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdKhuyenMai >= 0))
            {
                errors.Add("Id khuyến mãi không thể để trống");
            }

            if (!(IdSanPham >= 0))
            {
                errors.Add("Id sản phẩm không thể để trống");
            }

            return errors;
        }
    }
}


