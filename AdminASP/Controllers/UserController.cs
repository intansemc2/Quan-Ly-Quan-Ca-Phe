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

            if (input != null && !input.IsSkip()) 
            {
                List<String> errors = input.GetValidate();
                ViewData["errors"] = errors;

                if (errors.Count <= 0) 
                {
                    TaiKhoanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
                    TaiKhoan taiKhoanSession = StoreLoginInfoHelper.GetLoginInSession(controller.HttpContext.Session);
                    TaiKhoan oldTaiKhoan = new TaiKhoan()
                    {
                        IdTaiKhoan = taiKhoanSession.IdTaiKhoan;
                    };
                    TaiKhoan newTaiKhoan = new TaiKhoan()
                    {
                        Username = input.Username,
                        Password = input.Password,
                        Type = TaiKhoan.TAI_KHOAN_USER;
                    };
                    int editResult = modelStoreContext.Edit(oldTaiKhoan, newTaiKhoan);

                    if (editResult > 0)
                    {
                        ViewData["output"] = "success";
                    }
                    else {
                        ViewData["output"] = "fail";
                    }
                }
            }
            return View();
        }

        public IActionResult History()
        {
            return View();
        }

        public IActionResult Infor()
        {
            return View();
        }

        public IActionResult Statistical()
        {
            return View();
        }

        public IActionResult DeleteAccount()
        {
            return RedirectToAction("Index", "User");
        }

        public IActionResult Logout()
        {
            return RedirectToAction("Index", "User");
        }
    }
}
