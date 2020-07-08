let tableQuanLyKhachHang;
let taikhoans = [];

$(document).ready(function () {
    //Active dataTable
    tableQuanLyKhachHang = $("#tableQuanLyKhachHang").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_khach_hang" data="${data}">${renderData}</span>`;
                }
            }, {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ten" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="sdt" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diem_tich_luy" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let taikhoanKHRender = taikhoans.find(item => item.id_tai_khoan == data);
                    let renderData = `${taikhoanKHRender.id_tai_khoan}`;
                    return `<span class="id_tai_khoan" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let khachhang = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaKhachHang" modify="${khachhang.id_khach_hang}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLKHRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLKH();

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
        //Lọc ra khách hàng được chọn
        for (let tableRow of tableRows) {
            let khachHang = extractDataFromTableQLKHRow(tableRow);
            markeds.push(khachHang);
        }
        //Kiểm tra xem có dòng nào được chọn hay chưa
        $("#tableQuanLyKhachHangAlert").empty();

        if (tableRows.length <= 0 || markeds.length <= 0) {
            $("#tableQuanLyKhachHangAlert").append(createAlerts("warning", "Chưa có dòng nào được chọn"));
            return;
        }
        //Gửi yêu cầu xóa 
        $.post("/KhachHang/DeleteMarked", { JsonInput: JSON.stringify(markeds.map(item => item.id_khach_hang)) }, function (data) {
            //Lấy thông tin khách hàng
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdKhachHang/g, `id_khach_hang`);
            inputJson = inputJson.replace(/Result/g, `result`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            let deleteSuccess = [];
            let deleteFail = [];
            for (let i = 0; i < outputs.length; i += 1) {
                let output = JSON.parse(outputs[i]);
                if (output.result >= 0) {
                    let tableRow = tableRows[i];
                    tableQuanLyKhachHang.row(tableRow).remove().draw();
                    deleteSuccess.push(markeds[i].ten);
                }
                else {
                    deleteFail.push(markeds[i].ten);
                }
            }
            //Thông báo kết quả xóa
            if (deleteSuccess.length > 0) {
                $("#tableQuanLyKhachHangAlert").append(createAlerts("success", `Xóa thành công ${deleteSuccess.length} khách hàng:   ${deleteSuccess.join(",  ")}`));
            }
            if (deleteFail.length > 0) {
                $("#tableQuanLyKhachHangAlert").append(createAlerts("success", `Xóa thất bại ${deleteFail.length} khách hàng: ${deleteFail.join(", ")}`));
            }
            //Bỏ đánh dấu nếu có
            $(".custom-toggle-button").each((index, element) => {
                setToggleStatus(element, false);
            });
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyKhachHangAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyKhachHangAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#xoaTatCa").click(function () {
        $("#tableQuanLyKhachHangAlert").empty();

        $.post("/KhachHang/DeleteAll", function (data) {
            //Lấy thông tin khách hàng
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output > 0) {
                tableQuanLyKhachHang.clear().draw();
                $("#tableQuanLyKhachHangAlert").append(createAlerts("success", "Xóa thành công"));
            } 
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyKhachHangAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyKhachHangAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLKH();
    });
    $("#modelThemKhachHang").find("#themKhachHangConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemKhachHang").find("#themKhachHangAlerts").html("");

        //Validate
        let modifyKhachHang = extractModelThemKhachHang();
        let numberValidateError = validateKhachHangInformation($("#modelThemKhachHang").find("#themKhachHangAlerts"), modifyKhachHang);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo khách hàng mới 
        let newKhachHang = modifyKhachHang;
        newKhachHang.id_khach_hang = -1;
        //Thêm xuống CSDL
        $("#tableQuanLyKhachHangAlert").empty();

        $.post("/KhachHang/Add", { Ten: newKhachHang.ten, Sdt: newKhachHang.sdt, IdTaiKhoan: newKhachHang.id_tai_khoan, DIemTichLuy: newKhachHang.diem_tich_luy }, function (data) {
            //Lấy thông tin khách hàng
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdKhachHang/g, `id_khach_hang`);
            inputJson = inputJson.replace(/Ten/g, `ten`);
            inputJson = inputJson.replace(/Sdt/g, `sdt`);
            inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
            inputJson = inputJson.replace(/DiemTichLuy/g, `diem_tich_luy`);
            let outputs = JSON.parse(inputJson);

            let themKHResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                themKHResult = false;
            }

            //Thêm thành công
            if (themKHResult) {
                $("#modelThemKhachHang").find("#themKhachHangAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm khách hàng mới vào bảng
                $("#modelThemKhachHang").find(".close").trigger("click");
                tableQuanLyKhachHang.row.add(createTableQLKHArrayDataRow(outputs.newKhachHang)).draw();
                $("#tableQuanLyKhachHangAlert").append(createAlerts("success", `Thêm thành công khách hàng ${newKhachHang.ten}`));
            }
            //Thêm thất bại
            else {
                $("#modelThemKhachHang").find("#themKhachHangAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemKhachHang").find("#themKhachHangAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#modelThemKhachHang").find("#themKhachHangAlerts").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#modelThemKhachHang").find("#themKhachHangAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelThemKhachHang").find("#themKhachHangReset").click(function () {
        setModelThemKhachHang({});
    });

    $("#modelSuaKhachHang").find("#suaKhachHangConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaKhachHang").find("#suaKhachHangAlerts").html("");

        //Validate
        let modifyKhachHang = extractModelSuaKhachHang();
        let numberValidateError = validateKhachHangInformation($("#modelSuaKhachHang").find("#suaKhachHangAlerts"), modifyKhachHang);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo khách hàng mới 
        let newKhachHang = modifyKhachHang;
        let oldIdKhachHang = $("#modelSuaKhachHang").attr("id_khach_hang");
        let oldKhachHangRow = $("#tableQuanLyKhachHang").find("button[modify='" + oldIdKhachHang + "']").parents("tr");

        //Sửa xuống CSDL
        $("#tableQuanLyKhachHangAlert").empty();

        $.post("/KhachHang/Edit", { Ten: newKhachHang.ten, Sdt: newKhachHang.sdt, IdTaiKhoan: newKhachHang.id_tai_khoan, DIemTichLuy: newKhachHang.diem_tich_luy, OldIdKhachHang: oldIdKhachHang }, function (data) {
            //Lấy thông tin khách hàng
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            let suaKHResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                suaKHResult = false;
            }

            //Sửa thành công
            if (suaKHResult) {
                $("#modelSuaKhachHang").find("#suaKhachHangAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa khách hàng mới vào bảng
                $("#modelSuaKhachHang").find(".close").trigger("click");
                tableQuanLyKhachHang.row(oldKhachHangRow).data(createTableQLKHArrayDataRow(newKhachHang)).draw();
                $("#tableQuanLyKhachHangAlert").append(createAlerts("success", `Sửa thành công khách hàng ${newKhachHang.ten}`));
            }
            //Sửa thất bại
            else {
                $("#modelSuaKhachHang").find("#suaKhachHangAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaKhachHang").find("#suaKhachHangAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#modelSuaKhachHang").find("#suaKhachHangAlerts").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
                $("#modelSuaKhachHang").find("#suaKhachHangAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelSuaKhachHang").find("#suaKhachHangReset").click(function () {
        setModelSuaKhachHang({});
    });

    $('#modelSuaKhachHang').on('show.bs.modal', function (event) {
        let suaKhachHangTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyKhachHang = extractDataFromTableQLKHRow(suaKhachHangTriggered.parents("tr"));

        $(this).attr("id_khach_hang", modifyKhachHang.id_khach_hang);
        setModelSuaKhachHang(modifyKhachHang);
    });
});

let createTableQLKHArrayDataRow = (khachhang) => {
    return [khachhang.id_khach_hang, khachhang.ten, khachhang.sdt, khachhang.diem_tich_luy, khachhang.id_tai_khoan, khachhang];
};

let extractDataFromTableQLKHRow = (tableRow) => {
    let id_khach_hang = $(tableRow).find(".id_khach_hang").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let sdt = $(tableRow).find(".sdt").attr("data");
    let diem_tich_luy = $(tableRow).find(".diem_tich_luy").attr("data");
    let id_tai_khoan = $(tableRow).find(".id_tai_khoan").attr("data");

    return { id_khach_hang: id_khach_hang, ten: ten, sdt: sdt, diem_tich_luy: diem_tich_luy, id_tai_khoan: id_tai_khoan };
};

let refreshDataTableQLKH = () => {
    $("#tableQuanLyKhachHangAlert").empty();

    //Lấy thông tin tài khoản
    $.post("/TaiKhoan/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/&quot;/g, `"`);
        inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
        inputJson = inputJson.replace(/Username/g, `username`);
        inputJson = inputJson.replace(/Password/g, `password`);
        inputJson = inputJson.replace(/Type/g, `type`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        taikhoans = [];
        for (let output of outputs) {
            taikhoans.push(output);
        }

        //Thêm option taikhoans
        $("#modelThemKhachHang").find("#themKhachHangUsername").html("");
        $("#modelSuaKhachHang").find("#suaKhachHangUsername").html("");
        for (let taikhoan of taikhoans) {
            let newUsernameOption = `<option value="${taikhoan.id_tai_khoan}">${taikhoan.username}</option>`;
            $("#modelThemKhachHang").find("#themKhachHangUsername").append(newUsernameOption);
            $("#modelSuaKhachHang").find("#suaKhachHangUsername").append(newUsernameOption);
        }

        $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", "Làm mới thông tin tài khoản thành công"));


        tableQuanLyKhachHang.clear();


        //Lấy thông tin khách hàng
        $.post("/KhachHang/GetAll", function (data) {
            //Lấy thông tin khách hàng
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdKhachHang/g, `id_khach_hang`);
            inputJson = inputJson.replace(/Ten/g, `ten`);
            inputJson = inputJson.replace(/Sdt/g, `sdt`);
            inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
            inputJson = inputJson.replace(/DiemTichLuy/g, `diem_tich_luy`);
            let outputs = JSON.parse(inputJson);

            //Thêm vào bảng
            for (let output of outputs) {
                tableQuanLyKhachHang.row.add(createTableQLKHArrayDataRow(output));
            }
            tableQuanLyKhachHang.draw();
            $("#tableQuanLyKhachHangAlert").append(createAlerts("success", "Làm mới thành công"));
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyKhachHangAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
            })
            .always(function () {
            });
    })
        .done(function () {
        })
        .fail(function () {
            $("#tableQuanLyTaiKhoanAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
        })
        .always(function () {
        });
};

let deleteTableQLKHRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    let khachHang = extractDataFromTableQLKHRow(tableRow);
    $("#tableQuanLyKhachHangAlert").empty();

    $.post("/KhachHang/Delete", { IdKhachHang: khachHang.id_khach_hang }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/&quot;/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output > 0) {
            tableQuanLyKhachHang.row(tableRow).remove().draw();
            $("#tableQuanLyKhachHangAlert").append(createAlerts("success", `Xóa thành công khách hàng ${khachHang.ten}`));
        }
        //Bỏ đánh dấu nếu có
        $(".custom-toggle-button").each((index, element) => {
            setToggleStatus(element, false);
        });
    })
        .done(function () {
        })
        .fail(function () {
            $("#tableQuanLyKhachHangAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
        })
        .always(function () {
        });
};

let extractModelThemKhachHang = () => {
    return extractFromModel($("#modelThemKhachHang"));
};

let extractModelSuaKhachHang = () => {
    return extractFromModel($("#modelSuaKhachHang"));
};

let extractFromModel = (model) => {
    //Lấy thông tin
    let id_khach_hang = $(model).find(".id_khach_hang").val();
    let ten = $(model).find(".ten").val();
    let sdt = $(model).find(".sdt").val();
    let diem_tich_luy = $(model).find(".diem_tich_luy").val();
    let id_tai_khoan = $(model).find(".id_tai_khoan").val();
    return { id_khach_hang: id_khach_hang, ten: ten, sdt: sdt, diem_tich_luy: diem_tich_luy, id_tai_khoan: id_tai_khoan };
};

