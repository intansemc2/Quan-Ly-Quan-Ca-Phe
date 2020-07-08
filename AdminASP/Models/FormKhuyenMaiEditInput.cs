using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormKhuyenMaiEditInput
    {

        private int idkhuyenmai;
        public int IdKhuyenMai { get { return this.idkhuyenmai; } set { this.idkhuyenmai = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private String thoigiandienra;
        public String ThoiGIanDienRa { get { return this.thoigiandienra; } set { this.thoigiandienra = value; } }

        private String thoigianketthuc;
        public String ThoiGIanKetThuc { get { return this.thoigianketthuc; } set { this.thoigianketthuc = value; } }


        private int oldidkhuyenmai;
        public int OldIdKhuyenMai { get { return this.oldidkhuyenmai; } set { this.oldidkhuyenmai = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdKhuyenMai >= 0))
            {
                errors.Add("Id khuyến mãi không thể để trống");
            }

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên không thể để trống");
            }

            if (!(ThoiGIanDienRa != null && ThoiGIanDienRa != ""))
            {
                errors.Add("Thời gian diễn ra không thể để trống");
            }

            if (!(ThoiGIanKetThuc != null && ThoiGIanKetThuc != ""))
            {
                errors.Add("Thời gian kết thúc không thể để trống");
            }


            if (!(OldIdKhuyenMai >= 0))
            {
                errors.Add("Id khuyến mãi cũ không thể để trống");
            }

            return errors;
        }
    }
}


