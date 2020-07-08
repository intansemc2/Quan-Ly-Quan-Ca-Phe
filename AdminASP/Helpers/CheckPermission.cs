using AdminASP.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Helpers
{
    public static class CheckPermission
    {
        public static TaiKhoan AutoLoginAndGetTaiKhoan(Controller controller)
        {
            bool autologinResult = StoreLoginInfoHelper.AutoLogin(controller);
            if (autologinResult)
            {
                return StoreLoginInfoHelper.GetLoginInSession(controller.HttpContext.Session);
            }

            return null;
        }

        public static bool CheckAdmin(Controller controller)
        {
            TaiKhoan taiKhoan = CheckPermission.AutoLoginAndGetTaiKhoan(controller);
            return taiKhoan != null && taiKhoan.Type == TaiKhoan.TAI_KHOAN_ADMIN;
        }

        public static bool CheckUser(Controller controller)
        {
            TaiKhoan taiKhoan = CheckPermission.AutoLoginAndGetTaiKhoan(controller);
            return taiKhoan != null && 
                (taiKhoan.Type == TaiKhoan.TAI_KHOAN_ADMIN 
                || taiKhoan.Type == TaiKhoan.TAI_KHOAN_STAFF 
                || taiKhoan.Type == TaiKhoan.TAI_KHOAN_USER);
        }

        public static bool CheckStaff(Controller controller)
        {
            TaiKhoan taiKhoan = CheckPermission.AutoLoginAndGetTaiKhoan(controller);
            return taiKhoan != null && 
                (taiKhoan.Type == TaiKhoan.TAI_KHOAN_ADMIN 
                || taiKhoan.Type == TaiKhoan.TAI_KHOAN_STAFF);
        }

        public static bool CheckUnknown(Controller controller)
        {
            TaiKhoan taiKhoan = CheckPermission.AutoLoginAndGetTaiKhoan(controller);
            return taiKhoan != null && 
                (taiKhoan.Type != TaiKhoan.TAI_KHOAN_ADMIN 
                && taiKhoan.Type != TaiKhoan.TAI_KHOAN_STAFF 
                && taiKhoan.Type != TaiKhoan.TAI_KHOAN_USER);
        }
    }
}
