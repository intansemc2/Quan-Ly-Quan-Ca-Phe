using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormBanAddInput
    {

        private int idban;
        public int IdBan { get { return this.idban; } set { this.idban = value; } }

        private String ten;
        public String Ten { get { return this.ten; } set { this.ten = value; } }

        private int trangthai;
        public int TrangThai { get { return this.trangthai; } set { this.trangthai = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(IdBan >= 0))
            {
                errors.Add("Id bàn không thể để trống");
            }

            if (!(Ten != null && Ten != ""))
            {
                errors.Add("Tên bàn không thể để trống");
            }

            if (!(TrangThai >= 0))
            {
                errors.Add("Loại bàn không thể để trống");
            }

            return errors;
        }
    }
}


