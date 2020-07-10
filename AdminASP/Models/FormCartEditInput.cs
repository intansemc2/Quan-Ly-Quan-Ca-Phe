using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormCartEditInput
    {
        private int idSanPham;
        public int IdSanPham { get { return this.idSanPham; } set { this.idSanPham = value; } }

        private int idBan;
        public int IdBan { get { return this.idBan; } set { this.idBan = value; } }

        private int soLuong;
        public int SoLuong { get { return this.soLuong; } set { this.soLuong = value; } }

        private int oldIdSanPham;
        public int OldIdSanPham { get { return this.oldIdSanPham; } set { this.oldIdSanPham = value; } }

        private int oldIdBan;
        public int OldIdBan { get { return this.oldIdBan; } set { this.oldIdBan = value; } }


        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();
            return errors;
        }        
    }
}


