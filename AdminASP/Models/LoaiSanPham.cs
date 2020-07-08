using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class LoaiSanPham : BaseModel
    {
        private int idLoaiSP;
        public int IdLoaiSP { get { return this.idLoaiSP; } set { this.idLoaiSP = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String ghiChu;
        public String GhiChu { get { return this.ghiChu; } set { this.ghiChu = value; } }

        private String linkAnh;
        public String LinkAnh { get { return this.linkAnh; } set { this.linkAnh = value; } }
    }
}
