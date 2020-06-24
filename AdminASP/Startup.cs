using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminASP.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace AdminASP
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddControllersWithViews();
            services.AddMvc();

            //Phần này cho đọc ghi dữ liệu với database
            services.Add(new ServiceDescriptor(typeof(BanStoreContext), new BanStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(CthdStoreContext), new CthdStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(CtkmStoreContext), new CtkmStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(DatBanStoreContext), new DatBanStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(HoaDonStoreContext), new HoaDonStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(KhachHangStoreContext), new KhachHangStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(KhuyenMaiStoreContext), new KhuyenMaiStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(LoaiSanPhamStoreContext), new LoaiSanPhamStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(NhanVienStoreContext), new NhanVienStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(SanPhamStoreContext), new SanPhamStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            services.Add(new ServiceDescriptor(typeof(TaiKhoanStoreContext), new TaiKhoanStoreContext()
            {
                ConnectionString = Configuration.GetConnectionString("DefaultConnection")
            }));

            //Thêm để dùng được session
            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            //Thêm để dùng được session
            app.UseSession();

            //Cookie
            app.UseCookiePolicy();
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
