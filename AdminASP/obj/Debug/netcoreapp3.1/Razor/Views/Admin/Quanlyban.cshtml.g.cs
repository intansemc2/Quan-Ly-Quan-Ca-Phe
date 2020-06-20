#pragma checksum "C:\Users\Love\Documents\Quan-Ly-Quan-Ca-Phe\AdminASP\Views\Admin\Quanlyban.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8483d39273c1ddd4c64610c0e2ab961442bbee0d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Admin_Quanlyban), @"mvc.1.0.view", @"/Views/Admin/Quanlyban.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8483d39273c1ddd4c64610c0e2ab961442bbee0d", @"/Views/Admin/Quanlyban.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"886770311aaefa50b4066170d01c4c7bc8ba61f9", @"/Views/_ViewImports.cshtml")]
    public class Views_Admin_Quanlyban : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "0", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("sb-nav-fixed"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!DOCTYPE html>\n<html lang=\"vi\">\n  ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8483d39273c1ddd4c64610c0e2ab961442bbee0d4037", async() => {
                WriteLiteral(@"
    <title>Quản lý bàn - Quản lý quán cà phê</title>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1, shrink-to-fit=no"">
    <!-- Optional Stylesheets-->
    <!-- Bootstrap CSS-->
    <link rel=""stylesheet"" href=""liblaries/bootstrap.min.css"">
    <!-- Custom JavaScript-->
    <link rel=""stylesheet"" href=""css/main.css"">
    <!-- DataTable-->
    <link rel=""stylesheet"" type=""text/css"" href=""liblaries/datatables.min.css"">
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8483d39273c1ddd4c64610c0e2ab961442bbee0d5496", async() => {
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
                <div class=""sb-nav-link-icon""><i class=""fas fa-users""></i></div>Quản lý khách hàng thành viên</a><a class=""nav-link active"" href=""quanl");
                WriteLiteral(@"yban.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-table""></i></div>Quản lý bàn và đặt bàn</a><a class=""nav-link"" href=""quanlyloaisanpham.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-beer""></i></div>Quản lý sản phẩm và loại sản phẩm</a><a class=""nav-link"" href=""quanlykhuyenmai.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-credit-card""></i></div>Quản lý khuyến mãi và chi tiết khuyến mãi</a>
              <div class=""sb-sidenav-menu-heading"">Thông tin</div><a class=""nav-link"" href=""thongtinungdung.html"">
                <div class=""sb-nav-link-icon""><i class=""fas fa-info""></i></div>Thông tin ứng dụng</a><a class=""nav-link"" href=""huongdansudung.html"">
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
            <!-- Model thêm bàn-->
            <div class=""modal fade"" id=""modelThemBan"" tabindex=""-1"" role=""dialog"" aria-labelledby=""Model aria-labelledby"" aria-hidden=""true"">
              <div class=""modal-dialog modal-dialog-centered"" role=""document"">
                <div class=""modal-content"">
                  <div class=""modal-header"">
                    <h5 class=""modal-title"">Thêm bàn</h5>
                    <button class=""close"" type=""button"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">×</span></button>
                  </div>
                  <div class=""modal-body"">
                    <div id=""themBanAlerts"">
                      <!-- Các alert của phần này-->
                    </div>
                    <input class=""id_ban"" type=""hidden"">
                 ");
                WriteLiteral(@"   <div class=""form-group"">
                      <label class=""small mb-1"" for=""themBanTen"">Tên</label>
                      <input class=""form-control py-4 username ten"" id=""themBanTen"" type=""text"" placeholder=""Nhập Tên"">
                    </div>
                    <div class=""form-group"">
                      <label class=""small mb-1"" for=""themBanTrangThai"">Trạng thái</label>
                      <select class=""form-control trang_thai"" id=""themBanTrangThai"">
                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8483d39273c1ddd4c64610c0e2ab961442bbee0d10699", async() => {
                    WriteLiteral("Trạng thái                    ");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                      </select>
                    </div>
                  </div>
                  <div class=""modal-footer"">
                    <input class=""btn btn-outline-primary"" id=""themBanConfirm"" type=""button"" value=""Thêm Bàn"">
                    <input class=""btn btn-outline-secondary"" id=""themBanReset"" type=""reset"" value=""Cài lại"">
                  </div>
                </div>
              </div>
            </div>
            <!-- Model sửa bàn-->
            <div class=""modal fade"" id=""modelSuaBan"" tabindex=""-1"" role=""dialog"" aria-labelledby=""Model aria-labelledby"" aria-hidden=""true"">
              <div class=""modal-dialog modal-dialog-centered"" role=""document"">
                <div class=""modal-content"">
                  <div class=""modal-header"">
                    <h5 class=""modal-title"">Sửa bàn</h5>
                    <button class=""close"" type=""button"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">×</span></button>
                  </div>
                  <div");
                WriteLiteral(@" class=""modal-body"">
                    <div id=""suaBanAlerts"">
                      <!-- Các alert của phần này-->
                    </div>
                    <input class=""id_ban"" type=""hidden"">
                    <div class=""form-group"">
                      <label class=""small mb-1"" for=""suaBanTen"">Tên</label>
                      <input class=""form-control py-4 username ten"" id=""suaBanTen"" type=""text"" placeholder=""Nhập Tên"">
                    </div>
                    <div class=""form-group"">
                      <label class=""small mb-1"" for=""suaBanTrangThai"">Trạng thái</label>
                      <select class=""form-control trang_thai"" id=""suaBanTrangThai"">
                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8483d39273c1ddd4c64610c0e2ab961442bbee0d13797", async() => {
                    WriteLiteral("Trạng thái  ");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                      </select>
                    </div>
                  </div>
                  <div class=""modal-footer"">
                    <input class=""btn btn-outline-primary"" id=""suaBanConfirm"" type=""button"" value=""Sửa Bàn"">
                    <input class=""btn btn-outline-secondary"" id=""suaBanReset"" type=""reset"" value=""Cài lại"">
                  </div>
                </div>
              </div>
            </div>
            <!-- Model chi tiết bàn-->
            <div class=""modal fade"" id=""modelChiTietBan"" tabindex=""-1"" role=""dialog"" aria-labelledby=""Model aria-labelledby"" aria-hidden=""true"">
              <div class=""modal-dialog modal-xl modal-dialog-centered"" role=""document"">
                <div class=""modal-content"">
                  <div class=""modal-header"">
                    <h5 class=""modal-title"">Chi tiết đặt bàn <span id=""banTitleInformation""></span></h5>
                    <button class=""close"" type=""button"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">×<");
                WriteLiteral(@"/span></button>
                  </div>
                  <div class=""modal-body"">
                    <!-- Thông tin nội dung trang-->
                    <div class=""card mb-4"">
                      <div class=""card-header""><i class=""fas fa-wrench mr-1""></i>Các thao tác  được hỗ trợ thực hiện</div>
                      <div class=""card-body"">
                        <button class=""btn btn-outline-primary mr-3"" id=""themChiTietDatBan"" type=""button"" data-toggle=""modal"" data-target=""#modelThemChiTietDatBan"" modify=""ThemChiTietDatBan"">Thêm chi tiết bàn</button>
                        <div class=""btn-group mr-3"" role=""group"" aria-label=""Các nút chức năng xóa"">
                          <button class=""btn btn-outline-secondary"" id=""danhDauTatCaChiTietDatBan"" type=""button"">Đánh dấu tất cả</button>
                          <button class=""btn btn-outline-secondary"" id=""boDanhDauTatCaChiTietDatBan"" type=""button"">Bỏ đánh dấu tất cả</button>
                        </div>
                        <div class=""btn-gro");
                WriteLiteral(@"up mr-3"" role=""group"" aria-label=""Các nút chức năng xóa"">
                          <button class=""btn btn-outline-danger"" id=""xoaDanhDauChiTietDatBan"" type=""button"">Xóa đánh dấu</button>
                          <button class=""btn btn-outline-danger"" id=""xoaTatCaChiTietDatBan"" type=""button"">Xóa tất cả</button>
                        </div>
                        <button class=""btn btn-outline-info mr-3"" id=""lamMoiChiTietDatBan"" type=""button"">Làm mới</button>
                      </div>
                    </div>
                    <div class=""card mb-4"">
                      <div class=""card-header""><i class=""fas fa-table mr-1""></i>Bảng quản lý chi tiết bàn</div>
                      <div class=""card-body"">
                        <div class=""table-responsive"" id=""tableQuanLyChiTietDatBanContainer"">
                          <table class=""table table-bordered table-striped table-hover"" id=""tableQuanLyChiTietDatBan"" width=""100%"" cellspacing=""0"">
                            <thead>
                     ");
                WriteLiteral(@"         <tr>
                                <th>ID bàn</th>
                                <th>Username</th>
                                <th>Thời gian lập</th>
                                <th>Thời gian nhận</th>
                                <th>Ghi chú</th>
                                <th>Thao tác </th>
                              </tr>
                            </thead>
                            <tfoot>
                              <tr>
                                <th>ID bàn</th>
                                <th>Username</th>
                                <th>Thời gian lập</th>
                                <th>Thời gian nhận</th>
                                <th>Ghi chú</th>
                                <th>Thao tác </th>
                              </tr>
                            </tfoot>
                            <tbody>
                              <!-- Nội dung bảng-->
                            </tbody>
                          </table>
               ");
                WriteLiteral(@"         </div>
                      </div>
                    </div>
                    <!-- Model thêm hoá đơn-->
                    <div class=""modal fade"" id=""modelThemChiTietDatBan"" tabindex=""-1"" role=""dialog"" aria-labelledby=""Model aria-labelledby"" aria-hidden=""true"">
                      <div class=""modal-dialog modal-dialog-centered"" role=""document"">
                        <div class=""modal-content"">
                          <div class=""modal-header"">
                            <h5 class=""modal-title"">Thêm chi tiết hoá đơn</h5>
                            <button class=""close"" type=""button"" aria-label=""Close""><span aria-hidden=""true"">×</span></button>
                          </div>
                          <div class=""modal-body"">
                            <div id=""themChiTietDatBanAlerts"">
                              <!-- Các alert của phần này-->
                            </div>
                            <div class=""form-group"">
                              <label class=""small mb");
                WriteLiteral(@"-1"" for=""themChiTietDatBanIDBan"">Bàn</label>
                              <input class=""form-control py-1 px-2 d-flex align-item-center id_ban"" id=""themChiTietDatBanIDBan"" type=""text"" placeholder=""Bàn hiện tại"" readonly=""readonly"">
                            </div>
                            <div class=""form-group"">
                              <label class=""small mb-1"" for=""themChiTietDatBanUsername"">Username</label>
                              <select class=""form-control username"" id=""themChiTietDatBanUsername""></select>
                            </div>
                            <div class=""form-row"">
                              <div class=""col-md-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""themChiTietDatBanNgayThangLap"">Ngày tháng lập </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_lap"" id=""themChiTietDatBanNgayThangLap"" type=""date"" placeholder=""Nh");
                WriteLiteral(@"ập thời gian lập"">
                                </div>
                              </div>
                              <div class=""col-md-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""themChiTietDatBanThoiGianLap"">Thời gian lập </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_lap"" id=""themChiTietDatBanThoiGianLap"" type=""time"" step=""1"" placeholder=""Nhập thời gian lập"">
                                </div>
                              </div>
                              <div class=""col-md-2"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""themChiTietDatBanCurrentTimeLap"">&nbsp;</label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center btn btn-outline-info thoi_gian_lap"" id=""themChiTietDatBanCurrentTimeLap"" type=""button"" value=""Lấy"">
      ");
                WriteLiteral(@"                          </div>
                              </div>
                            </div>
                            <div class=""form-row"">
                              <div class=""col-md-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""themChiTietDatBanNgayThangNhan"">Ngày tháng nhận </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_nhan"" id=""themChiTietDatBanNgayThangNhan"" type=""date"" placeholder=""Nhập thời gian nhận "">
                                </div>
                              </div>
                              <div class=""col-md-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""themChiTietDatBanThoiGianNhan"">Thời gian nhận </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_nhan"" id=""themChiTietDatBanT");
                WriteLiteral(@"hoiGianNhan"" type=""time"" step=""1"" placeholder=""Nhập thời gian nhận"">
                                </div>
                              </div>
                              <div class=""col-md-2"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""themChiTietDatBanCurrentTimeNhan"">&nbsp;</label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center btn btn-outline-info thoi_gian_nhan"" id=""themChiTietDatBanCurrentTimeNhan"" type=""button"" value=""Lấy"">
                                </div>
                              </div>
                            </div>
                            <div class=""form-group"">
                              <label class=""small mb-1"" for=""themChiTietDatBanGhiChu"">Ghi chú</label>
                              <input class=""form-control py-4 ghi_chu"" id=""themChiTietDatBanGhiChu"" type=""text"" placeholder=""Ghi chú"">
                            </div>
                     ");
                WriteLiteral(@"     </div>
                          <div class=""modal-footer"">
                            <input class=""btn btn-outline-primary"" id=""themChiTietDatBanConfirm"" type=""button"" value=""Thêm Hoá đơn"">
                            <input class=""btn btn-outline-secondary"" id=""themChiTietDatBanReset"" type=""reset"" value=""Cài lại"">
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Model sửa hoá đơn-->
                    <div class=""modal fade"" id=""modelSuaChiTietDatBan"" tabindex=""-1"" role=""dialog"" aria-labelledby=""Model aria-labelledby"" aria-hidden=""true"">
                      <div class=""modal-dialog modal-dialog-centered"" role=""document"">
                        <div class=""modal-content"">
                          <div class=""modal-header"">
                            <h5 class=""modal-title"">Sửa hoá đơn</h5>
                            <button class=""close"" type=""button"" aria-label=""Close""><span aria-hidden=""true"">×</sp");
                WriteLiteral(@"an></button>
                          </div>
                          <div class=""modal-body"">
                            <div id=""suaChiTietDatBanAlerts"">
                              <!-- Các alert của phần này-->
                            </div>
                            <div class=""form-group"">
                              <label class=""small mb-1"" for=""suaChiTietDatBanIDBan"">Bàn</label>
                              <input class=""form-control py-1 px-2 d-flex align-item-center id_ban"" id=""suaChiTietDatBanIDBan"" type=""text"" placeholder=""Bàn hiện tại"" readonly=""readonly"">
                            </div>
                            <div class=""form-group"">
                              <label class=""small mb-1"" for=""suaChiTietDatBanUsername"">Username</label>
                              <select class=""form-control username"" id=""suaChiTietDatBanUsername""></select>
                            </div>
                            <div class=""form-row"">
                              <div class=""col-m");
                WriteLiteral(@"d-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""suaChiTietDatBanNgayThangLap"">Ngày tháng lập </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_lap"" id=""suaChiTietDatBanNgayThangLap"" type=""date"" placeholder=""Nhập thời gian lập"">
                                </div>
                              </div>
                              <div class=""col-md-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""suaChiTietDatBanThoiGianLap"">Thời gian lập </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_lap"" id=""suaChiTietDatBanThoiGianLap"" type=""time"" step=""1"" placeholder=""Nhập thời gian lập"">
                                </div>
                              </div>
                              <div class=""col-md-2"">
                    ");
                WriteLiteral(@"            <div class=""form-group"">
                                  <label class=""small mb-1"" for=""suaChiTietDatBanCurrentTimeLap"">&nbsp;</label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center btn btn-outline-info thoi_gian_lap"" id=""suaChiTietDatBanCurrentTimeLap"" type=""button"" value=""Lấy"">
                                </div>
                              </div>
                            </div>
                            <div class=""form-row"">
                              <div class=""col-md-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""suaChiTietDatBanNgayThangNhan"">Ngày tháng nhận </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_nhan"" id=""suaChiTietDatBanNgayThangNhan"" type=""date"" placeholder=""Nhập thời gian nhận "">
                                </div>
                              </div>
                ");
                WriteLiteral(@"              <div class=""col-md-5"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""suaChiTietDatBanThoiGianNhan"">Thời gian nhận </label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center thoi_gian_nhan"" id=""suaChiTietDatBanThoiGianNhan"" type=""time"" step=""1"" placeholder=""Nhập thời gian nhận"">
                                </div>
                              </div>
                              <div class=""col-md-2"">
                                <div class=""form-group"">
                                  <label class=""small mb-1"" for=""suaChiTietDatBanCurrentTimeNhan"">&nbsp;</label>
                                  <input class=""form-control py-1 px-2 d-flex align-item-center btn btn-outline-info thoi_gian_nhan"" id=""suaChiTietDatBanCurrentTimeNhan"" type=""button"" value=""Lấy"">
                                </div>
                              </div>
                            </div>
  ");
                WriteLiteral(@"                          <div class=""form-group"">
                              <label class=""small mb-1"" for=""suaChiTietDatBanGhiChu"">Ghi chú</label>
                              <input class=""form-control py-4 ghi_chu"" id=""suaChiTietDatBanGhiChu"" type=""text"" placeholder=""Ghi chú"">
                            </div>
                          </div>
                          <div class=""modal-footer"">
                            <input class=""btn btn-outline-primary"" id=""suaChiTietDatBanConfirm"" type=""button"" value=""Sửa Hoá đơn"">
                            <input class=""btn btn-outline-secondary"" id=""suaChiTietDatBanReset"" type=""reset"" value=""Cài lại"">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Thông tin nội dung trang-->
            <h1 class=""mt-4"">Quản lý bàn</h1>
            <ol class=""breadcrumb mb-4"">
              <li cl");
                WriteLiteral(@"ass=""breadcrumb-item""><a href=""tongquat.html"">Tổng quát</a></li>
              <li class=""breadcrumb-item active"">Quản lý bàn</li>
            </ol>
            <div class=""card mb-4"">
              <div class=""card-header""><i class=""fas fa-wrench mr-1""></i>Các thao tác  được hỗ trợ thực hiện</div>
              <div class=""card-body"">
                <button class=""btn btn-outline-primary mr-3"" id=""themBan"" type=""button"" data-toggle=""modal"" data-target=""#modelThemBan"" modify=""ThemBan"">Thêm bàn</button>
                <div class=""btn-group mr-3"" role=""group"" aria-label=""Các nút chức năng xóa"">
                  <button class=""btn btn-outline-secondary"" id=""danhDauTatCa"" type=""button"">Đánh dấu tất cả</button>
                  <button class=""btn btn-outline-secondary"" id=""boDanhDauTatCa"" type=""button"">Bỏ đánh dấu tất cả</button>
                </div>
                <div class=""btn-group mr-3"" role=""group"" aria-label=""Các nút chức năng xóa"">
                  <button class=""btn btn-outline-danger"" id=""xoaDan");
                WriteLiteral(@"hDau"" type=""button"">Xóa đánh dấu</button>
                  <button class=""btn btn-outline-danger"" id=""xoaTatCa"" type=""button"">Xóa tất cả</button>
                </div>
                <button class=""btn btn-outline-info mr-3"" id=""lamMoi"" type=""button"">Làm mới</button>
              </div>
            </div>
            <div class=""card mb-4"">
              <div class=""card-header""><i class=""fas fa-table mr-1""></i>Bảng quản lý bàn</div>
              <div class=""card-body"">
                <div class=""table-responsive"" id=""tableQuanLyBanContainer"">
                  <table class=""table table-bordered table-striped table-hover"" id=""tableQuanLyBan"" width=""100%"" cellspacing=""0"">
                    <thead>
                      <tr>
                        <th>ID bàn                            </th>
                        <th>Tên bàn</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tfoot>
   ");
                WriteLiteral(@"                   <tr>
                        <th>ID bàn                            </th>
                        <th>Tên bàn</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <!-- Nội dung bảng-->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
        <!-- Footer của content-->
        <footer class=""py-4 bg-light mt-auto"">
          <div class=""container-fluid"">
            <div class=""d-flex align-items-center justify-content-between small"">
              <div class=""text-muted"">Nhóm framework số 1</div>
              <div><a href=""#"">Thông tin ứng dụng</a>                                ·<a href=""#""> Hướng dẫn sử dụng </a></div>
            </div>
          </div>
        </footer>
      </div>
      <!-- End Content-->
    </div>
    <!-- Optional JavaSc");
                WriteLiteral(@"ript-->
    <!-- jQuery first, then Popper.js, then Bootstrap JS-->
    <script type=""text/javascript"" src=""liblaries/jquery-3.4.1.min.js""></script>
    <script type=""text/javascript"" src=""liblaries/bootstrap.bundle.min.js""></script>
    <!-- Fontawesome-->
    <script type=""text/javascript"" src=""liblaries/fontawesome-all.min.js""></script>
    <!-- Custom JavaScript-->
    <script type=""text/javascript"" src=""js/main.js""></script>
    <!-- Datatable Javascript-->
    <script type=""text/javascript"" src=""liblaries/datatables.min.js""></script>
    <!-- Custom JavaScript-->
    <script type=""text/javascript"" src=""js/custom-toggle-button.js""></script>
    <script type=""text/javascript"" src=""js/custom-alert.js""></script>
    <script type=""text/javascript"" src=""js/convert-thoi-gian.js""></script>
    <script type=""text/javascript"" src=""js/quan-ly-chi-tiet-dat-ban.js""></script>
    <script type=""text/javascript"" src=""js/quan-ly-ban.js"">   </script>
  ");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
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
