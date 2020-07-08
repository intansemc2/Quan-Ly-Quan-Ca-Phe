let tableQuanLyNhanVien;
let taikhoans = [];
let nhanvienTypes = [];

$(document).ready(function () {
    //Active dataTable
    tableQuanLyNhanVien = $("#tableQuanLyNhanVien").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_nhan_vien" data="${data}">${renderData}</span>`;
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
                    let typeIndex = data;
                    let renderData = nhanvienTypes[typeIndex] ? nhanvienTypes[typeIndex] : data;
                    return `<span class="type" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let taikhoanRender = taikhoans.find(item => item.id_tai_khoan == data);
                    let renderData = `${taikhoanRender.username}`;
                    return `<span class="id_tai_khoan" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let nhanvien = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaNhanVien" modify="${nhanvien.id_nhan_vien}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLNVRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLNV();

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
        //Lọc ra nhân viên được chọn
        for (let tableRow of tableRows) {
            let nhanVien = extractDataFromTableQLNVRow(tableRow);
            markeds.push(nhanVien);
        }
        //Kiểm tra xem có dòng nào được chọn hay chưa
        $("#tableQuanLyNhanVienAlert").empty();

        if (tableRows.length <= 0 || markeds.length <= 0) {
            $("#tableQuanLyNhanVienAlert").append(createAlerts("warning", "Chưa có dòng nào được chọn"));
            return;
        }
        //Gửi yêu cầu xóa 
        $.post("/NhanVien/DeleteMarked", { JsonInput: JSON.stringify(markeds.map(item => item.id_nhan_vien)) }, function (data) {
            //Lấy thông tin nhân viên
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdNhanVien/g, `id_nhan_vien`);
            inputJson = inputJson.replace(/Result/g, `result`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            let deleteSuccess = [];
            let deleteFail = [];
            for (let i = 0; i < outputs.length; i += 1) {
                let output = JSON.parse(outputs[i]);
                if (output.result >= 0) {
                    let tableRow = tableRows[i];
                    tableQuanLyNhanVien.row(tableRow).remove().draw();
                    deleteSuccess.push(markeds[i].ten);
                }
                else {
                    deleteFail.push(markeds[i].ten);
                }
            }
            //Thông báo kết quả xóa
            if (deleteSuccess.length > 0) {
                $("#tableQuanLyNhanVienAlert").append(createAlerts("success", `Xóa thành công ${deleteSuccess.length} nhân viên:   ${deleteSuccess.join(",  ")}`));
            }
            if (deleteFail.length > 0) {
                $("#tableQuanLyNhanVienAlert").append(createAlerts("success", `Xóa thất bại ${deleteFail.length} nhân viên: ${deleteFail.join(", ")}`));
            }
            //Bỏ đánh dấu nếu có
            $(".custom-toggle-button").each((index, element) => {
                setToggleStatus(element, false);
            });
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyNhanVienAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyNhanVienAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#xoaTatCa").click(function () {
        $("#tableQuanLyNhanVienAlert").empty();

        $.post("/NhanVien/DeleteAll", function (data) {
            //Lấy thông tin nhân viên
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output > 0) {
                tableQuanLyNhanVien.clear().draw();
                $("#tableQuanLyNhanVienAlert").append(createAlerts("success", "Xóa thành công"));
            } 
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyNhanVienAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyNhanVienAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLNV();
    });
    $("#modelThemNhanVien").find("#themNhanVienConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemNhanVien").find("#themNhanVienAlerts").html("");

        //Validate
        let modifyNhanVien = extractModelThemNhanVien();
        let numberValidateError = validateNhanVienInformation($("#modelThemNhanVien").find("#themNhanVienAlerts"), modifyNhanVien);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo nhân viên mới 
        let newNhanVien = modifyNhanVien;

        //Thêm xuống CSDL
        $("#tableQuanLyNhanVienAlert").empty();

        $.post("/NhanVien/Add", { Ten: newNhanVien.ten, Sdt: newNhanVien.sdt, Loai: newNhanVien.type, IdTaiKhoan: newNhanVien.id_tai_khoan }, function (data) {
            //Lấy thông tin nhân viên
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdNhanVien/g, `id_nhan_vien`);
            inputJson = inputJson.replace(/Ten/g, `ten`);
            inputJson = inputJson.replace(/Sdt/g, `sdt`);
            inputJson = inputJson.replace(/Loai/g, `type`);
            inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
            let outputs = JSON.parse(inputJson);

            let themNVResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                themNVResult = false;
            }

            //Thêm thành công
            if (themNVResult) {
                $("#modelThemNhanVien").find("#themNhanVienAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm nhân viên mới vào bảng
                $("#modelThemNhanVien").find(".close").trigger("click");
                tableQuanLyNhanVien.row.add(createTableQLNVArrayDataRow(outputs.newNhanVien)).draw();
                $("#tableQuanLyNhanVienAlert").append(createAlerts("success", `Thêm thành công nhân viên ${newNhanVien.ten}`));
            }
            //Thêm thất bại
            else {
                $("#modelThemNhanVien").find("#themNhanVienAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemNhanVien").find("#themNhanVienAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#modelThemNhanVien").find("#themNhanVienAlerts").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#modelThemNhanVien").find("#themNhanVienAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelThemNhanVien").find("#themNhanVienReset").click(function () {
        setModelThemNhanVien({});
    });

    $("#modelSuaNhanVien").find("#suaNhanVienConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaNhanVien").find("#suaNhanVienAlerts").html("");

        //Validate
        let modifyNhanVien = extractModelSuaNhanVien();
        let numberValidateError = validateNhanVienInformation($("#modelSuaNhanVien").find("#suaNhanVienAlerts"), modifyNhanVien);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo nhân viên mới 
        let newNhanVien = modifyNhanVien;
        let oldIdNhanVien = $("#modelSuaNhanVien").attr("id_nhan_vien");
        newNhanVien.id_nhan_vien = oldIdNhanVien;
        let oldNhanVienRow = $("#tableQuanLyNhanVien").find("button[modify='" + oldIdNhanVien + "']").parents("tr");

        //Sửa xuống CSDL
        $("#tableQuanLyNhanVienAlert").empty();

        $.post("/NhanVien/Edit", { Ten: newNhanVien.ten, Sdt: newNhanVien.sdt, Loai: newNhanVien.type, IdTaiKhoan: newNhanVien.id_tai_khoan, OldIdNhanVien: oldIdNhanVien }, function (data) {
            //Lấy thông tin nhân viên
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            let suaNVResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                suaNVResult = false;
            }

            //Sửa thành công
            if (suaNVResult) {
                $("#modelSuaNhanVien").find("#suaNhanVienAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa nhân viên mới vào bảng
                $("#modelSuaNhanVien").find(".close").trigger("click");
                tableQuanLyNhanVien.row(oldNhanVienRow).data(createTableQLNVArrayDataRow(newNhanVien)).draw();
                $("#tableQuanLyNhanVienAlert").append(createAlerts("success", `Sửa thành công nhân viên ${newNhanVien.ten}`));
            }
            //Sửa thất bại
            else {
                $("#modelSuaNhanVien").find("#suaNhanVienAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaNhanVien").find("#suaNhanVienAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#modelSuaNhanVien").find("#suaNhanVienAlerts").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
                $("#modelSuaNhanVien").find("#suaNhanVienAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelSuaNhanVien").find("#suaNhanVienReset").click(function () {
        setModelSuaNhanVien({});
    });

    $('#modelSuaNhanVien').on('show.bs.modal', function (event) {
        let suaNhanVienTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyNhanVien = extractDataFromTableQLNVRow(suaNhanVienTriggered.parents("tr"));

        $(this).attr("id_nhan_vien", modifyNhanVien.id_nhan_vien);
        setModelSuaNhanVien(modifyNhanVien);
    });
});

let createTableQLNVArrayDataRow = (nhanvien) => {
    return [nhanvien.id_nhan_vien, nhanvien.ten, nhanvien.sdt, nhanvien.type, nhanvien.id_tai_khoan, nhanvien];
};

let extractDataFromTableQLNVRow = (tableRow) => {
    let id_nhan_vien = $(tableRow).find(".id_nhan_vien").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let sdt = $(tableRow).find(".sdt").attr("data");
    let id_tai_khoan = $(tableRow).find(".id_tai_khoan").attr("data");
    let type = $(tableRow).find(".type").attr("data");
    return { id_nhan_vien: id_nhan_vien, ten: ten, sdt: sdt, type: type, id_tai_khoan: id_tai_khoan };
};

let refreshDataTableQLNV = () => {
    $("#tableQuanLyNhanVienAlert").empty();

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
        $("#modelThemNhanVien").find("#themNhanVienUsername").html("");
        $("#modelSuaNhanVien").find("#suaNhanVienUsername").html("");
        for (let taikhoan of taikhoans) {
            let newUsernameOption = `<option value="${taikhoan.id_tai_khoan}">${taikhoan.username}</option>`;
            $("#modelThemNhanVien").find("#themNhanVienUsername").append(newUsernameOption);
            $("#modelSuaNhanVien").find("#suaNhanVienUsername").append(newUsernameOption);
        }

        $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", "Làm mới thông tin tài khoản thành công"));


        //Lấy thông tin loại
        $.post("/NhanVien/GetLoais", function (data) {
            //Lấy thông tin nhân viên
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Thêm vào biến
            nhanvienTypes = [];
            for (let output of outputs) {
                nhanvienTypes.push(output);
            }
            //Thêm option type
            $("#modelThemNhanVien").find("#themNhanVienLoaiNhanVien").html("");
            $("#modelSuaNhanVien").find("#suaNhanVienLoaiNhanVien").html("");
            for (let i = 0; i < nhanvienTypes.length; i += 1) {
                let type = nhanvienTypes[i];
                let newLoaiOption = `<option value="${i}">${type}</option>`;
                $("#modelThemNhanVien").find("#themNhanVienLoaiNhanVien").append(newLoaiOption);
                $("#modelSuaNhanVien").find("#suaNhanVienLoaiNhanVien").append(newLoaiOption);
            }
            $("#tableQuanLyNhanVienAlert").append(createAlerts("success", "Làm mới loại nhân viên thành công"));


            tableQuanLyNhanVien.clear();

            $.post("/NhanVien/GetAll", function (data) {
                //Lấy thông tin nhân viên
                let inputJson = data;
                inputJson = inputJson.replace(/&quot;/g, `"`);
                inputJson = inputJson.replace(/IdNhanVien/g, `id_nhan_vien`);
                inputJson = inputJson.replace(/Ten/g, `ten`);
                inputJson = inputJson.replace(/Sdt/g, `sdt`);
                inputJson = inputJson.replace(/Loai/g, `type`);
                inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
                let outputs = JSON.parse(inputJson);

                //Thêm vào bảng
                for (let output of outputs) {
                    tableQuanLyNhanVien.row.add(createTableQLNVArrayDataRow(output));
                }
                tableQuanLyNhanVien.draw();
                $("#tableQuanLyNhanVienAlert").append(createAlerts("success", "Làm mới thành công"));
            })
                .done(function () {
                })
                .fail(function () {
                    $("#tableQuanLyNhanVienAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
                })
                .always(function () {
                });

        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyNhanVienAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
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

let deleteTableQLNVRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");

    let nhanVien = extractDataFromTableQLNVRow(tableRow);
    $("#tableQuanLyNhanVienAlert").empty();

    $.post("/NhanVien/Delete", { IdNhanVien: nhanVien.id_nhan_vien }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/&quot;/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output > 0) {
            tableQuanLyNhanVien.row(tableRow).remove().draw();
            $("#tableQuanLyNhanVienAlert").append(createAlerts("success", `Xóa thành công nhân viên ${nhanVien.ten}`));
        }
        //Bỏ đánh dấu nếu có
        $(".custom-toggle-button").each((index, element) => {
            setToggleStatus(element, false);
        });
    })
        .done(function () {
        })
        .fail(function () {
            $("#tableQuanLyNhanVienAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
        })
        .always(function () {
        });
};

let extractModelThemNhanVien = () => {
    return extractFromModel($("#modelThemNhanVien"));
};

let extractModelSuaNhanVien = () => {
    return extractFromModel($("#modelSuaNhanVien"));
};

let extractFromModel = (model) => {
    //Lấy thông tin
    let id_nhan_vien = $(model).find(".id_nhan_vien").val();
    let ten = $(model).find(".ten").val();
    let sdt = $(model).find(".sdt").val();
    let type = $(model).find(".type").val();
    let id_tai_khoan = $(model).find(".id_tai_khoan").val();
    return { id_nhan_vien: id_nhan_vien, ten: ten, sdt: sdt, type: type, id_tai_khoan: id_tai_khoan };
};

let setModelThemNhanVien = (modifyNhanVien) => {
    setToModel($("#modelThemNhanVien"), modifyNhanVien);
};

let setModelSuaNhanVien = (modifyNhanVien) => {
    setToModel($("#modelSuaNhanVien"), modifyNhanVien);
};

let setToModel = (model, nhanvien) => {
    $(model).find(".id_nhan_vien").val(nhanvien.id_nhan_vien);
    $(model).find(".ten").val(nhanvien.ten);
    $(model).find(".sdt").val(nhanvien.sdt);
    $(model).find(".type").val(nhanvien.type);
    $(model).find(".id_tai_khoan").val(nhanvien.id_tai_khoan);
};

let validateNhanVienInformation = (alertContainer, nhanvien) => {
    //Validate
    let id_nhan_vien = nhanvien.id_nhan_vien;
    let ten = nhanvien.ten;
    let sdt = nhanvien.sdt;
    let type = nhanvien.type;
    let id_tai_khoan = nhanvien.id_tai_khoan;

    let numberValidateError = 0;
    if (!ten || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên nhân viên không được để trống"));
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
    if (!type || type === "") {
        $(alertContainer).append(createAlerts("danger", "Loại không được để trống"));
        numberValidateError += 1;
    }
    if (!id_tai_khoan || id_tai_khoan === "") {
        $(alertContainer).append(createAlerts("danger", "Id tài khoản không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};