using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class TaiKhoan : BaseModel
    {
        private String username;
        public String Username { get { return this.username; } set { this.username = value; } }

        private String password;
        public String Password { get { return this.password; } set { this.password = value; } }

        private int type;
        public int Type { get { return this.type; } set { this.type = value; } }
    }
}
