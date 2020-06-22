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

        private String thoiGIan;
        public String ThoiGIan { get { return this.thoiGIan; } set { this.thoiGIan = value; } }

        private float phanTramTichLuy;
        public float PhanTramTichLuy { get { return this.phanTramTichLuy; } set { this.phanTramTichLuy = value; } }

        private int soLuongDiemDoi;
        public int SoLuongDiemDoi { get { return this.soLuongDiemDoi; } set { this.soLuongDiemDoi = value; } }

        private float tyGiaDiemDoi;
        public float TyGiaDiemDoi { get { return this.tyGiaDiemDoi; } set { this.tyGiaDiemDoi = value; } }
    }
}
