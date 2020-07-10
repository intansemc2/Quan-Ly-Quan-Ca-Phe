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
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Account(FormUserAccountInput input = null)
        {
            if (!(CheckPermission.CheckUser(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            TaiKhoan taiKhoanSession = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoanSession.Username;

            if (input != null && !input.IsSkip())
            {
                List<String> errors = input.GetValidate();                

                if (errors.Count <= 0)
                {
                    TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                    
                    TaiKhoan oldTaiKhoan = new TaiKhoan()
                    {
                        IdTaiKhoan = taiKhoanSession.IdTaiKhoan
                    };
                    TaiKhoan newTaiKhoan = new TaiKhoan()
                    {
                        Username = input.Username,
                        Password = PasswordHashHelper.ComputeSha256Hash(input.Password),
                        Type = TaiKhoan.TAI_KHOAN_USER
                    };
                    int editResult = modelStoreContext.Edit(oldTaiKhoan, newTaiKhoan);

                    if (editResult > 0)
                    {
                        ViewData["output"] = "success";
                    }
                    else
                    {
                        ViewData["output"] = "fail";
                    }
                }
                ViewData["errors"] = errors;
            }
            return View();
        }

        public IActionResult History()
        {
            return View();
        }

        public IActionResult Infor(FormUserInforInput input)
        {
            if (!(CheckPermission.CheckUser(this)))
            {
                return RedirectToAction("Login", "Login");
            }

            TaiKhoan taiKhoanSession = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoanSession.Username;

            if (input != null && !input.IsSkip())
            {
                List<String> errors = input.GetValidate();         
                
                if (PasswordHashHelper.ComputeSha256Hash(input.Password != null ? input.Password : "") != taiKhoanSession.Password)
                {
                    errors.Add("Mật khẩu không chính xác");
                }

                if (errors.Count <= 0)
                {
                    KhachHangStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;                    
                    List<BaseModel> khachhangs = modelStoreContext.Find(new KhachHang() 
                    { 
                        IdTaiKhoan = taiKhoanSession.IdTaiKhoan,
                        DiemTichLuy = -1,
                        Sdt = null,
                        IdKhachHang = -1,
                        Ten = null
                    });
                    if (khachhangs.Count <= 0)
                    {
                        errors.Add("Khách hàng ứng với tài khoản không tồn tại");
                    }
                    else
                    {
                        KhachHang khachhang = khachhangs[0] as KhachHang;
                        int editResult = modelStoreContext.Edit(
                            new KhachHang() { IdKhachHang = khachhang.IdKhachHang },
                            new KhachHang() 
                            { 
                                IdTaiKhoan = taiKhoanSession.IdTaiKhoan,
                                Sdt = input.Sdt,
                                Ten = input.Ten
                            }
                        );
                        if (editResult > 0)
                        {
                            ViewData["output"] = "success";
                        }
                        else
                        {
                            ViewData["output"] = "fail";
                        }
                    }                 
                }

                ViewData["errors"] = errors;
            }            
            return View();
        }

        public IActionResult Statistical()
        {
            return View();
        }

        public IActionResult DeleteAccount()
        {
            return RedirectToAction("DeleteAccount", "Login");
        }

        public IActionResult Logout()
        {
            return RedirectToAction("Logout", "Login");
        }
    }
}
