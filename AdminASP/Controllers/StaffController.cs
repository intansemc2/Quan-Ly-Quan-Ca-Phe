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
    public class StaffController : Controller
    {
        public IActionResult Index()
        {
            if (!(CheckPermission.CheckStaff(this)))
            {
                return RedirectToAction("Login", "Staff");
            }
            //Lấy thông tin tài khoản hiện tại
            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoan.Username;
            return View();
        }

        public IActionResult Home()
        {
            if (!(CheckPermission.CheckStaff(this)))
            {
                return RedirectToAction("Login", "Staff");
            }

            return RedirectToAction("Index", "Staff");
        }

        [Route("/Staff/Food/{IdBan}")]
        public IActionResult Food(String IdBan = null)
        {
            if (!(CheckPermission.CheckStaff(this)))
            {
                return RedirectToAction("Login", "Staff");
            }
            if (IdBan == null)
            {
                return RedirectToAction("Table", "Staff");
            }

            //Lấy thông tin tài khoản hiện tại
            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoan.Username;

            //Lấy thông tin nhân viên 
            NhanVienStoreContext nhanVienStoreContext = HttpContext.RequestServices.GetService(typeof(NhanVienStoreContext)) as NhanVienStoreContext;
            NhanVien nhanVien = nhanVienStoreContext.Find(new NhanVien() { IdTaiKhoan = taiKhoan.IdTaiKhoan, IdNhanVien = -1, Loai = -1, Sdt = null, Ten = null })[0] as NhanVien;
            ViewData["IdNhanVien"] = nhanVien.IdNhanVien;

            //Thông tin id bàn hiện tại
            ViewData["IdBan"] = IdBan;

            //Lấy thông tin cart hiện tại
            List<CartItem> cartAll = CartHelper.GetCartInCookie(this);
            if (cartAll == null) { cartAll = new List<CartItem>(); }
            List<CartItem> cart = new List<CartItem>();
            foreach(CartItem cartItem in cartAll)
            {
                if (cartItem.IdBan == Convert.ToInt32(IdBan))
                {
                    cart.Add(cartItem);
                }
            }
            ViewData["Cart"] = cart;

            //Basemodel list
            List<BaseModel> baseModels = null;

            //Lấy thông tin sản phẩm  hiện tại
            SanPhamStoreContext sanPhamStoreContext = HttpContext.RequestServices.GetService(typeof(SanPhamStoreContext)) as SanPhamStoreContext;
            baseModels = sanPhamStoreContext.GetAll();
            List<SanPham> sanphams = new List<SanPham>();
            foreach(BaseModel baseModel in baseModels)
            {
                sanphams.Add(baseModel as SanPham);
            }
            ViewData["Sanphams"] = sanphams;

            //Lấy thông tin khách hàng hiện tại
            KhachHangStoreContext khachHangStoreContext = HttpContext.RequestServices.GetService(typeof(KhachHangStoreContext)) as KhachHangStoreContext;
            baseModels = khachHangStoreContext.GetAll();
            List<KhachHang> khachhangs = new List<KhachHang>();
            foreach (BaseModel baseModel in baseModels)
            {
                khachhangs.Add(baseModel as KhachHang);
            }
            ViewData["Khachhangs"] = khachhangs;

            return View();
        }

        public IActionResult Table()
        {
            if (!(CheckPermission.CheckStaff(this)))
            {
                return RedirectToAction("Login", "Staff");
            }

            //Lấy thông tin tài khoản hiện tại
            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoan.Username;

            //Lấy danh sách bàn
            BanStoreContext modelStoreContext = HttpContext.RequestServices.GetService(typeof(BanStoreContext)) as BanStoreContext;
            List<BaseModel> baseModelBans = modelStoreContext.GetAll();
            List<Ban> bans = new List<Ban>();
            foreach (BaseModel baseModel in baseModelBans)
            {
                bans.Add(baseModel as Ban);
            }
            ViewData["Bans"] = bans;


            return View();
        }

        public IActionResult History()
        {
            if (!(CheckPermission.CheckStaff(this)))
            {
                return RedirectToAction("Login", "Staff");
            }
            //Lấy thông tin tài khoản hiện tại
            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoan.Username;
            return View();
        }

        public IActionResult Graph()
        {
            if (!(CheckPermission.CheckStaff(this)))
            {
                return RedirectToAction("Login", "Staff");
            }
            //Lấy thông tin tài khoản hiện tại
            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(this.HttpContext.Session);
            ViewData["Username"] = taiKhoan.Username;
            return View();
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
                            return RedirectToAction("Index", "Staff");
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
        
    }
}
