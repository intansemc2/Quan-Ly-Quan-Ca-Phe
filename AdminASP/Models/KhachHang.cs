using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class KhachHang : BaseModel
    {
        private int idKhachHang;
        public int IdKhachHang { get { return this.idKhachHang; } set { this.idKhachHang = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String sdt;
        public String Sdt { get { return this.sdt; } set { this.sdt = value; } }

        private int idTaiKhoan;
        public int IdTaiKhoan { get { return this.idTaiKhoan; } set { this.idTaiKhoan = value; } }

        private int diemTichLuy;
        public int DiemTichLuy { get { return this.diemTichLuy; } set { this.diemTichLuy = value; } }
    }
}
