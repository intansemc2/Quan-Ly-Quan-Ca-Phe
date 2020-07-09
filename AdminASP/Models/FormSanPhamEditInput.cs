using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormSanPhamEditInput
    {

        private int idsanpham;
        public int IdSanPham { get { return this.idsanpham; } set { this.idsanpham = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private int gia;
        public int Gia { get { return this.gia; } set { this.gia = value; } }

        private int diemtichluy;
        public int DiemTichLuy { get { return this.diemtichluy; } set { this.diemtichluy = value; } }

        private String description;
        public String Description { get { return this.description; } set { this.description = value; } }


        private int oldidsanpham;
        public int OldIdSanPham { get { return this.oldidsanpham; } set { this.oldidsanpham = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdSanPham >= 0))
            {
                errors.Add("Id sản phẩm không thể để trống");
            }

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên không thể để trống");
            }

            if (!(Gia >= 0))
            {
                errors.Add("Giá không thể để trống");
            }

            if (!(DiemTichLuy >= 0))
            {
                errors.Add("Điểm tích lũy không thể để trống");
            }

            if (!(OldIdSanPham >= 0))
            {
                errors.Add("Id sản phẩm cũ không thể để trống");
            }

            return errors;
        }
    }
}


