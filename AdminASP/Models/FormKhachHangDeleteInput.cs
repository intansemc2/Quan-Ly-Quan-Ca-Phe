using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormKhachHangDeleteInput
    {

        private int idkhachhang;
        public int IdKhachHang { get { return this.idkhachhang; } set { this.idkhachhang = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdKhachHang >= 0))
            {
                errors.Add("Id khách hàng không thể để trống");
            }

            return errors;
        }
    }
}


