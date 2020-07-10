using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AdminASP.Models;
using System.Security.Cryptography;
using AdminASP.Helpers;
using System.Runtime.InteropServices.ComTypes;

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
                        //Lưu đăng nhập vào Session
                        StoreLoginInfoHelper.StoreLoginInSession(this.HttpContext.Session, taiKhoan);

                        if (input.RememberMe != null && input.RememberMe != "")
                        {
                            //Lưu đăng nhập vào Cookies
                            StoreLoginInfoHelper.StoreLoginInCookie(this.Response.Cookies, taiKhoan);
                        }
                        else
                        {
                            StoreLoginInfoHelper.RemoveLoginInCookie(this.Response.Cookies);
                        }

                        if (taiKhoan.Type == TaiKhoan.TAI_KHOAN_ADMIN)
                        {
                            return RedirectToAction("Index", "Home");
                        }
                        else if (taiKhoan.Type == TaiKhoan.TAI_KHOAN_STAFF)
                        {
                            return RedirectToAction("Index", "Home");
                        }
                        else
                        {
                            return RedirectToAction("Index", "Home");
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

                TaiKhoan newTaiKhoan = new TaiKhoan()
                {
                    Username = input.Username,
                    Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                    Type = TaiKhoan.TAI_KHOAN_USER
                };

                int addAccountResult = taiKhoanStoreContext.Add(newTaiKhoan);

                newTaiKhoan.IdTaiKhoan = -1;
                newTaiKhoan = taiKhoanStoreContext.Find(newTaiKhoan)[0] as TaiKhoan;

                int addUserResult = khachHangStoreContext.Add(new KhachHang()
                {
                    IdTaiKhoan = newTaiKhoan.IdTaiKhoan,
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

                    int deleteAccountResult = taiKhoanStoreContext.Delete(new TaiKhoan()
                    {
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
            if (StoreLoginInfoHelper.AutoLogin(this))
            {
                TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
                ViewData["input"] = taiKhoan;
                return View();
            }
            return RedirectToAction("Login", "Login");
        }

        public IActionResult ChangeAccountInfo(FormChangeAccountInfo input)
        {
            if (StoreLoginInfoHelper.AutoLogin(this))
            {
                List<String> errors = new List<String>();

                if (input.isSkip())
                {
                    TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
                    ViewData["input"] = new FormChangeAccountInfo()
                    {
                        Username = taiKhoan.Username,
                        Password = taiKhoan.Password,
                        RePassword = taiKhoan.Password
                    };
                    return View();
                }

                errors.AddRange(input.GetValidate());

                if (errors.Count <= 0)
                {
                    TaiKhoanStoreContext taiKhoanStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                    TaiKhoan oldSessionModel = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
                    List<BaseModel> findResults = taiKhoanStoreContext.Find(new TaiKhoan() { Username = oldSessionModel.Username, Password = oldSessionModel.Password, Type = -1 });

                    if (findResults.Count > 0)
                    {
                        TaiKhoan oldModel = findResults[0] as TaiKhoan;
                        TaiKhoan newModel = new TaiKhoan()
                        {
                            Username = input.Username,
                            Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                            Type = oldModel.Type
                        };
                        int editResult = taiKhoanStoreContext.Edit(oldModel, newModel);

                        if (editResult > 0)
                        {
                            return RedirectToAction("Logout", "Login");
                        }
                        else
                        {
                            errors.Add("Sửa xuống CSDL thất bại");
                        }
                    }
                    else
                    {
                        errors.Add("Không tìm thấy thông tin tài khoản trong CSDL");
                    }
                }

                ViewData["errors"] = errors;
                ViewData["input"] = input;
                return View();
            }

            return RedirectToAction("Login", "Login");
        }

        public IActionResult Logout()
        {
            StoreLoginInfoHelper.RemoveLoginInSession(this.HttpContext.Session);
            StoreLoginInfoHelper.RemoveLoginInCookie(this.Response.Cookies);
            return RedirectToAction("Login", "Login");
        }
    }
}