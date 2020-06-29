using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormHoaDonAddInput
    {

        private int idhoadon;
        public int IdHoaDon { get { return this.idhoadon; } set { this.idhoadon = value; } }

        private int idkhachhang;
        public int IdKhachHang { get { return this.idkhachhang; } set { this.idkhachhang = value; } }

        private int idban;
        public int IdBan { get { return this.idban; } set { this.idban = value; } }

        private int idnhanvien;
        public int IdNhanVien { get { return this.idnhanvien; } set { this.idnhanvien = value; } }

        private String thoigian;
        public String ThoiGIan { get { return this.thoigian; } set { this.thoigian = value; } }

        private float phantramtichluy;
        public float PhanTramTichLuy { get { return this.phantramtichluy; } set { this.phantramtichluy = value; } }

        private int soluongdiemdoi;
        public int SoLuongDiemDoi { get { return this.soluongdiemdoi; } set { this.soluongdiemdoi = value; } }

        private float tygiadiemdoi;
        public float TyGiaDiemDoi { get { return this.tygiadiemdoi; } set { this.tygiadiemdoi = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdHoaDon >= 0))
            {
                errors.Add("Id hóa đơn không thể để trống");
            }

            if (!(IdKhachHang >= 0))
            {
                errors.Add("Id khách hàng không thể để trống");
            }

            if (!(IdBan >= 0))
            {
                errors.Add("Id bàn không thể để trống");
            }

            if (!(IdNhanVien >= 0))
            {
                errors.Add("Id nhân viên không thể để trống");
            }

            if (!(ThoiGIan != null && ThoiGIan != ""))
            {
                errors.Add("Thời gian không thể để trống");
            }

            if (!(PhanTramTichLuy >= 0))
            {
                errors.Add("Phần trăm tích lũy không thể để trống");
            }

            if (!(SoLuongDiemDoi >= 0))
            {
                errors.Add("Số lượng điểm đổi không thể để trống");
            }

            if (!(TyGiaDiemDoi >= 0))
            {
                errors.Add("Tỷ giá quy đổi không thể để trống");
            }

            return errors;
        }
    }
}


