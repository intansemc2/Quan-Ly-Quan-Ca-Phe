using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormSanPhamAddInput
    {

        private int idsanpham;
        public int IdSanPham { get { return this.idsanpham; } set { this.idsanpham = value; } }

        private int idloaisp;
        public int IdLoaiSP { get { return this.idloaisp; } set { this.idloaisp = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private int gia;
        public int Gia { get { return this.gia; } set { this.gia = value; } }

        private int diemtichluy;
        public int DiemTichLuy { get { return this.diemtichluy; } set { this.diemtichluy = value; } }

        private String description;
        public String Description { get { return this.description; } set { this.description = value; } }

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

            if (!(Description != null && Description != ""))
            {
                errors.Add("Ghi chú không thể để trống");
            }

            return errors;
        }
    }
}


