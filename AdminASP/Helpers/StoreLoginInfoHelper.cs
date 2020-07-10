using AdminASP.Helpers;
using AdminASP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Crypto.Engines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public static class StoreLoginInfoHelper
    {
        public static String SESSION_TAIKHOAN_KEY = "quanlyquancaphe_taikhoanlogin_session";
        public static String COOKIES_TAIKHOAN_KEY = "quanlyquancaphe_taikhoanlogin_cookies";

        public static bool CheckLoginInSession(Controller controller)
        {
            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInSession(controller.HttpContext.Session);
            TaiKhoanStoreContext taiKhoanStoreContext = controller.HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            return taiKhoanStoreContext.CheckLogin(taiKhoan, true);
        }

        public static bool CheckLoginInCookie(Controller controller)
        {
            TaiKhoan taiKhoan = StoreLoginInfoHelper.GetLoginInCookie(controller.HttpContext.Request.Cookies);
            TaiKhoanStoreContext taiKhoanStoreContext = controller.HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;
            return taiKhoanStoreContext.CheckLogin(taiKhoan, true);
        }

        public static bool AutoLogin(Controller controller)
        {
            TaiKhoan taiKhoanSession = StoreLoginInfoHelper.GetLoginInSession(controller.HttpContext.Session);
            TaiKhoan taiKhoanCookie = StoreLoginInfoHelper.GetLoginInCookie(controller.HttpContext.Request.Cookies);
            TaiKhoanStoreContext taiKhoanStoreContext = controller.HttpContext.RequestServices.GetService(typeof(TaiKhoanStoreContext)) as TaiKhoanStoreContext;

            bool checkTaiKhoanSession = false;
            bool checkTaiKhoanCookie = false;

            if (taiKhoanSession != null)
            {
                checkTaiKhoanSession = taiKhoanStoreContext.CheckLogin(taiKhoanSession);
            }

            if (taiKhoanCookie != null)
            {
                checkTaiKhoanCookie = taiKhoanStoreContext.CheckLogin(taiKhoanCookie);
            }

            if (checkTaiKhoanSession && checkTaiKhoanCookie == false || checkTaiKhoanSession && checkTaiKhoanCookie)
            {
                StoreLoginInfoHelper.StoreLoginInCookie(controller.Response.Cookies, taiKhoanSession);
                return true;
            }
            else if (checkTaiKhoanSession == false && checkTaiKhoanCookie)
            {
                StoreLoginInfoHelper.StoreLoginInSession(controller.HttpContext.Session, taiKhoanCookie);
                return true;
            }
            else
            {
                StoreLoginInfoHelper.RemoveLoginInSession(controller.HttpContext.Session);
                StoreLoginInfoHelper.RemoveLoginInCookie(controller.Response.Cookies);
            }

            return false;
        }

        public static void StoreLoginInSession(this ISession session, TaiKhoan taiKhoan)
        {
            SessionHelper.SetObjectAsJson(session, SESSION_TAIKHOAN_KEY, taiKhoan);
        }

        public static void StoreLoginInCookie(this IResponseCookies cookies, TaiKhoan taiKhoan)
        {
            CookieHelper.SetObjectAsJson(cookies, COOKIES_TAIKHOAN_KEY, taiKhoan);
        }

        public static TaiKhoan GetLoginInSession(this ISession session)
        {
            return SessionHelper.GetObjectFromJson<TaiKhoan>(session, SESSION_TAIKHOAN_KEY);
        }

        public static TaiKhoan GetLoginInCookie(this IRequestCookieCollection cookiesCollections)
        {
            return CookieHelper.GetObjectFromJson<TaiKhoan>(cookiesCollections, COOKIES_TAIKHOAN_KEY);
        }

        public static void RemoveLoginInSession(this ISession session)
        {
            SessionHelper.DeleteObject(session, SESSION_TAIKHOAN_KEY);
        }

        public static void RemoveLoginInCookie(this IResponseCookies cookies)
        {
            CookieHelper.DeleteObject(cookies, COOKIES_TAIKHOAN_KEY);
        }
    }
}
