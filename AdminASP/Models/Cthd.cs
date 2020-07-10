using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class Cthd : BaseModel
    {
        private int idHoaDon;
        public int IdHoaDon { get { return this.idHoaDon; } set { this.idHoaDon = value; } }

        private int idSanPham;
        public int IdSanPham { get { return this.idSanPham; } set { this.idSanPham = value; } }

        private int soLuong;
        public int SoLuong { get { return this.soLuong; } set { this.soLuong = value; } }

        private int tongtien;
        public int TongTien { get { return this.tongtien; } set { this.tongtien = value; } }
    }
}
