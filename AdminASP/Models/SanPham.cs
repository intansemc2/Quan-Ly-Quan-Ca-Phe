using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class SanPham : BaseModel
    {
        private int idSanPham;
        public int IdSanPham { get { return this.idSanPham; } set { this.idSanPham = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private int gia;
        public int Gia { get { return this.gia; } set { this.gia = value; } }

        private int diemTichLuy;
        public int DiemTichLuy { get { return this.diemTichLuy; } set { this.diemTichLuy = value; } }

        private String ghiChu;
        public String GhiChu { get { return this.ghiChu; } set { this.ghiChu = value; } }
    }
}
