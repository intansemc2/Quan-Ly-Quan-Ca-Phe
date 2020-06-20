using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class KhuyenMai
    {
        private int idKhuyenMai;
        public int IdKhuyenMai { get { return this.idKhuyenMai; } set { this.idKhuyenMai = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String thoiGIanDienRa;
        public String ThoiGIanDienRa { get { return this.thoiGIanDienRa; } set { this.thoiGIanDienRa = value; } }

        private String thoiGIanKetThuc;
        public String ThoiGIanKetThuc { get { return this.thoiGIanKetThuc; } set { this.thoiGIanKetThuc = value; } }
    }
}
