using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class DatBan
    {
        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private int idBan;
        public int IdBan { get { return this.idBan; } set { this.idBan = value; } }

        private String thoiGIanLap;
        public String ThoiGIanLap { get { return this.thoiGIanLap; } set { this.thoiGIanLap = value; } }

        private String thoiGIanNhan;
        public String ThoiGIanNhan { get { return this.thoiGIanNhan; } set { this.thoiGIanNhan = value; } }

        private String ghiChu;
        public String GhiChu { get { return this.ghiChu; } set { this.ghiChu = value; } }
    }
}
