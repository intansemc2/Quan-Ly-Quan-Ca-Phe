using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormBanAddInput
    {
        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();  

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên bàn không thể để trống");
            }
            return errors;
        }
    }
}


