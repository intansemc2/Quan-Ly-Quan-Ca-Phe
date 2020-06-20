using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class SanPham
    {
        private int idSanPham;
        public int IdSanPham { get { return this.idSanPham; } set { this.idSanPham = value; } }

        private int idLoaiSP;
        public int IdLoaiSP { get { return this.idLoaiSP; } set { this.idLoaiSP = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private int gia;
        public int Gia { get { return this.gia; } set { this.gia = value; } }

        private int diemTichLuy;
        public int DiemTichLuy { get { return this.diemTichLuy; } set { this.diemTichLuy = value; } }

        private String description;
        public String Description { get { return this.description; } set { this.description = value; } }
    }
}
