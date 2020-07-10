using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class HoaDon : BaseModel
    {
        private int idHoaDon;
        public int IdHoaDon { get { return this.idHoaDon; } set { this.idHoaDon = value; } }

        private int idKhachHang;
        public int IdKhachHang { get { return this.idKhachHang; } set { this.idKhachHang = value; } }

        private int idBan;
        public int IdBan { get { return this.idBan; } set { this.idBan = value; } }

        private int idNhanVien;
        public int IdNhanVien { get { return this.idNhanVien; } set { this.idNhanVien = value; } }

        private String thoiGian;
        public String ThoiGian { get { return this.thoiGian; } set { this.thoiGian = value; } }

        private int tongTien;
        public int TongTien { get { return this.tongTien; } set { this.tongTien = value; } }

        private int diemDoi;
        public int DiemDoi { get { return this.diemDoi; } set { this.diemDoi = value; } }

        private int thanhToan;
        public int ThanhToan { get { return this.thanhToan; } set { this.thanhToan = value; } }

        private int diemTichLuy;
        public int DiemTichLuy { get { return this.diemTichLuy; } set { this.diemTichLuy = value; } }
    }
}
