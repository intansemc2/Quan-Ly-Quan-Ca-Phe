using AdminASP.Helpers;
using AdminASP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminASP.Models
{
    public static class CartHelper
    {
        public static String SESSION_CART_KEY = "quanlyquancaphe_cart_session";
        public static String COOKIES_CART_KEY = "quanlyquancaphe_cart_cookies";

        public static void StoreCartInSession(this ISession session, List<CartItem> cart)
        {
            SessionHelper.SetObjectAsJson(session, SESSION_CART_KEY, cart);
        }

        public static void StoreCartInCookie(this IResponseCookies cookies, List<CartItem> cart)
        {
            CookieHelper.SetObjectAsJson(cookies, COOKIES_CART_KEY, cart);
        }

        public static List<CartItem> GetCartInSession(this ISession session)
        {
            return SessionHelper.GetObjectFromJson<List<CartItem>>(session, SESSION_CART_KEY);
        }

        public static List<CartItem> GetCartInCookie(this IRequestCookieCollection cookiesCollections)
        {
            return CookieHelper.GetObjectFromJson<List<CartItem>>(cookiesCollections, COOKIES_CART_KEY);
        }

        public static void RemoveCartInSession(this ISession session)
        {
            SessionHelper.DeleteObject(session, SESSION_CART_KEY);
        }

        public static void RemoveCartInCookie(this IResponseCookies cookies)
        {
            CookieHelper.DeleteObject(cookies, COOKIES_CART_KEY);
        }

        //API with Controller

        public static void StoreCartInSession(Controller controller, List<CartItem> cart)
        {
            CartHelper.StoreCartInSession(controller.HttpContext.Session, cart);
        }

        public static void StoreCartInCookie(Controller controller, List<CartItem> cart)
        {
            CartHelper.StoreCartInCookie(controller.Response.Cookies, cart);
        }

        public static List<CartItem> GetCartInSession(Controller controller)
        {
            return CartHelper.GetCartInSession(controller.HttpContext.Session);
        }

        public static List<CartItem> GetCartInCookie(Controller controller)
        {
            return CartHelper.GetCartInCookie(controller.HttpContext.Request.Cookies);
        }

        public static void RemoveCartInSession(Controller controller)
        {
            CartHelper.RemoveCartInSession(controller.HttpContext.Session);
        }

        public static void RemoveCartInCookie(Controller controller)
        {
            CartHelper.RemoveCartInCookie(controller.Response.Cookies);
        }

        //Session to Cookie
        public static void SessionToCookie(Controller controller)
        {
            CartHelper.StoreCartInCookie(controller, CartHelper.GetCartInSession(controller));
        }

        //Cookie to Session
        public static void CookieToSession(Controller controller)
        {
            CartHelper.StoreCartInSession(controller, CartHelper.GetCartInCookie(controller));
        }

        //Check Item Session
        public static CartItem GetItemSession(Controller controller, int IdSanPham, int IdBan)
        {
            List<CartItem> cart = CartHelper.GetCartInSession(controller);
            if (cart == null) { cart = new List<CartItem>(); }
            foreach (CartItem item in cart)
            {
                if (item.IdSanPham == IdSanPham && item.IdBan == IdBan)
                {
                    return item;
                }
            }
            return null;
        }

        //Check Item Cookie
        public static CartItem GetItemCookie(Controller controller, int IdSanPham, int IdBan)
        {
            List<CartItem> cart = CartHelper.GetCartInCookie(controller);
            if (cart == null) { cart = new List<CartItem>(); }

            foreach (CartItem item in cart)
            {
                if (item.IdSanPham == IdSanPham && item.IdBan == IdBan) 
                {
                    return item;
                }
            }
            return null;
        }

    }
}