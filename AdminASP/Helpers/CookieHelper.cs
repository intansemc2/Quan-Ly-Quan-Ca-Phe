using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ubiety.Dns.Core;

namespace AdminASP.Helpers
{
    public static class CookieHelper
    {
        public static CookieOptions DEFAULT_COOKIES_OPTION = new CookieOptions
        {
            // Set the cookie to HTTP only which is good practice unless you really do need
            // to access it client side in scripts.
            HttpOnly = true,

            //Thời gian mà cookie hết hiệu lực, mặc định là trong 30 ngày 
            Expires = DateTime.Now.AddDays(30)
        };

        public static void SetObjectAsJson(this IResponseCookies cookies, string key, object value, CookieOptions cookieOptions = null)
        {
            if (cookieOptions == null)
            {
                cookieOptions = DEFAULT_COOKIES_OPTION;
            }

            JsonConvert.SerializeObject(value);
            cookies.Append(key, JsonConvert.SerializeObject(value), cookieOptions);
        }

        public static T GetObjectFromJson<T>(this IRequestCookieCollection cookiesCollections, string key)
        {
            var value = cookiesCollections[key];
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }

        public static void DeleteObject(this IResponseCookies cookies, string key)
        {
            cookies.Delete(key);
        }
    }
}
