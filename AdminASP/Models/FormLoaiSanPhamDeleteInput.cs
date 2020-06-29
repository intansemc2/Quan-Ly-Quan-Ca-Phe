using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormLoaiSanPhamDeleteInput
    {

        private int idloaisp;
        public int IdLoaiSP { get { return this.idloaisp; } set { this.idloaisp = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdLoaiSP >= 0))
            {
                errors.Add("Id loại sản phẩm không thể để trống");
            }

            return errors;
        }
    }
}


