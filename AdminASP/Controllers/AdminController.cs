using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminASP.Helpers;
using AdminASP.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AdminASP.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return RedirectToAction("Tongquat", "Admin");
        }

        public IActionResult Login()
        {
            return RedirectToAction("Login", "Login");
        }

        public IActionResult Quanlyban()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlyhoadon()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        [Route("/Admin/Chitiethoadon/{IdHoaDon}")]
        public IActionResult Chitiethoadon(String IdHoaDon)
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }
            ViewData["IdHoaDon"] = IdHoaDon;
            return View();
        }

        public IActionResult Quanlykhachhang()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlykhuyenmai()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlysanpham()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlynhanvien()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlytaikhoan()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Tongquat()
        {
            if (!(CheckPermission.CheckAdmin(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoan.Username;
            return View();
        }
    }
}
