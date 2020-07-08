using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public class Breadcrumb
    {
        private String name;
        public String Name { get { return this.name; } set { this.name = value; } }

        private String link;
        public String Link { get { return this.link; } set { this.link = value; } }

        private bool isActive;
        public bool IsActive { get { return this.isActive; } set { this.isActive = value; } }
    }
}
