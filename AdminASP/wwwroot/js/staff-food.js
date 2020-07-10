$(document).ready(function () {
    //Sự kiện 

    //Thêm sản phẩm
    $("#themSanPhamConfirm").click(function () {
        let IdSanPham = $("#themSanPhamIdSanPham").val();
        let SoLuong = $("#themSanPhamSoLuong").val();
        let IdBan = $("#IdBan").attr("IdBan");
        $.post("/Cart/Add", { IdSanPham: IdSanPham, IdBan: IdBan, SoLuong: SoLuong }, function (data) {
            refreshPage();
        });
        $("#modelThemSanPham").find("button.close").trigger("click");
    });

    //Xóa tất cả
    $("#xoaTatCa").click(function () {
        let IdBan = $("#IdBan").attr("IdBan");
        $.post("/Cart/DeleteAllBan", { IdBan: IdBan }, function (data) {
            //Thành công
            $(`.danhsach-sanpham`).empty();
            //Tính toán tiền hóa đơn
            updateCartMoney();
        });
    });

    $("#lamMoi").click(function () {
        refreshPage();
    });

    //Chọn khách hàng 
    $("#selectKhachHang").change(function () {
        let IdKhachHang = $(this).val();
        if (IdKhachHang == "") {
            resetSelectKhachHang();
        }
        else {
            resetSelectKhachHang();

            $("#selectKhachHangDiemDoi").removeClass("d-none");
            let DiemTichLuy = $("#selectKhachHang").find(`[value="${IdKhachHang}"]`).attr("DiemTichLuy");
            DiemTichLuy = parseInt(DiemTichLuy);
            $("#selectKhachHangDiemDoi").find("#soDiemDoi").attr("max", DiemTichLuy);
            $("#selectKhachHangDiemDoi").find("#soDiemDoi").attr("value", DiemTichLuy);
            $("#selectKhachHangDiemDoi").find("#soDiemDoi").val(DiemTichLuy);
        }

        //Tính toán tiền hóa đơn
        updateCartMoney();
    });

    $("#resetKhachHangInfo").click(function () {
        //Reset data
        $("#soDiemDoi").val($("#soDiemDoi").attr("value"));
        $("#tyGia").val($("#tyGia").attr("value"));
        $("#tichLuy").val($("#tichLuy").attr("value"));
        //Tính toán tiền hóa đơn
        updateCartMoney();
    });

    //Thanh toán 
    $("#thanhToan").click(function () {
        //Thêm hóa đơn mới
        let dataHDSend = {
            IdKhachHang: $("#selectKhachHang").val(),
            IdBan: $("#IdBan").attr("IdBan"),
            IdNhanVien: $("#IdBan").attr("IdNhanVien"),
            ThoiGianLap: convertDateTimeToString(new Date()),
            ThoiGianThanhToan: convertDateTimeToString(new Date()),
            PhanTramTichLuy: $("#tichLuy").val(),
            SoLuongDiemDoi: $("#soDiemDoi").val(),
            TyGiaDiemDoi: $("#tyGia").val()
        };
        $.post("/HoaDon/Add", dataHDSend, function (data) {
            //Lấy thông tin hóa đơn
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            let themHDResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                themHDResult = false;
            }

            if (themHDResult) {
                //Trừ tiền của khách hàng
                if ($("#selectKhachHang").val() != "") {
                    let IdKhachHang = $("#selectKhachHang").val();
                    let KhachHangOption = $("#selectKhachHang").find(`option[value="${IdKhachHang}"]`);
                    let newKHDiemTichLuy = parseInt($(KhachHangOption).attr("DiemTichLuy")) - $("#soDiemDoi").val() + parseInt($("#diemTichLuyHoaDon").attr("data"));
                    let dataKHSend = {
                        Ten: $(KhachHangOption).attr("Ten"),
                        Sdt: $(KhachHangOption).attr("Sdt"),
                        IdTaiKhoan: $(KhachHangOption).attr("IdTaiKhoan"),
                        DIemTichLuy: newKHDiemTichLuy,
                        OldIdKhachHang: IdKhachHang
                    };
                    $.post("/KhachHang/Edit", dataKHSend, function (data) {
                        //Lấy thông tin khách hàng
                        let inputJson = data;
                        inputJson = inputJson.replace(/&quot;/g, `"`);
                        let outputs = JSON.parse(inputJson);

                        let suaKHResult = true;
                        if (outputs.errors.length > 0 || outputs.output <= 0) {
                            suaKHResult = false;
                        }

                        if (suaKHResult) {
                            //Xử lý khi sửa thành công
                        }
                    });
                }

                //Lấy thông tin hóa đơn
                let IdHoaDon = outputs.newHoaDon.IdHoaDon;
                //Thêm chi tiết hóa đơn cho từng sản phẩm
                $(".card-sanpham").each(function (index, element) {
                    let dataCTHDSend = {
                        IdHoaDon: IdHoaDon,
                        IdSanPham: $(element).attr("IdSanPham"),
                        SoLuong: $(element).find(".soSanPham").html(),
                        DonGia: $(element).find(".Gia").attr("data"),
                        DiemTichLuy: $(element).find(".DiemTichLuy").attr("data")
                    };
                    $.post("/Cthd/Add", dataCTHDSend, function (data) {
                        let inputJson = data;
                        inputJson = inputJson.replace(/"/g, `"`);
                        let outputs = JSON.parse(inputJson);

                        let themCthdResult = true;
                        if (outputs.errors.length > 0 || outputs.output < 0) {
                            themCthdResult = false;
                        }

                        if (themCthdResult) {
                            //Xóa cart sau khi thêm hóa đơn và chi tiết hóa đơn
                            let IdBan = $("#IdBan").attr("IdBan");
                            $.post("/Cart/DeleteAllBan", { IdBan: IdBan }, function (data) {
                                //Refresh Page
                                refreshPage();
                            });
                        }
                    });
                });
            }
        });
    });

    //Sự kiện cho card 
    $(".card-sanpham").each(function (index, element) {
        createEventCard(element);
    });

    $("#soDiemDoi").blur(function () {
        let soDiemDoi = $(this).val();
        let maxSoDiemDoi = parseInt($(this).attr("max"));
        if (soDiemDoi > maxSoDiemDoi) {
            $(this).val(maxSoDiemDoi);
        }
        if (soDiemDoi < 0) {
            $(this).val(0);
        }
        //Tính toán tiền hóa đơn
        updateCartMoney();
    });

    $("#tyGia").blur(function () {
        let tyGia = $(this).val();
        if (tyGia < 0) {
            $(this).val(0);
        }
        //Tính toán tiền hóa đơn
        updateCartMoney();
    });

    $("#tichLuy").blur(function () {
        let tichLuy = $(this).val();
        if (tichLuy > 1) {
            $(this).val(1);
        }
        if (tyGia < 0) {
            $(this).val(0);
        }
        //Tính toán tiền hóa đơn
        updateCartMoney();
    });

    //Thay đổi số thành định dạng chữ 
    changeAllDataToString();

    //Cài lại select khách hàng
    $("#selectKhachHang").val("");
    resetSelectKhachHang();

    //Tính toán tiền hóa đơn
    updateCartMoney();
});


//Hàm 
//Chuyển chuỗi hoặc số thành dạng tiền tệ
function toMoneyString(input) {
    let moneyString = "₫";
    let index = `${input}`;
    let digitCount = 0;
    for (let i = index.length; i >= 0; i -= 1) {
        moneyString = `${index.charAt(i)}${moneyString}`;
        if (digitCount >= 3) {
            moneyString = `,${moneyString}`;
            digitCount = 0;
        }
        digitCount += 1;
    }
    if (moneyString.charAt(0) === ",") {
        moneyString = moneyString.slice(1);
    }
    return moneyString;
}

//Tăng số lượng sản phẩm
function tangSanPham(button) {
    let soSanPham = $(button).parent().find(".soSanPham");
    let soluong = parseInt($(soSanPham).html());
    soluong += 1;

    //Tìm id sản phẩm
    let cardSanPham = $(button).parents(".card-sanpham");
    let IdSanPham = $(cardSanPham).attr("IdSanPham");

    //Tạo ra event 
    thayDoiSoLuongSanPham(cardSanPham, IdSanPham, soluong);
}

//Gỉam số lượng sản phẩm
function giamSanPham(button) {
    let soSanPham = $(button).parent().find(".soSanPham");
    let soluong = parseInt($(soSanPham).html());
    soluong -= 1;

    //Tìm id sản phẩm
    let cardSanPham = $(button).parents(".card-sanpham");
    let IdSanPham = $(cardSanPham).attr("IdSanPham");

    //Tạo ra event 
    thayDoiSoLuongSanPham(cardSanPham, IdSanPham, soluong);
}

//Reset số lượng sản phẩm
function resetSanPham(button) {
    let soSanPham = $(button).parent().find(".soSanPham");
    $(soSanPham).html(1);

    //Tìm id sản phẩm
    let cardSanPham = $(button).parents(".card-sanpham");
    let IdSanPham = $(cardSanPham).attr("IdSanPham");

    //Tạo ra event 
    thayDoiSoLuongSanPham(cardSanPham, IdSanPham, soluong);
}

//Xoá  sản phẩm
function deleteSanPham(button) {
    let cardSanPham = $(button).parents(".card-sanpham");

    //Tìm id sản phẩm
    let IdSanPham = $(cardSanPham).attr("IdSanPham");

    //Tạo ra event 
    xoaSanPham(cardSanPham, IdSanPham);
}

//Thay đổi số lượng sản phẩm
function thayDoiSoLuongSanPham(cardSanpham, IdSanPham, SoLuong) {
    let IdBan = $("#IdBan").attr("IdBan");
    SoLuong = SoLuong > 0 ? SoLuong : 1;
    $.post("/Cart/Edit", { IdSanPham: IdSanPham, IdBan: IdBan, SoLuong: SoLuong, OldIdSanPham: IdSanPham, OldIdBan: IdBan }, function (data) {
        //Thành công
        $(cardSanpham).find(".soSanPham").html(SoLuong);

        //Tính toán tiền hóa đơn
        updateCartMoney();
    });
}

//Xóa sản phẩm 
function xoaSanPham(cardSanpham, IdSanPham) {
    let IdBan = $("#IdBan").attr("IdBan");
    $.post("/Cart/Delete", { IdSanPham: IdSanPham, IdBan: IdBan }, function (data) {
        //Thành công
        $(cardSanpham).remove();

        //Tính toán tiền hóa đơn
        updateCartMoney();
    });
}

//Tạo sự kiện cho nút trong Cart
function createEventCard(cardSanpham) {
    //Nút tăng
    $(cardSanpham).find(".tangSanPham").click(function () {
        tangSanPham($(this));
    });
    //Nút giảm 
    $(cardSanpham).find(".giamSanPham").click(function () {
        giamSanPham($(this));
    });
    //Nút reset
    $(cardSanpham).find(".soSanPham").click(function () {
        resetSanPham($(this));
    });
    //Nút xóa 
    $(cardSanpham).find(".xoaSanPham").click(function () {
        deleteSanPham($(this));
    });
}

//Tải lại trang
function refreshPage(isUseCache = false) {
    location.reload(isUseCache);
    //Thay đổi số thành định dạng chữ 
    changeAllDataToString();
}

//Chuyển số thành chuỗi có định dạng tiền 
function changeAllDataToString() {
    $(".card-sanpham").each(function (index, element) {
        //Giá 
        $(element).find(".Gia").html(toMoneyString($(element).find(".Gia").attr("data")));

        //Điểm tích lũy
        $(element).find(".DiemTichLuy").html($(element).find(".DiemTichLuy").attr("data"));
    });

    //tongTienSanPham
    $("#tongTienSanPham").html(toMoneyString($("#tongTienSanPham").attr("data")));

    //tongTienKhuyenMai
    $("#tongTienKhuyenMai").html(toMoneyString($("#tongTienKhuyenMai").attr("data")));

    //tongTienChuyenDoi
    $("#tongTienChuyenDoi").html(toMoneyString($("#tongTienChuyenDoi").attr("data")));

    //tongTienCanThanhToan
    $("#tongTienCanThanhToan").html(toMoneyString($("#tongTienCanThanhToan").attr("data")));

    //Điểm tích lũy
    $("#diemTichLuyHoaDon").html($("#diemTichLuyHoaDon").attr("data"));

}

//Tính toán tiền hóa đơn
function updateCartMoney() {
    let tongTienSanPham = 0;
    let tongTienChuyenDoi = 0;
    let tongTienCanThanhToan = 0;
    let diemTichLuyHoaDon = 0;

    $(".card-sanpham").each(function (index, element) {
        let Gia = $(element).find(".Gia").attr("data");
        let DiemTichLuy = $(element).find(".DiemTichLuy").attr("data");
        let soSanPham = $(element).find(".soSanPham").html();

        tongTienSanPham += parseInt(Gia) * parseInt(soSanPham);
        diemTichLuyHoaDon += parseInt(DiemTichLuy) * parseInt(soSanPham);
    });

    //Tiền chuyển đổi
    let tichLuy = 0;
    let tyGia = 1;
    let IdKhachHang = $("#selectKhachHang").val();
    if (IdKhachHang != "") {
        let soDiemDoi = $("#soDiemDoi").val();
        tyGia = $("#tyGia").val();
        tichLuy = $("#tichLuy").val();

        tongTienChuyenDoi = Math.floor(soDiemDoi * tyGia);
    }

    //Tính toán
    tongTienCanThanhToan = tongTienSanPham - tongTienChuyenDoi;
    diemTichLuyHoaDon += tyGia != 0 ? Math.floor(tongTienCanThanhToan * tichLuy / tyGia) : 0;

    //Gán lại giá trị
    $("#tongTienSanPham").attr("data", tongTienSanPham);
    $("#tongTienChuyenDoi").attr("data", tongTienChuyenDoi);
    $("#tongTienCanThanhToan").attr("data", tongTienCanThanhToan);
    $("#diemTichLuyHoaDon").attr("data", diemTichLuyHoaDon);

    //Thay đổi số thành định dạng chữ 
    changeAllDataToString();
}

//Reset select khách hàng
function resetSelectKhachHang() {
    $("#selectKhachHangDiemDoi").addClass("d-none");
    $("#soDiemDoi").val(0);
    $("#tyGia").val(0);
    $("#tichLuy").val(0);
}
