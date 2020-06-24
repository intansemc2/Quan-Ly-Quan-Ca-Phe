using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AdminASP.Models;
using System.Security.Cryptography;
using AdminASP.Helpers;

namespace AdminASP.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Login", "Login");
        }

        public IActionResult Login(FormLoginInput input = null)
        {
            List<String> errors = new List<String>();

            if (input.isSkip())
            {
                return View();
            }

            errors.AddRange(input.GetValidate());

            if (errors.Count <= 0)
            {
                TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                List<BaseModel> findresult = taiKhoanStoreContext.Find(new TaiKhoan()
                {
                    Username = input.Username,
                    Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                    Type = -1
                });

                if (findresult.Count <= 0)
                {
                    errors.Add("Thông tin đăng nhập không hợp lệ");
                }
                else
                {
                    TaiKhoan taiKhoan = findresult[0] as TaiKhoan;

                    if (taiKhoan != null)
                    {
                        if (taiKhoan.Type == TaiKhoan.TAI_KHOAN_ADMIN)
                        {
                            return RedirectToAction("Index", "Admin");
                        }
                        else if (taiKhoan.Type == TaiKhoan.TAI_KHOAN_STAFF)
                        {
                            return RedirectToAction("Index", "Staff");
                        }
                        else
                        {
                            return RedirectToAction("Index", "User");
                        }
                    }
                }
            }

            ViewData["errors"] = errors;
            ViewData["input"] = input;
            return View();
        }

        public IActionResult Register(FormRegisterInput input = null)
        {
            List<String> errors = new List<String>();

            if (input.isSkip())
            {
                return View();
            }

            errors.AddRange(input.GetValidate());

            if (errors.Count <= 0)
            {
                TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                KhachHangStoreContext khachHangStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;

                int addAccountResult = taiKhoanStoreContext.Add(new TaiKhoan() { 
                    Username = input.Username,
                    Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                    Type = TaiKhoan.TAI_KHOAN_USER
                });

                int addUserResult = khachHangStoreContext.Add(new KhachHang() { 
                    Username = input.Username,
                    Ten = input.Lastname + " " + input.Firstname,
                    Sdt = input.Sdt,
                    DiemTichLuy = 0
                });

                if (addAccountResult <= 0)
                {
                    errors.Add("Thêm tài khoản xuống CSDL thất bại");
                }
                else if (addUserResult <= 0)
                {
                    errors.Add("Thêm người dùng xuống CSDL thất bại, tiến hành xóa tài khoản vừa thêm.");

                    int deleteAccountResult = taiKhoanStoreContext.Delete(new TaiKhoan() { 
                        Username = input.Username,
                        Type = -1
                    });

                    if (deleteAccountResult <= 0)
                    {
                        errors.Add("Xóa tài khoản vừa thêm vào CSDL thất bại.");
                    }
                }
                else
                {
                    return RedirectToAction("Login", "Login");
                }
            }

            ViewData["errors"] = errors;
            ViewData["input"] = input;
            return View();
        }

        public IActionResult ForgotPassword()
        {
            return View();
        }

        public IActionResult AccountInfo()
        {
            return View();
        }

        public IActionResult ChangeAccountInfo()
        {
            return View();
        }

        public IActionResult Logout()
        {
            return RedirectToAction("Login", "Login");
        }
    }
}