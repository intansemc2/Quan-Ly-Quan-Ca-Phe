﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class TaiKhoan : BaseModel
    {
        private int idTaiKhoan;
        public int IdTaiKhoan { get { return this.idTaiKhoan; } set { this.idTaiKhoan = value; } }

        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private int type;
        public int Type { get { return this.type; } set { this.type = value; } }

        public static int TAI_KHOAN_ADMIN = 2;
        public static int TAI_KHOAN_USER = 0;
        public static int TAI_KHOAN_STAFF = 1;
        public static int TAI_KHOAN_UNKNOWN = -1;

        public static List<String> GetTypes()
        {
            List<String> types = new List<String>();
            types.Add("User");
            types.Add("Staff");
            types.Add("Admin");
            return types;
        }

        public String TypeToString()
        {
            if (this.Type == TaiKhoan.TAI_KHOAN_ADMIN)
            {
                return "Admin";
            }
            else if (this.Type == TaiKhoan.TAI_KHOAN_STAFF)
            {
                return "Staff";
            }
            else if (this.Type == TaiKhoan.TAI_KHOAN_USER)
            {
                return "User";
            }
            else
            {
                return "Unknown";
            }
        }
    }
}
