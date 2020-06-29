let tableQuanLyTaiKhoan;
let taikhoanTypes = [];

$(document).ready(function () {
    //Active dataTable
    tableQuanLyTaiKhoan = $("#tableQuanLyTaiKhoan").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                }
            }, {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="password" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let typeIndex = data;
                    let renderData = taikhoanTypes[typeIndex] ? taikhoanTypes[typeIndex] : data;
                    return `<span class="type" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let taikhoan = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaTaiKhoan" modify="${taikhoan.username}"><i class="fas fa-edit"></i></button>
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
        $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton)).each((index, element) => deleteTableQLTKRow($(element)) );        
    });
    $("#xoaTatCa").click(function () {        
        $.post("/TaiKhoan/DeleteAll", function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output >= 0) {
                tableQuanLyTaiKhoan.clear().draw();
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể xóa dữ liệu từ CSDL");
            })
            .always(function () {
            });
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLTK();
    });
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
        $.post("/TaiKhoan/Add", { Username: newTaiKhoan.username, Password: newTaiKhoan.password, RePassword: newTaiKhoan.re_password, Type: newTaiKhoan.type }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            let outputs = JSON.parse(inputJson);

            let themTKResult = true;
            if (outputs.errors.Length > 0 || outputs.output < 0) {
                themTKResult = false;
            }

            //Thêm thành công
            if (themTKResult) {
                $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm tài khoản mới vào bảng
                $("#modelThemTaiKhoan").find(".close").trigger("click");
                tableQuanLyTaiKhoan.row.add(createTableQLTKArrayDataRow(newTaiKhoan)).draw();
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
                alert("Không thể thêm dữ liệu vào CSDL");
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
        let oldUsername = $("#modelSuaTaiKhoan").attr("username");
        let oldTaiKhoanRow = $("#tableQuanLyTaiKhoan").find("button[modify='" + oldUsername + "']").parents("tr");

        //Sửa xuống CSDL
        $.post("/TaiKhoan/Edit", { Username: newTaiKhoan.username, Password: newTaiKhoan.password, RePassword: newTaiKhoan.re_password, Type: newTaiKhoan.type, OldUsername: oldUsername }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/&quot;/g, `"`);
            inputJson = inputJson.replace(/Username/g, `username`);
            inputJson = inputJson.replace(/Password/g, `password`);
            inputJson = inputJson.replace(/Type/g, `type`);
            let outputs = JSON.parse(inputJson);

            let suaTKResult = true;
            if (outputs.errors.length > 0 || outputs.output < 0) {
                suaTKResult = false;
            }

            //Sửa thành công
            if (suaTKResult) {
                $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa tài khoản mới vào bảng
                $("#modelSuaTaiKhoan").find(".close").trigger("click");
                tableQuanLyTaiKhoan.row(oldTaiKhoanRow).data(createTableQLTKArrayDataRow(outputs.newTaiKhoan)).draw();
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
                alert("Không thể sửa dữ liệu vào CSDL");
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

        $(this).attr("username", modifyTaiKhoan.username);
        setModelSuaTaiKhoan(modifyTaiKhoan);
    });
});

let createTableQLTKArrayDataRow = (taikhoan) => {
    return [taikhoan.username, taikhoan.password, taikhoan.type, taikhoan];
};

let extractDataFromTableQLTKRow = (tableRow) => {
    let username = $(tableRow).find(".username").attr("data");
    let password = $(tableRow).find(".password").attr("data");
    let type = $(tableRow).find(".type").attr("data");
    return { username: username, password: password, re_password: password, type: type };
};

let refreshDataTableQLTK = () => {
    //Lấy thông tin types
    taikhoanTypes = ["Người dùng", "Nhân viên", "Admin"];

    //Thêm option type
    $("#modelThemTaiKhoan").find("#themTaiKhoanLoaiTaiKhoan").html("");
    $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").html("");
    for (let i = 0; i < taikhoanTypes.length; i+=1) {
        let type = taikhoanTypes[i];
        let newLoaiOption = `<option value="${i}">${type}</option>`;
        $("#modelThemTaiKhoan").find("#themTaiKhoanLoaiTaiKhoan").append(newLoaiOption);
        $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").append(newLoaiOption);
    }

    tableQuanLyTaiKhoan.clear();

    $.post("/TaiKhoan/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/&quot;/g, `"`);
        inputJson = inputJson.replace(/Username/g, `username`);
        inputJson = inputJson.replace(/Password/g, `password`);
        inputJson = inputJson.replace(/Type/g, `type`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyTaiKhoan.row.add(createTableQLTKArrayDataRow(output));
        }
        tableQuanLyTaiKhoan.draw();
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });
};

let deleteTableQLTKRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");

    let taiKhoan = extractDataFromTableQLTKRow(tableRow);

    $.post("/TaiKhoan/Delete", { Username: taiKhoan.username }, function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/&quot;/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {
            tableQuanLyTaiKhoan.row(tableRow).remove().draw();
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể xóa dữ liệu từ CSDL");
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