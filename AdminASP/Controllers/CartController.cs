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
    public class CartController : Controller
    {
        public String GetAll()
        {
            List<CartItem> cart = CartHelper.GetCartInCookie(this);
            if (cart == null) { cart = new List<CartItem>(); }

            return JsonConvert.SerializeObject(cart);
        }

        public String Add(FormCartAddInput input)
        {
            if (input.SoLuong <= 0) { input.SoLuong = 1; }

            List<CartItem> cart = CartHelper.GetCartInCookie(this);
            if (cart == null) { cart = new List<CartItem>(); }

            bool isInsideList = false;

            foreach (CartItem cartItem in cart)
            {
                if (cartItem.IdSanPham == input.IdSanPham && cartItem.IdBan == input.IdBan)
                {
                    cartItem.SoLuong += input.SoLuong;
                    isInsideList = true;
                    break;
                }
            }

            if (isInsideList == false)
            {
                cart.Add(new CartItem()
                {
                    IdBan = input.IdBan,
                    IdSanPham = input.IdSanPham,
                    SoLuong = input.SoLuong
                });
            }

            CartHelper.StoreCartInCookie(this, cart);

            return "true";
        }

        public String Edit(FormCartEditInput input)
        {
            if (input.SoLuong <= 0) { input.SoLuong = 1; }

            List<CartItem> cart = CartHelper.GetCartInCookie(this);
            if (cart == null) { cart = new List<CartItem>(); }

            List<CartItem> newcart = new List<CartItem>();

            foreach (CartItem cartItem in cart)
            {
                if (cartItem.IdSanPham != input.IdSanPham || cartItem.IdBan != input.IdBan)
                {
                    newcart.Add(cartItem);
                }
            }

            newcart.Add(new CartItem() 
            { 
                IdBan = input.IdBan,
                IdSanPham = input.IdSanPham,
                SoLuong = input.SoLuong
            });

            CartHelper.StoreCartInCookie(this, newcart);

            return "true";
        }

        public String Delete(FormCartDeleteInput input)
        {
            List<CartItem> cart = CartHelper.GetCartInCookie(this);
            if (cart == null) { cart = new List<CartItem>(); }

            List<CartItem> newcart = new List<CartItem>();

            foreach (CartItem cartItem in cart)
            {
                if (cartItem.IdSanPham != input.IdSanPham || cartItem.IdBan != input.IdBan)
                {
                    newcart.Add(cartItem);
                }
            }

            CartHelper.StoreCartInCookie(this, newcart);

            return "true";
        }

        public String DeleteAllBan(FormCartDeleteAllBan input)
        {
            int IdBan = input.IdBan;
            List<CartItem> cart = CartHelper.GetCartInCookie(this);
            if (cart == null) { cart = new List<CartItem>(); }

            List<CartItem> newcart = new List<CartItem>();

            foreach (CartItem cartItem in cart)
            {
                if (cartItem.IdBan != IdBan)
                {
                    newcart.Add(cartItem);
                }
            }

            CartHelper.StoreCartInCookie(this, newcart);

            return "true";
        }

        public String DeleteAll()
        {
            CartHelper.RemoveCartInCookie(this);
            return "true";
        }
    }
}
