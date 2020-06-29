using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormBanDeleteInput
    {

        private int idban;
        public int IdBan { get { return this.idban; } set { this.idban = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdBan >= 0))
            {
                errors.Add("Id bàn không thể để trống");
            }

            return errors;
        }
    }
}