let setModelThemKhachHang = (modifyKhachHang) => {
    setToModel($("#modelThemKhachHang"), modifyKhachHang);
};

let setModelSuaKhachHang = (modifyKhachHang) => {
    setToModel($("#modelSuaKhachHang"), modifyKhachHang);
};

let setToModel = (model, khachhang) => {
    $(model).find(".id_khach_hang").val(khachhang.id_khach_hang);
    $(model).find(".ten").val(khachhang.ten);
    $(model).find(".sdt").val(khachhang.sdt);
    $(model).find(".diem_tich_luy").val(khachhang.diem_tich_luy);
    $(model).find(".id_tai_khoan").val(khachhang.id_tai_khoan);
};

let validateKhachHangInformation = (alertContainer, khachhang) => {
    //Validate
    let id_khach_hang = khachhang.id_khach_hang;
    let ten = khachhang.ten;
    let sdt = khachhang.sdt;
    let diem_tich_luy = khachhang.diem_tich_luy;
    let id_tai_khoan = khachhang.id_tai_khoan;

    let numberValidateError = 0;
    if (!ten || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên khách hàng không được để trống"));
        numberValidateError += 1;
    }
    if (!sdt || sdt === "") {
        $(alertContainer).append(createAlerts("danger", "Số điện thoại không được để trống"));
        numberValidateError += 1;
    }
    else if (sdt.search(/^[0-9]+$/) < 0) {
        $(alertContainer).append(createAlerts("danger", "Số điện thoại chỉ được có số"));
        numberValidateError += 1;
    }
    else if (0 > sdt.length || sdt.length > 15) {
        $(alertContainer).append(createAlerts("danger", "Số điện thoại chỉ được có từ 1 đến 15 số"));
        numberValidateError += 1;
    }
    if (!diem_tich_luy || diem_tich_luy === "") {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy không được để trống"));
        numberValidateError += 1;
    }
    else if (diem_tich_luy.search(/^[0-9]+$/) < 0) {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy chỉ được có số"));
        numberValidateError += 1;
    }
    else if (parseInt(diem_tich_luy) < 0) {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy phải là số không âm"));
        numberValidateError += 1;
    }
    if (!id_tai_khoan || id_tai_khoan === "") {
        $(alertContainer).append(createAlerts("danger", "Username không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};