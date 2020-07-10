let tableQuanLyHoaDon;
let khachhangs = [];
let bans = [];
let nhanviens = [];

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
                    let renderData = data;
                    return `<span class="id_khach_hang" data="${data}">${renderData}</span>`;
                }
            }, {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_ban" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_nhan_vien" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thoi_gian" data="${data}">${renderData}</span>`;
                }
            },

            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="tong_tien" data="${data}">${renderData}</span>`;
                }
            },

            {
                "targets": 6,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diem_doi" data="${data}">${renderData}</span>`;
                }
            },

            {
                "targets": 7,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="thanh_toan" data="${data}">${renderData}</span>`;
                }
            },

            {
                "targets": 8,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diem_tich_luy" data="${data}">${renderData}</span>`;
                }
            },

            {
                "targets": 9,
                "render": function (data, type, row, meta) {
                    let hoadon = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<a class="btn m-1 "  modify="${hoadon.id_hoa_don}" href="/Admin/Chitiethoadon/${hoadon.id_hoa_don}"><i class="fas fa-cart-plus ml-2"></i></a>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLHDRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLHD();

    $("")

    $("#danhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDau").click(function () {
        let markeds = [];
        let tableRows = [];
        //Lọc ra dòng được chọn
        $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton)).each((index, element) => {
            let tableRow = $(element).parents("tr");
            tableRows.push(tableRow);
        });
        //Lọc ra hóa đơn được chọn
        for (let tableRow of tableRows) {
            let hoaDon = extractDataFromTableQLHDRow(tableRow);
            markeds.push(hoaDon);
        }
        //Kiểm tra xem có dòng nào được chọn hay chưa
        $("#tableQuanLyHoaDonAlert").empty();

        if (tableRows.length <= 0 || markeds.length <= 0) {
            $("#tableQuanLyHoaDonAlert").append(createAlerts("warning", "Chưa có dòng nào được chọn"));
            return;
        }
        //Gửi yêu cầu xóa 
        $.post("/HoaDon/DeleteMarked", { JsonInput: JSON.stringify(markeds.map(item => item.id_hoa_don)) }, function (data) {
            //Lấy thông tin hóa đơn
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdHoaDon/g, `id_hoa_don`);
            inputJson = inputJson.replace(/Result/g, `result`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            let deleteSuccess = [];
            let deleteFail = [];
            for (let i = 0; i < outputs.length; i += 1) {
                let output = JSON.parse(outputs[i]);
                if (output.result >= 0) {
                    let tableRow = tableRows[i];
                    tableQuanLyHoaDon.row(tableRow).remove().draw();
                    deleteSuccess.push(markeds[i].ten);
                }
                else {
                    deleteFail.push(markeds[i].ten);
                }
            }
            //Thông báo kết quả xóa
            if (deleteSuccess.length > 0) {
                $("#tableQuanLyHoaDonAlert").append(createAlerts("success", `Xóa thành công ${deleteSuccess.length} hóa đơn:   ${deleteSuccess.join(",  ")}`));
            }
            if (deleteFail.length > 0) {
                $("#tableQuanLyHoaDonAlert").append(createAlerts("success", `Xóa thất bại ${deleteFail.length} hóa đơn: ${deleteFail.join(", ")}`));
            }
            //Bỏ đánh dấu nếu có
            $(".custom-toggle-button").each((index, element) => {
                setToggleStatus(element, false);
            });
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyHoaDonAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyHoaDonAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#xoaTatCa").click(function () {
        $("#tableQuanLyHoaDonAlert").empty();

        $.post("/HoaDon/DeleteAll", function (data) {
            //Lấy thông tin hóa đơn
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output > 0) {
                tableQuanLyHoaDon.clear().draw();
                $("#tableQuanLyHoaDonAlert").append(createAlerts("success", "Xóa thành công"));
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyHoaDonAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyHoaDonAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLHD();
    });

    //THÊM HÓA ĐƠN
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
        $("#tableQuanLyHoaDonAlert").empty();

        $.post("/HoaDon/Add", { IdHoaDon: newHoaDon.id_hoa_don, IdKhachHang: newHoaDon.id_khach_hang, IdBan: newHoaDon.id_ban, IdNhanVien: newHoaDon.id_nhan_vien, ThoiGianLap: newHoaDon.thoi_gian_lap, ThoiGianThanhToan: newHoaDon.thoi_gian_thanh_toan, PhanTramTichLuy: newHoaDon.phan_tram_tich_luy, SoLuongDiemDoi: newHoaDon.so_luong_diem_doi, TyGiaDiemDoi: newHoaDon.ty_gia_diem_doi }, function (data) {
            //Lấy thông tin hóa đơn
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdHoaDon/g, `id_hoa_don`);
            inputJson = inputJson.replace(/IdKhachHang/g, `id_khach_hang`);
            inputJson = inputJson.replace(/IdBan/g, `id_ban`);
            inputJson = inputJson.replace(/IdNhanVien/g, `id_nhan_vien`);
            inputJson = inputJson.replace(/ThoiGianLap/g, `thoi_gian_lap`);
            inputJson = inputJson.replace(/ThoiGianThanhToan/g, `thoi_gian_thanh_toan`);
            inputJson = inputJson.replace(/PhanTramTichLuy/g, `phan_tram_tich_luy`);
            inputJson = inputJson.replace(/SoLuongDiemDoi/g, `so_luong_diem_doi`);
            inputJson = inputJson.replace(/TyGiaDiemDoi/g, `ty_gia_diem_doi`);
            let outputs = JSON.parse(inputJson);

            let themHDResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                themHDResult = false;
            }

            //Thêm thành công
            if (themHDResult) {
                $("#modelThemHoaDon").find("#themHoaDonAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm hóa đơn mới vào bảng
                $("#modelThemHoaDon").find(".close").trigger("click");
                tableQuanLyHoaDon.row.add(createTableQLHDArrayDataRow(outputs.newHoaDon)).draw();
                $("#tableQuanLyHoaDonAlert").append(createAlerts("success", `Thêm thành công hóa đơn ${newHoaDon.ten}`));
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
                $("#modelThemHoaDon").find("#themHoaDonAlerts").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#modelThemHoaDon").find("#themHoaDonAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelThemHoaDon").find("#themHoaDonReset").click(function () {
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
        newHoaDon.id_hoa_don = old_id_hoa_don;
        let oldHoaDonRow = $("#tableQuanLyHoaDon").find("button[modify='" + old_id_hoa_don + "']").parents("tr");

        //Sửa xuống CSDL
        $("#tableQuanLyHoaDonAlert").empty();

        $.post("/HoaDon/Edit", { IdHoaDon: newHoaDon.id_hoa_don, IdKhachHang: newHoaDon.id_khach_hang, IdBan: newHoaDon.id_ban, IdNhanVien: newHoaDon.id_nhan_vien, ThoiGianLap: newHoaDon.thoi_gian_lap, ThoiGianThanhToan: newHoaDon.thoi_gian_thanh_toan, PhanTramTichLuy: newHoaDon.phan_tram_tich_luy, SoLuongDiemDoi: newHoaDon.so_luong_diem_doi, TyGiaDiemDoi: newHoaDon.ty_gia_diem_doi, OldIdHoaDon: old_id_hoa_don }, function (data) {
            //Lấy thông tin hóa đơn
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            let suaHDResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                suaHDResult = false;
            }

            //Sửa thành công
            if (suaHDResult) {
                $("#modelSuaHoaDon").find("#suaHoaDonAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa hóa đơn mới vào bảng
                $("#modelSuaHoaDon").find(".close").trigger("click");
                tableQuanLyHoaDon.row(oldHoaDonRow).data(createTableQLHDArrayDataRow(newHoaDon)).draw();
                $("#tableQuanLyHoaDonAlert").append(createAlerts("success", `Sửa thành công hóa đơn ${newHoaDon.id_hoa_don}`));
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
                $("#modelSuaHoaDon").find("#suaHoaDonAlerts").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
                $("#modelSuaHoaDon").find("#suaHoaDonAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelSuaHoaDon").find("#suaHoaDonReset").click(function () {
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
        $("#modelThemHoaDon").find(".thoi_gian_lap[type='date']").val(currentTimeParts[0]);
        $("#modelThemHoaDon").find(".thoi_gian_lap[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaHoaDon").find("#suaHoaDonCurrentTime").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaHoaDon").find(".thoi_gian_lap[type='date']").val(currentTimeParts[0]);
        $("#modelSuaHoaDon").find(".thoi_gian_lap[type='time']").val(currentTimeParts[1]);
    });

    $("#modelThemHoaDon").find("#themHoaDonCurrentTimeThanhToan").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemHoaDon").find(".thoi_gian_thanh_toan[type='date']").val(currentTimeParts[0]);
        $("#modelThemHoaDon").find(".thoi_gian_thanh_toan[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaHoaDon").find("#suaHoaDonCurrentTimeThanhToan").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaHoaDon").find(".thoi_gian_thanh_toan[type='date']").val(currentTimeParts[0]);
        $("#modelSuaHoaDon").find(".thoi_gian_thanh_toan[type='time']").val(currentTimeParts[1]);
    });
});

//CREATE TABLE QUẢN LÝ HÓA ĐƠN
let createTableQLHDArrayDataRow = (hoadon) => {
    return [hoadon.id_hoa_don, hoadon.id_khach_hang, hoadon.id_ban, hoadon.id_nhan_vien, hoadon.thoi_gian, hoadon.tong_tien, hoadon.diem_doi, hoadon.thanh_toan,hoadon.diem_tich_luy, hoadon];
};

let extractDataFromTableQLHDRow = (tableRow) => {
    let id_hoa_don = $(tableRow).find(".id_hoa_don").attr("data");
    let id_khach_hang = $(tableRow).find(".id_khach_hang").attr("data");
    let id_ban = $(tableRow).find(".id_ban").attr("data");
    let id_nhan_vien = $(tableRow).find(".id_nhan_vien").attr("data");
    let thoi_gian = new Date($(tableRow).find(".thoi_gian").attr("data"));
    let tong_tien = new Date($(tableRow).find(".tong_tien").attr("data"));
    let diem_doi = $(tableRow).find(".diem_doi").attr("data");
    let thanh_tien = $(tableRow).find(".thanh_tien").attr("data");
    let diem_tich_luy = $(tableRow).find(".ty_gia_diem_doi").attr("data");

    return { id_hoa_don: id_hoa_don, id_khach_hang: id_khach_hang, id_ban: id_ban, id_nhan_vien: id_nhan_vien, thoi_gian: thoi_gian, tong_tien: tong_tien, diem_doi:diem_doi, thanh_tien:thanh_tien, diem_tich_luy:diem_tich_luy };
};

//GET ALL
const refreshDataTableQLHD = () => {
    tableQuanLyHoaDon.clear();
    $("tableQuanLyHoaDonAlert").empty();

    $.post("/HoaDon/GetAll", function (data) {
        //Lấy thông tin hóa đơn
        let inputJson = data;
        inputJson = inputJson.replace(/IdHoaDon/g, `id_hoa_don`);
        inputJson = inputJson.replace(/IdKhachHang/g, `id_khach_hang`);
        inputJson = inputJson.replace(/IdBan/g, `id_ban`);
        inputJson = inputJson.replace(/IdNhanVien/g, `id_nhan_vien`);
        inputJson = inputJson.replace(/ThoiGian/g, `thoi_gian`);
        inputJson = inputJson.replace(/TongTien/g, `tong_tien`);
        inputJson = inputJson.replace(/DiemDoi/g, `diem_doi`);
        inputJson = inputJson.replace(/ThanhToan/g, `thanh_toan`);
        inputJson = inputJson.replace(/DiemTichLuy/g, `diem_tich_luy`);

        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyHoaDon.row.add(createTableQLHDArrayDataRow(output));
        }
        tableQuanLyHoaDon.draw();

        $("#tableQuanLyHoaDonAlert").append(createAlerts("success", "Làm mới thành công"));
    })
        .done(function () {
        })
        .fail(function () {
            $("#tableQuanLyHoaDonAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
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
            $("#tableQuanLyHoaDonAlert").append(createAlerts("success", `Xóa thành công hóa đơn ${hoaDon.id_hoa_don}`));
        }
    })
        .done(function () {
        })
        .fail(function () {
            $("#tableQuanLyHoaDonAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
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

    let tong_tien = $(model).find(".tong_tien").val();
    let diem_doi = $(model).find(".diem_doi").val();
    let thanh_tien = $(model).find(".thanh_tien").val();

    return { id_hoa_don: id_hoa_don, id_khach_hang: id_khach_hang, id_ban: id_ban, id_nhan_vien: id_nhan_vien, thoi_gian: thoi_gian, tong_tien: tong_tien, diem_doi:diem_doi, thanh_tien: thanh_tien, diem_tich_luy:diem_tich_luy};
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
    let thoi_gian_lap = hoadon.thoi_gian_lap;
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
    if (!thoi_gian_lap || thoi_gian_lap === "") {
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