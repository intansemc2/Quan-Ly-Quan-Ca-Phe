using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class NhanVien : BaseModel
    {
        private int idNhanVien;
        public int IdNhanVien { get { return this.idNhanVien; } set { this.idNhanVien = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String sdt;
        public String Sdt { get { return this.sdt; } set { this.sdt = value; } }

        private int loai;
        public int Loai { get { return this.loai; } set { this.loai = value; } }

        private int idTaiKhoan;
        public int IdTaiKhoan { get { return this.idTaiKhoan; } set { this.idTaiKhoan = value; } }

        internal static object GetTypes()
        {
            List<String> types = new List<String>();
            types.Add("Staff");
            types.Add("Admin");
            return types;
        }
    }
}
