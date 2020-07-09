let tableQuanLyTaiKhoan;
let nhanvienTypes = [];

$(document).ready(function () {
    //Active dataTable
    tableQuanLyTaiKhoan = $("#tableQuanLyTaiKhoan").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_tai_khoan" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                }
            }, {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="password" data="${data}">${renderData}</span>`;
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
                    let taikhoan = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaTaiKhoan" modify="${taikhoan.id_tai_khoan}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLTKRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLTK();

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
        //Lọc ra tài khoản được chọn
        for (let tableRow of tableRows) {
            let taiKhoan = extractDataFromTableQLTKRow(tableRow);
            markeds.push(taiKhoan);
        }
        //Kiểm tra xem có dòng nào được chọn hay chưa
        $("#tableQuanLyTaiKhoanAlert").empty();
        if (tableRows.length <= 0 || markeds.length <= 0) {
            $("#tableQuanLyTaiKhoanAlert").append(createAlerts("warning", "Chưa có dòng nào được chọn"));
            return;
        }
        //Gửi yêu cầu xóa 
        $.post("/TaiKhoan/DeleteMarked", { JsonInput: JSON.stringify(markeds.map(item => item.id_tai_khoan)) }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
            inputJson = inputJson.replace(/Result/g, `result`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            let deleteSuccess = [];
            let deleteFail = [];
            for (let i = 0; i < outputs.length; i += 1) {
                let output = JSON.parse(outputs[i]);
                if (output.result >= 0) {
                    let tableRow = tableRows[i];
                    tableQuanLyTaiKhoan.row(tableRow).remove().draw();
                    deleteSuccess.push(markeds[i].username);
                }
                else {
                    deleteFail.push(markeds[i].username);
                }
            }
            //Thông báo kết quả xóa
            if (deleteSuccess.length > 0) {
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", `Xóa thành công ${deleteSuccess.length} tài khoản:   ${deleteSuccess.join(",  ")}`));
            }
            if (deleteFail.length > 0) {
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", `Xóa thất bại ${deleteFail.length} tài khoản: ${deleteFail.join(", ")}`));
            }
            //Bỏ đánh dấu nếu có
            $(".custom-toggle-button").each((index, element) => {
                setToggleStatus(element, false);
            });
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#xoaTatCa").click(function () {
        $("#tableQuanLyTaiKhoanAlert").empty();
        $.post("/TaiKhoan/DeleteAll", function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output > 0) {
                tableQuanLyTaiKhoan.clear().draw();
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", "Xóa thành công"));
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("danger", "Xóa thất bại"));
            })
            .always(function () {
            });
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLTK();
    });

    //thêm tk
    $("#modelThemTaiKhoan").find("#themTaiKhoanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").html("");

        //Validate
        let modifyTaiKhoan = extractModelThemTaiKhoan();
        let numberValidateError = validateTaiKhoanInformation($("#modelThemTaiKhoan").find("#themTaiKhoanAlerts"), modifyTaiKhoan);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo tài khoản mới 
        let newTaiKhoan = modifyTaiKhoan;

        //Thêm xuống CSDL     
        $("#tableQuanLyTaiKhoanAlert").empty();
        $.post("/TaiKhoan/Add", { Username: newTaiKhoan.username, Password: newTaiKhoan.password, RePassword: newTaiKhoan.re_password, Type: newTaiKhoan.type }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
            inputJson = inputJson.replace(/NewTaiKhoan/g, `newTaiKhoan`);
            inputJson = inputJson.replace(/IdTaiKhoan/g, `id_tai_khoan`);
            inputJson = inputJson.replace(/Username/g, `username`);
            inputJson = inputJson.replace(/Password/g, `password`);
            inputJson = inputJson.replace(/Type/g, `type`);
            let outputs = JSON.parse(inputJson);

            let themTKResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                themTKResult = false;
            }

            //Thêm thành công
            if (themTKResult) {
                $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm tài khoản mới vào bảng
                $("#modelThemTaiKhoan").find(".close").trigger("click");
                tableQuanLyTaiKhoan.row.add(createTableQLTKArrayDataRow(outputs.newTaiKhoan)).draw();
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", `Thêm thành công tài khoản ${newTaiKhoan.username}`));
            }
            //Thêm thất bại
            else {
                $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", "Không gửi dữ liệu đi"));
                $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelThemTaiKhoan").find("#themTaiKhoanReset").click(function () {
        setModelThemTaiKhoan({});
    });

    $("#modelSuaTaiKhoan").find("#suaTaiKhoanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").html("");

        //Validate
        let modifyTaiKhoan = extractModelSuaTaiKhoan();
        let numberValidateError = validateTaiKhoanInformation($("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts"), modifyTaiKhoan);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo tài khoản mới 
        let newTaiKhoan = modifyTaiKhoan;
        let oldIdTaiKhoan = $("#modelSuaTaiKhoan").attr("id_tai_khoan");
        newTaiKhoan.id_tai_khoan = oldIdTaiKhoan;
        let oldTaiKhoanRow = $("#tableQuanLyTaiKhoan").find("button[modify='" + oldIdTaiKhoan + "']").parents("tr");

        //Sửa xuống CSDL
        $("#tableQuanLyTaiKhoanAlert").empty();
        $.post("/TaiKhoan/Edit", { IdTaiKhoan: newTaiKhoan.id_tai_khoan, Username: newTaiKhoan.username, Password: newTaiKhoan.password, Type: newTaiKhoan.type, OldIdTaiKhoan: oldIdTaiKhoan }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            let suaTKResult = true;
            if (outputs.errors.length > 0 || outputs.output <= 0) {
                suaTKResult = false;
            }

            //Sửa thành công
            if (suaTKResult) {
                $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa tài khoản mới vào bảng
                $("#modelSuaTaiKhoan").find(".close").trigger("click");
                tableQuanLyTaiKhoan.row(oldTaiKhoanRow).data(createTableQLTKArrayDataRow(newTaiKhoan)).draw();
                $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", `Sửa thành công tài khoản ${newTaiKhoan.username}`));
            }
            //Sửa thất bại
            else {
                $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
                $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });
    });

    $("#modelSuaTaiKhoan").find("#suaTaiKhoanReset").click(function () {
        setModelSuaTaiKhoan({});
    });

    $('#modelSuaTaiKhoan').on('show.bs.modal', function (event) {
        let suaTaiKhoanTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyTaiKhoan = extractDataFromTableQLTKRow(suaTaiKhoanTriggered.parents("tr"));

        $(this).attr("id_tai_khoan", modifyTaiKhoan.id_tai_khoan);
        setModelSuaTaiKhoan(modifyTaiKhoan);
    });
});

let createTableQLTKArrayDataRow = (taikhoan) => {
    return [taikhoan.id_tai_khoan, taikhoan.username, taikhoan.password, taikhoan.type, taikhoan];
};

let extractDataFromTableQLTKRow = (tableRow) => {
    let id_tai_khoan = $(tableRow).find(".id_tai_khoan").attr("data");
    let username = $(tableRow).find(".username").attr("data");
    let password = $(tableRow).find(".password").attr("data");
    let type = $(tableRow).find(".type").attr("data");
    return { id_tai_khoan: id_tai_khoan, username: username, password: password, re_password: password, type: type };
};

let refreshDataTableQLTK = () => {    
    $("#tableQuanLyTaiKhoanAlert").empty();

    $.post("/TaiKhoan/GetLoais", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/&quot;/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào biến
        nhanvienTypes = [];
        for (let output of outputs) {
            nhanvienTypes.push(output);
        }
        //Thêm option type
        $("#modelThemTaiKhoan").find("#themTaiKhoanLoaiTaiKhoan").html("");
        $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").html("");
        for (let i = 0; i < nhanvienTypes.length; i += 1) {
            let type = nhanvienTypes[i];
            let newLoaiOption = `<option value="${i}">${type}</option>`;
            $("#modelThemTaiKhoan").find("#themTaiKhoanLoaiTaiKhoan").append(newLoaiOption);
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").append(newLoaiOption);
        }
        $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", "Làm mới loại tài khoản thành công"));
    })
        .done(function () {
        })
        .fail(function () {
            $("#tableQuanLyTaiKhoanAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
        })
        .always(function () {
        });

    tableQuanLyTaiKhoan.clear();    

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
        for (let output of outputs) {
            tableQuanLyTaiKhoan.row.add(createTableQLTKArrayDataRow(output));
        }
        tableQuanLyTaiKhoan.draw();
        $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", "Làm mới thành công"));
    })
        .done(function () {
        })
        .fail(function () {
            $("#tableQuanLyTaiKhoanAlert").append(createAlerts("danger", "Không thể gửi dữ liệu đi"));
        })
        .always(function () {
        });
};

let deleteTableQLTKRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");

    let taiKhoan = extractDataFromTableQLTKRow(tableRow);
    $("#tableQuanLyTaiKhoanAlert").empty();

    $.post("/TaiKhoan/Delete", { IdTaiKhoan: taiKhoan.id_tai_khoan }, function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/&quot;/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output > 0) {
            tableQuanLyTaiKhoan.row(tableRow).remove().draw();
            $("#tableQuanLyTaiKhoanAlert").append(createAlerts("success", `Xóa thành công tài khoản ${taiKhoan.username}`));
        }
        //Bỏ đánh dấu nếu có
        $(".custom-toggle-button").each((index, element) => {
            setToggleStatus(element, false);
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

let extractModelThemTaiKhoan = () => {
    return extractFromModel($("#modelThemTaiKhoan"));
};

let extractModelSuaTaiKhoan = () => {
    return extractFromModel($("#modelSuaTaiKhoan"));
};

let extractFromModel = (model) => {
    //Lấy thông tin
    let username = $(model).find(".username").val();
    let password = $(model).find(".password").val();
    let re_password = $(model).find(".re_password").val();
    let type = $(model).find(".type").val();
    return { username: username, password: password, re_password: re_password, type: type };
};

let setModelThemTaiKhoan = (modifyTaiKhoan) => {
    setToModel($("#modelThemTaiKhoan"), modifyTaiKhoan);
};

let setModelSuaTaiKhoan = (modifyTaiKhoan) => {
    setToModel($("#modelSuaTaiKhoan"), modifyTaiKhoan);
};

let setToModel = (model, taikhoan) => {
    $(model).find(".username").val(taikhoan.username);
    $(model).find(".password").val(taikhoan.password);
    $(model).find(".re_password").val(taikhoan.re_password);
    $(model).find(".type").val(taikhoan.type);
};

let validateTaiKhoanInformation = (alertContainer, taikhoan) => {
    //Validate
    let username = taikhoan.username;
    let password = taikhoan.password;
    let re_password = taikhoan.re_password;
    let type = taikhoan.type;

    let numberValidateError = 0;
    if (!password || password === "") {
        $(alertContainer).append(createAlerts("danger", "Mật khẩu không được để trống"));
        numberValidateError += 1;
    }
    if (!re_password || re_password === "") {
        $(alertContainer).append(createAlerts("danger", "Phần nhập lại Mật khẩu không được để trống"));
        numberValidateError += 1;
    }
    if (re_password !== password) {
        $(alertContainer).append(createAlerts("danger", "Phần nhập lại Mật khẩu phải giống Mật khẩu"));
        numberValidateError += 1;
    }
    if (!type || type === "") {
        $(alertContainer).append(createAlerts("danger", "Loại không được để trống"));
        numberValidateError += 1;
    }
    if (!username || username === "") {
        $(alertContainer).append(createAlerts("danger", "Username không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};