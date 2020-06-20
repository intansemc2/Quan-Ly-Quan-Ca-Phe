using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AdminASP.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return this.Tongquat();
        }

        public IActionResult ForgotPassword()
        {
            return View();
        }

        public IActionResult Huongdansudung()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Quanlyban()
        {
            return View();
        }

        public IActionResult Quanlyhoadon()
        {
            return View();
        }

        public IActionResult Quanlykhachhang()
        {
            return View();
        }

        public IActionResult Quanlykhuyenmai()
        {
            return View();
        }

        public IActionResult Quanlyloaisanpham()
        {
            return View();
        }

        public IActionResult Quanlynhanvien()
        {
            return View();
        }

        public IActionResult Quanlytaikhoan()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Thongtinungdung()
        {
            return View();
        }

        public IActionResult Tongquat()
        {
            return View();
        }

        public IActionResult Xemthongke()
        {
            return View();
        }
    }
}
