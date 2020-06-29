using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormCthdEditInput
    {

        private int idhoadon;
        public int IdHoaDon { get { return this.idhoadon; } set { this.idhoadon = value; } }

        private int idsanpham;
        public int IdSanPham { get { return this.idsanpham; } set { this.idsanpham = value; } }

        private int soluong;
        public int SoLuong { get { return this.soluong; } set { this.soluong = value; } }

        private int dongia;
        public int DonGia { get { return this.dongia; } set { this.dongia = value; } }

        private int diemtichluy;
        public int DiemTichLuy { get { return this.diemtichluy; } set { this.diemtichluy = value; } }


        private int oldidhoadon;
        public int OldIdHoaDon { get { return this.oldidhoadon; } set { this.oldidhoadon = value; } }

        private int oldidsanpham;
        public int OldIdSanPham { get { return this.oldidsanpham; } set { this.oldidsanpham = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdHoaDon >= 0))
            {
                errors.Add("Id hóa đơn không thể để trống");
            }

            if (!(IdSanPham >= 0))
            {
                errors.Add("Id sản phẩm không thể để trống");
            }

            if (!(SoLuong >= 0))
            {
                errors.Add("Số lượng không thể để trống");
            }

            if (!(DonGia >= 0))
            {
                errors.Add("Đơn giá không thể để trống");
            }

            if (!(DiemTichLuy >= 0))
            {
                errors.Add("Điểm tích lũy không thể để trống");
            }


            if (!(OldIdHoaDon >= 0))
            {
                errors.Add("Id hóa đơn cũ không thể để trống");
            }

            if (!(OldIdSanPham >= 0))
            {
                errors.Add("Id sản phẩm cũ không thể để trống");
            }

            return errors;
        }
    }
}


