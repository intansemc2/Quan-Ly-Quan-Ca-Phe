using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminASP.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdminASP.Controllers
{
    public class AdminController : Controller
    {
        private bool CheckAdmin()
        {
            bool autologinResult = StoreLoginInfoHelper.AutoLogin(this);
            if (autologinResult)
            {
                TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);

                TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                List<BaseModel> findresult = taiKhoanStoreContext.Find(new TaiKhoan()
                {
                    Username = taiKhoan.Username,
                    Password = taiKhoan.Password,
                    Type = -1
                });

                if (findresult.Count > 0)
                {
                    TaiKhoan taiKhoanFound = findresult[0] as TaiKhoan;

                    if (taiKhoanFound.Type == TaiKhoan.TAI_KHOAN_ADMIN)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        public IActionResult Index()
        {
            if (CheckAdmin() == false)
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
            if (CheckAdmin() == false)
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlyhoadon()
        {
            if (CheckAdmin() == false)
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlykhachhang()
        {
            if (CheckAdmin() == false)
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlykhuyenmai()
        {
            if (CheckAdmin() == false)
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlyloaisanpham()
        {
            if (CheckAdmin() == false)
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlynhanvien()
        {
            if (CheckAdmin() == false)
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Quanlytaikhoan()
        {
            if (CheckAdmin() == false)
            {
                return RedirectToAction("Login", "Login");
            }

            return View();
        }

        public IActionResult Tongquat()
        {
            if (CheckAdmin() == false)
            {                
                return RedirectToAction("Login", "Login");
            }

            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoan.Username;
            return View();
        }
    }
}
