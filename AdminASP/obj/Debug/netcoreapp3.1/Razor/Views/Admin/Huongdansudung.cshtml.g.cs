#pragma checksum "C:\Users\Love\Documents\Quan-Ly-Quan-Ca-Phe\AdminASP\Views\Admin\Huongdansudung.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c8880b4d8c5c5591a098526df8951675d9d82368"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Admin_Huongdansudung), @"mvc.1.0.view", @"/Views/Admin/Huongdansudung.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\Love\Documents\Quan-Ly-Quan-Ca-Phe\AdminASP\Views\_ViewImports.cshtml"
using AdminASP;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Love\Documents\Quan-Ly-Quan-Ca-Phe\AdminASP\Views\_ViewImports.cshtml"
using AdminASP.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c8880b4d8c5c5591a098526df8951675d9d82368", @"/Views/Admin/Huongdansudung.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"886770311aaefa50b4066170d01c4c7bc8ba61f9", @"/Views/_ViewImports.cshtml")]
    public class Views_Admin_Huongdansudung : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("sb-nav-fixed"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!DOCTYPE html>\n<html lang=\"vi\">\n  ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c8880b4d8c5c5591a098526df8951675d9d823683639", async() => {
                WriteLiteral(@"
    <title>Hướng dẫn sử dụng - Quản lý quán cà phê</title>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1, shrink-to-fit=no"">
    <!-- Optional Stylesheets-->
    <!-- Bootstrap CSS-->
    <link rel=""stylesheet"" href=""liblaries/bootstrap.min.css"">
    <!-- Custom JavaScript-->
    <link rel=""stylesheet"" href=""css/main.css"">
    <!-- DataTable-->
  ");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\n  ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c8880b4d8c5c5591a098526df8951675d9d823685018", async() => {
                WriteLiteral(@"
    <!-- Start Navbar chính-->
    <nav class=""sb-topnav navbar navbar-expand navbar-dark bg-dark""><a class=""navbar-brand"" href=""tongquat.html"">Quản lý quán cà phê</a>
      <button class=""btn btn-link btn-sm order-1 order-lg-0"" id=""sidebarToggle""><i class=""fas fa-bars""></i></button>
      <!-- Navbar-->
      <ul class=""navbar-nav ml-auto"">
        <li class=""nav-item dropdown""><a class=""nav-link dropdown-toggle"" id=""userDropdown"" href=""#"" role=""button"" data-toggle=""dropdown"" aria-haspopup=""true"" aria-expanded=""false""><i class=""fas fa-user fa-fw""></i>ADMIN</a>
          <!-- Thông tin tài khoản-->
          <div class=""dropdown-menu dropdown-menu-right"" aria-labelledby=""userDropdown""><a class=""dropdown-item"" href=""#"">Thông tin tài khoản</a><a class=""dropdown-item"" href=""login.html"">Đăng xuất</a></div>
        </li>
      </ul>
    </nav>
    <!-- End Navbar chính-->
    <!-- Start Sidebar chính-->
    <div id=""layoutSidenav"">
      <div id=""layoutSidenav_nav"">
        <nav class=""sb-sidenav accordion sb-sid");
                WriteLiteral(@"enav-dark"" id=""sidenavAccordion"">
          <!-- Menu của sidebar-->
          <div class=""sb-sidenav-menu"">
            <div class=""nav"">
              <div class=""sb-sidenav-menu-heading"">Nội dung chính</div><a class=""nav-link"" href=""tongquat.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-tachometer-alt""></i></div>Tổng quan</a><a class=""nav-link"" href=""quanlytaikhoan.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-user""></i></div>Quản lý tài khoản</a><a class=""nav-link"" href=""quanlynhanvien.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-users""></i></div>Quản lý nhân viên</a><a class=""nav-link"" href=""quanlyhoadon.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-shopping-cart""></i></div>Quản lý hóa đơn và chi tiết hóa đơn</a><a class=""nav-link"" href=""quanlykhachhang.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-users""></i></div>Quản lý khách hàng thành viên</a><a class=""nav-link"" href=""quanlyban.ht");
                WriteLiteral(@"ml"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-table""></i></div>Quản lý bàn và đặt bàn</a><a class=""nav-link"" href=""quanlyloaisanpham.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-beer""></i></div>Quản lý sản phẩm và loại sản phẩm</a><a class=""nav-link"" href=""quanlykhuyenmai.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-credit-card""></i></div>Quản lý khuyến mãi và chi tiết khuyến mãi</a>
              <div class=""sb-sidenav-menu-heading"">Thông tin</div><a class=""nav-link"" href=""thongtinungdung.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-info""></i></div>Thông tin ứng dụng</a><a class=""nav-link active"" href=""huongdansudung.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-info-circle""></i></div>Hướng dẫn sử dụng</a>
            </div>
          </div>
          <!-- Thông tin người dùng đăng nhập-->
          <div class=""sb-sidenav-footer"">
            <div class=""small"">Bạn đã đăng nhập bằng tài kh");
                WriteLiteral(@"oản:</div>ADMIN
          </div>
        </nav>
      </div>
      <!-- End Sidebar chính-->
      <!-- Start Content-->
      <div id=""layoutSidenav_content"">
        <main>
          <div class=""container-fluid"">
            <!-- Thông tin nội dung trang-->
            <h1 class=""mt-4"">Hướng dẫn sử dụng</h1>
            <ol class=""breadcrumb mb-4"">
              <li class=""breadcrumb-item""><a href=""thongtinungdung.html"">Thông tin</a></li>
              <li class=""breadcrumb-item active"">Hướng dẫn sử dụng</li>
            </ol>
            <div class=""card mb-4"">
              <div class=""card-header""><i class=""fas fa-wrench mr-1""></i>Các thao tác  được hỗ trợ thực hiện</div>
              <div class=""card-body""></div>
            </div>
          </div>
        </main>
        <!-- Footer của content-->
        <footer class=""py-4 bg-light mt-auto"">
          <div class=""container-fluid"">
            <div class=""d-flex align-items-center justify-content-between small"">
              <div class=""text-muted"">");
                WriteLiteral(@"Nhóm framework số 1</div>
              <div><a href=""#"">Thông tin ứng dụng</a>                                ·<a href=""#""> Hướng dẫn sử dụng </a></div>
            </div>
          </div>
        </footer>
      </div>
      <!-- End Content-->
    </div>
    <!-- Optional JavaScript-->
    <!-- jQuery first, then Popper.js, then Bootstrap JS-->
    <script type=""text/javascript"" src=""liblaries/jquery-3.4.1.min.js""></script>
    <script type=""text/javascript"" src=""liblaries/bootstrap.bundle.min.js""></script>
    <!-- Fontawesome-->
    <script type=""text/javascript"" src=""liblaries/fontawesome-all.min.js""></script>
    <!-- Custom JavaScript-->
    <script type=""text/javascript"" src=""js/main.js""></script>
    <!-- Datatable Javascript-->
    <!-- Custom JavaScript-->
  ");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\n</html>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
