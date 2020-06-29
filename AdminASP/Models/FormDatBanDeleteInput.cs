using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class FormDatBanDeleteInput
    {

        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private int idban;
        public int IdBan { get { return this.idban; } set { this.idban = value; } }

        private String thoigianlap;
        public String ThoiGIanLap { get { return this.thoigianlap; } set { this.thoigianlap = value; } }

        public List<String> GetValidate()
        {
            List<String> errors = new List<String>();


            if (!(Username != null && Username != ""))
            {
                errors.Add("Tên đăng nhập không thể để trống");
            }

            if (!(IdBan >= 0))
            {
                errors.Add("Id bàn không thể để trống");
            }

            if (!(ThoiGIanLap != null && ThoiGIanLap != ""))
            {
                errors.Add("Thời gian lập không thể để trống");
            }

            return errors;
        }
    }
}


