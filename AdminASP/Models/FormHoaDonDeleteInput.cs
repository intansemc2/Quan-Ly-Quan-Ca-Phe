using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormHoaDonDeleteInput
    {

        private int idhoadon;
        public int IdHoaDon { get { return this.idhoadon; } set { this.idhoadon = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdHoaDon >= 0))
            {
                errors.Add("Id hóa đơn không thể để trống");
            }

            return errors;
        }
    }
}


