let tableQuanLyHoaDon;
let khachhangs = [];
let bans = [];
let nhanvien = [];

$(document).ready(function () {
//Active dataTable
    tableQuanLyHoaDon = $("#tableQuanLyHoaDon").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_hoa_don" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let khachhang = khachhangs.find(item => item.id_khach_hang == data);
                    if (khachhang === undefined) { khachhang = {}; }
                    let renderData = `${khachhang.id_khach_hang} - ${khachhang.ten}`;
                    return `<span class="id_khach_hang" data="${data}">${renderData}</span>`;
                }
            },            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let ban = bans.find(item => item.id_ban ==  data);
                    if (ban === undefined) { ban = {}; }
                    let renderData = `${ban.id_ban} - ${ban.ten}`;
                    return `<span class="id_ban" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let nhanvien = nhanviens.find(item => item.id_nhan_vien ==  data);
                    if (nhanvien === undefined) { nhanvien = {}; }
                    let renderData = `${nhanvien.id_nhan_vien} - ${nhanvien.ten}`;
                    return `<span class="id_nhan_vien" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let renderData = convertDateTimeToString(data);
                    return `<span class="thoi_gian" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let renderData = Math.floor(data * 100) / 100;
                    return `<span class="phan_tram_tich_luy" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 6,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="so_luong_diem_doi" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 7,
                "render": function (data, type, row, meta) {
                    let renderData = Math.floor(data * 100) / 100;
                    return `<span class="ty_gia_diem_doi" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 8,
                "render": function (data, type, row, meta) {
                    let hoadon = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaHoaDon" modify="${hoadon.id_hoa_don}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-dark m-1 so_san_pham" data-toggle="modal" data-target="#modelChiTietHoaDon" modify="${hoadon.id_hoa_don}" data="${hoadon.so_san_pham}">${hoadon.so_san_pham}<i class="fas fa-cart-plus ml-2"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLHDRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLHD();

    $("#danhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDau").click(function () {
        $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton)).each((index, element) => deleteTableQLHDRow($(element)));


    });
    $("#xoaTatCa").click(function () {
        $.post("/HoaDon/DeleteAll", function (data) {
            //Lấy thông tin 
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output >= 0) {
                tableQuanLyHoaDon.clear().draw();
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để xóa dữ liệu từ CSDL");
            })
            .always(function () {
            });


    });
    $("#lamMoi").click(function () {
        refreshDataTableQLHD();
    });
    $("#modelThemHoaDon").find("#themHoaDonConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemHoaDon").find("#themHoaDonAlerts").html("");
        
        //Validate
        let modifyHoaDon = extractModelThemHoaDon();
        let numberValidateError = validateHoaDonInformation($("#modelThemHoaDon").find("#themHoaDonAlerts"), modifyHoaDon);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newHoaDon = modifyHoaDon;
        newHoaDon.id_hoa_don = -1;
        newHoaDon.so_san_pham = 0;
        //Thêm xuống CSDL
        $.post("/HoaDon/Add", { IdHoaDon: newHoaDon.id_hoa_don, IdKhachHang: newHoaDon.id_khach_hang, IdBan: newHoaDon.id_ban, IdNhanVien: newHoaDon.id_nhan_vien, ThoiGIan: newHoaDon.thoi_gian, PhanTramTichLuy: newHoaDon.phan_tram_tich_luy, SoLuongDiemDoi: newHoaDon.so_luong_diem_doi, TyGiaDiemDoi: newHoaDon.ty_gia_diem_doi }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            let themModelResult = true;
            if (outputs.errors.Length > 0 || outputs.output < 0) {
                themModelResult = false;
            }

            //Thêm thành công
            if (themModelResult) {
                $("#modelThemHoaDon").find("#themHoaDonAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm mới vào bảng
                $("#modelThemHoaDon").find(".close").trigger("click");
                tableQuanLyHoaDon.row.add(createTableQLHDArrayDataRow(newHoaDon)).draw();
            }
            //Thêm thất bại
            else {
                $("#modelThemHoaDon").find("#themHoaDonAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemHoaDon").find("#themHoaDonAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để thêm dữ liệu vào CSDL");
                $("#modelThemHoaDon").find("#themHoaDonAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelThemHoaDon").find("#themHoaDonReset").click(function() {
        setModelThemHoaDon({});
    });

    $("#modelSuaHoaDon").find("#suaHoaDonConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaHoaDon").find("#suaHoaDonAlerts").html("");        

        //Validate
        let modifyHoaDon = extractModelSuaHoaDon();
        let numberValidateError = validateHoaDonInformation($("#modelSuaHoaDon").find("#suaHoaDonAlerts"), modifyHoaDon);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newHoaDon = modifyHoaDon;
        let old_id_hoa_don = $("#modelSuaHoaDon").attr("id_hoa_don");
        let oldHoaDonRow = $("#tableQuanLyHoaDon").find("button[modify='" + old_id_hoa_don + "']").parents("tr");

        //Sửa xuống CSDL
        $.post("/HoaDon/Edit", { IdHoaDon: newHoaDon.id_hoa_don, IdKhachHang: newHoaDon.id_khach_hang, IdBan: newHoaDon.id_ban, IdNhanVien: newHoaDon.id_nhan_vien, ThoiGIan: newHoaDon.thoi_gian, PhanTramTichLuy: newHoaDon.phan_tram_tich_luy, SoLuongDiemDoi: newHoaDon.so_luong_diem_doi, TyGiaDiemDoi: newHoaDon.ty_gia_diem_doi }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            inputJson = inputJson.replace(/IdHoaDon/g, `idhoadon`);;
            inputJson = inputJson.replace(/IdKhachHang/g, `idkhachhang`);;
            inputJson = inputJson.replace(/IdBan/g, `idban`);;
            inputJson = inputJson.replace(/IdNhanVien/g, `idnhanvien`);;
            inputJson = inputJson.replace(/ThoiGIan/g, `thoigian`);;
            inputJson = inputJson.replace(/PhanTramTichLuy/g, `phantramtichluy`);;
            inputJson = inputJson.replace(/SoLuongDiemDoi/g, `soluongdiemdoi`);;
            inputJson = inputJson.replace(/TyGiaDiemDoi/g, `tygiadiemdoi`);
            let outputs = JSON.parse(inputJson);

            let suaModelResult = true;
            if (outputs.errors.length > 0 || outputs.output < 0) {
                suaModelResult = false;
            }

            //Sửa thành công
            if (suaModelResult) {
                $("#modelSuaHoaDon").find("#suaHoaDonAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa tài khoản mới vào bảng
                $("#modelSuaHoaDon").find(".close").trigger("click");
                tableQuanLyHoaDon.row(oldHoaDonRow).data(createTableQLHDArrayDataRow(outputs.newHoaDon)).draw();
            }
            //Sửa thất bại
            else {
                $("#modelSuaHoaDon").find("#suaHoaDonAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaHoaDon").find("#suaHoaDonAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để sửa dữ liệu vào CSDL");
                $("#modelSuaHoaDon").find("#suaHoaDonAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelSuaHoaDon").find("#suaHoaDonReset").click(function() {
        setModelSuaHoaDon({});
    });

    $('#modelChiTietHoaDon').on('show.bs.modal', function (event) {
        let suaHoaDonTriggered = $(event.relatedTarget); // Button that triggered the modal

        let rowHoaDon = suaHoaDonTriggered.parents("tr");        

        if ($(rowHoaDon).find("button[data-target='#modelChiTietHoaDon']").length) {
            let modifyHoaDon = extractDataFromTableQLHDRow(rowHoaDon);
            $(this).attr("id_hoa_don", modifyHoaDon.id_hoa_don);

            $("#modelChiTietHoaDon").find("#hoaDonTitleInformation").text(`${$(rowHoaDon).find(".id_hoa_don").attr("data")}`);
             refreshDataTableQLCTHD();
         }
    });

    $('#modelSuaHoaDon').on('show.bs.modal', function (event) {
        let suaHoaDonTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyHoaDon = extractDataFromTableQLHDRow(suaHoaDonTriggered.parents("tr"));

        $(this).attr("id_hoa_don", modifyHoaDon.id_hoa_don);
        setModelSuaHoaDon(modifyHoaDon);       
    });

    $("#modelThemHoaDon").find("#themHoaDonCurrentTime").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemHoaDon").find(".thoi_gian[type='date']").val(currentTimeParts[0]);
        $("#modelThemHoaDon").find(".thoi_gian[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaHoaDon").find("#suaHoaDonCurrentTime").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaHoaDon").find(".thoi_gian[type='date']").val(currentTimeParts[0]);
        $("#modelSuaHoaDon").find(".thoi_gian[type='time']").val(currentTimeParts[1]);
    });
});

let createTableQLHDArrayDataRow = (hoadon) => {
    return [hoadon.id_hoa_don, hoadon.id_khach_hang, hoadon.id_ban, hoadon.id_nhan_vien, hoadon.thoi_gian, hoadon.phan_tram_tich_luy, hoadon.so_luong_diem_doi, hoadon.ty_gia_diem_doi, hoadon];
};

let extractDataFromTableQLHDRow = (tableRow) => {
    let id_hoa_don = $(tableRow).find(".id_hoa_don").attr("data");
    let id_khach_hang = $(tableRow).find(".id_khach_hang").attr("data");
    let id_ban = $(tableRow).find(".id_ban").attr("data");
    let id_nhan_vien = $(tableRow).find(".id_nhan_vien").attr("data");
    let thoi_gian = new Date($(tableRow).find(".thoi_gian").attr("data"));
    let phan_tram_tich_luy = $(tableRow).find(".phan_tram_tich_luy").attr("data");
    let so_luong_diem_doi = $(tableRow).find(".so_luong_diem_doi").attr("data");
    let ty_gia_diem_doi = $(tableRow).find(".ty_gia_diem_doi").attr("data");
    let so_san_pham = $(tableRow).find(".so_san_pham").attr("data");

    return {id_hoa_don: id_hoa_don, id_khach_hang: id_khach_hang, id_ban: id_ban, id_nhan_vien: id_nhan_vien, thoi_gian: thoi_gian, phan_tram_tich_luy:phan_tram_tich_luy, so_luong_diem_doi:so_luong_diem_doi, ty_gia_diem_doi:ty_gia_diem_doi, so_san_pham: so_san_pham};
};

let refreshDataTableQLHD = () => {
    //Lấy thông tin khachhangs
    khachhangs = [];
    $.post("/KhachHang/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdKhachHang/g, `idkhachhang`);;
        inputJson = inputJson.replace(/Ten/g, `ten`);;
        inputJson = inputJson.replace(/Sdt/g, `sdt`);;
        inputJson = inputJson.replace(/Username/g, `username`);;
        inputJson = inputJson.replace(/DiemTichLuy/g, `diemtichluy`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            khachhangs.push(output);
        }
        //Thêm option khachhangs
        $("#modelThemHoaDon").find("#themHoaDonKhachHang").html("");
        $("#modelSuaHoaDon").find("#suaHoaDonKhachHang").html("");
        for (let khachhang of khachhangs) {
            let newOption = `<option value="${khachhang.id_khach_hang}">${khachhang.id_khach_hang} - ${khachhang.ten}</option>`;
            $("#modelThemHoaDon").find("#themHoaDonKhachHang").append(newOption);
            $("#modelSuaHoaDon").find("#suaHoaDonKhachHang").append(newOption);
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });


    //Lấy thông tin bans
    bans = [];
    $.post("/Ban/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdBan/g, `idban`);;
        inputJson = inputJson.replace(/Ten/g, `ten`);;
        inputJson = inputJson.replace(/TrangThai/g, `trangthai`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            bans.push(output);
        }
        //Thêm option bans
        $("#modelThemHoaDon").find("#themHoaDonBan").html("");
        $("#modelSuaHoaDon").find("#suaHoaDonBan").html("");
        for (let ban of bans) {
            let newOption = `<option value="${ban.id_ban}">${ban.id_ban} - ${ban.ten}</option>`;
            $("#modelThemHoaDon").find("#themHoaDonBan").append(newOption);
            $("#modelSuaHoaDon").find("#suaHoaDonBan").append(newOption);
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });

    //Lấy thông tin nhanviens
    nhanviens = [];
    $.post("/NhanVien/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdNhanVien/g, `idnhanvien`);;
        inputJson = inputJson.replace(/Ten/g, `ten`);;
        inputJson = inputJson.replace(/Sdt/g, `sdt`);;
        inputJson = inputJson.replace(/Loai/g, `loai`);;
        inputJson = inputJson.replace(/Username/g, `username`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            nhanviens.push(output);
        }
        //Thêm option khachhangs
        $("#modelThemHoaDon").find("#themHoaDonNhanVien").html("");
        $("#modelSuaHoaDon").find("#suaHoaDonNhanVien").html("");
        for (let nhanvien of nhanviens) {
            let newOption = `<option value="${nhanvien.id_nhan_vien}">${nhanvien.id_nhan_vien} - ${nhanvien.ten}</option>`;
            $("#modelThemHoaDon").find("#themHoaDonNhanVien").append(newOption);
            $("#modelSuaHoaDon").find("#suaHoaDonNhanVien").append(newOption);
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });

    tableQuanLyHoaDon.clear();

    //Lấy thông tin hóa đơn
    let hoadons = [];
    $.post("/HoaDon/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdHoaDon/g, `idhoadon`);;
        inputJson = inputJson.replace(/IdKhachHang/g, `idkhachhang`);;
        inputJson = inputJson.replace(/IdBan/g, `idban`);;
        inputJson = inputJson.replace(/IdNhanVien/g, `idnhanvien`);;
        inputJson = inputJson.replace(/ThoiGIan/g, `thoigian`);;
        inputJson = inputJson.replace(/PhanTramTichLuy/g, `phantramtichluy`);;
        inputJson = inputJson.replace(/SoLuongDiemDoi/g, `soluongdiemdoi`);;
        inputJson = inputJson.replace(/TyGiaDiemDoi/g, `tygiadiemdoi`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyHoaDon.row.add(createTableQLHDArrayDataRow(output));
        }
        tableQuanLyHoaDon.draw();
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });


};

const deleteTableQLHDRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    let hoaDon = extractDataFromTableQLHDRow(tableRow);
    $.post("/HoaDon/Delete", { IdHoaDon: hoaDon.id_hoa_don }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {
            tableQuanLyHoaDon.row(tableRow).remove().draw();
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để xóa dữ liệu từ CSDL");
        })
        .always(function () {
        });


};

const extractModelThemHoaDon = () => {
    return extractFromModelHoaDon($("#modelThemHoaDon"));
};

const extractModelSuaHoaDon = () => {
    return extractFromModelHoaDon($("#modelSuaHoaDon"));
};

const extractFromModelHoaDon = (model) => {
//Lấy thông tin
    let id_hoa_don = $(model).find(".id_hoa_don").val();
    let id_khach_hang = $(model).find(".id_khach_hang").val();
    let id_ban = $(model).find(".id_ban").val();
    let id_nhan_vien = $(model).find(".id_nhan_vien").val();

    let thoi_gian_date = $(model).find(".thoi_gian[type='date']").val();
    let thoi_gian_time = $(model).find(".thoi_gian[type='time']").val();
    let thoi_gian = undefined;
    if (thoi_gian_date !== "" && thoi_gian_time !== "") {
        thoi_gian = new Date(`${thoi_gian_date} ${thoi_gian_time}`);
    }

    let phan_tram_tich_luy = $(model).find(".phan_tram_tich_luy").val();
    let so_luong_diem_doi = $(model).find(".so_luong_diem_doi").val();
    let ty_gia_diem_doi = $(model).find(".ty_gia_diem_doi").val();

    let so_san_pham = $(model).find(".so_san_pham").val();

    return {id_hoa_don: id_hoa_don, id_khach_hang: id_khach_hang, id_ban: id_ban, id_nhan_vien: id_nhan_vien, thoi_gian: thoi_gian, phan_tram_tich_luy:phan_tram_tich_luy, so_luong_diem_doi:so_luong_diem_doi, ty_gia_diem_doi:ty_gia_diem_doi, so_san_pham: so_san_pham};
};

const setModelThemHoaDon = (modifyHoaDon) => {
    setToModelHoaDon($("#modelThemHoaDon"), modifyHoaDon);
};

const setModelSuaHoaDon = (modifyHoaDon) => {
    setToModelHoaDon($("#modelSuaHoaDon"), modifyHoaDon);
};

const setToModelHoaDon = (model, hoadon) => {
    $(model).find(".id_hoa_don").val(hoadon.id_hoa_don);
    $(model).find(".id_khach_hang").val(hoadon.id_khach_hang);
    $(model).find(".id_ban").val(hoadon.id_ban);
    $(model).find(".id_nhan_vien").val(hoadon.id_nhan_vien);

    let datetimeStrings = convertDateTimeToString(hoadon.thoi_gian).split(" ");
    $(model).find(".thoi_gian[type='date']").val(datetimeStrings[0]);
    $(model).find(".thoi_gian[type='time']").val(datetimeStrings[1]);

    $(model).find(".phan_tram_tich_luy").val(hoadon.phan_tram_tich_luy);
    $(model).find(".so_luong_diem_doi").val(hoadon.so_luong_diem_doi);
    $(model).find(".ty_gia_diem_doi").val(hoadon.ty_gia_diem_doi);

    $(model).find(".so_san_pham").val(hoadon.so_san_pham);
};

const validateHoaDonInformation = (alertContainer, hoadon) => {
    //Validate
    let id_hoa_don = hoadon.id_hoa_don;
    let id_khach_hang = hoadon.id_khach_hang;
    let id_ban = hoadon.id_ban;
    let id_nhan_vien = hoadon.id_nhan_vien;
    let thoi_gian = hoadon.thoi_gian;
    let phan_tram_tich_luy = hoadon.phan_tram_tich_luy;
    let so_luong_diem_doi = hoadon.so_luong_diem_doi;
    let ty_gia_diem_doi = hoadon.ty_gia_diem_doi;

    let numberValidateError = 0;
    if (!id_khach_hang || id_khach_hang === "") {
        $(alertContainer).append(createAlerts("danger", "Khách hàng không được để trống"));
        numberValidateError += 1;
    }
    if (!id_ban || id_ban === "") {
        $(alertContainer).append(createAlerts("danger", "Bàn không được để trống"));
        numberValidateError += 1;
    }
    if (!id_nhan_vien || id_nhan_vien === "") {
        $(alertContainer).append(createAlerts("danger", "Nhân viên không được để trống"));
        numberValidateError += 1;
    }
    if (!thoi_gian || thoi_gian === "") {
        $(alertContainer).append(createAlerts("danger", "Thời gian không được để trống"));
        numberValidateError += 1;
    }
    if (!phan_tram_tich_luy || phan_tram_tich_luy === "") {
        $(alertContainer).append(createAlerts("danger", "Phần trăm tích lũy không được để trống"));
        numberValidateError += 1;
    }
    if (!so_luong_diem_doi || so_luong_diem_doi === "") {
        $(alertContainer).append(createAlerts("danger", "Số điểm đổi không được để trống"));
        numberValidateError += 1;
    }
    if (!ty_gia_diem_doi || ty_gia_diem_doi === "") {
        $(alertContainer).append(createAlerts("danger", "Tỷ lệ điểm đổi không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};