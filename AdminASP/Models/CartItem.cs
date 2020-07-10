using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class CartItem : BaseModel
    {
        private int idSanPham;
        public int IdSanPham { get { return this.idSanPham; } set { this.idSanPham = value; } }

        private int idBan;
        public int IdBan { get { return this.idBan; } set { this.idBan = value; } }

        private int soLuong;
        public int SoLuong { get { return this.soLuong; } set { this.soLuong = value; } }
    }
}
