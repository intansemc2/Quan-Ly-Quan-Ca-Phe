using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormLoaiSanPhamEditInput
    {

        private int idloaisp;
        public int IdLoaiSP { get { return this.idloaisp; } set { this.idloaisp = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }


        private int oldidloaisp;
        public int OldIdLoaiSP { get { return this.oldidloaisp; } set { this.oldidloaisp = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdLoaiSP >= 0))
            {
                errors.Add("Id loại sản phẩm không thể để trống");
            }

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên không thể để trống");
            }


            if (!(OldIdLoaiSP >= 0))
            {
                errors.Add("Id loại sản phẩm cũ không thể để trống");
            }

            return errors;
        }
    }
}


