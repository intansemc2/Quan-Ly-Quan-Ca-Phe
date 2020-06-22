using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class Ban : BaseModel
    {
        private int idBan;
        public int IdBan { get { return this.idBan; } set { this.idBan = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private int trangThai;
        public int TrangThai { get { return this.trangThai; } set { this.trangThai = value; } }
    }
}
