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
            },            {
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
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLTKRow(this)"><i class="fas fa-trash"></i></button>`
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
        let markedRows = $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyTaiKhoan.rows(markedRows).remove().draw();
    });
    $("#xoaTatCa").click(function () {
        tableQuanLyTaiKhoan.clear().draw();
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
        let themTKResult = true;
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
        }
    });

    $("#modelThemTaiKhoan").find("#themTaiKhoanReset").click(function() {
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
        let suaTKResult = true;

        //Sửa thành công
        if (suaTKResult) {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa tài khoản mới vào bảng
            $("#modelSuaTaiKhoan").find(".close").trigger("click");
            tableQuanLyTaiKhoan.row(oldTaiKhoanRow).data(createTableQLTKArrayDataRow(newTaiKhoan)).draw();            
        }
        //Sửa thất bại
        else {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaTaiKhoan").find("#suaTaiKhoanReset").click(function() {
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
    let type = taikhoanTypes[$(tableRow).find(".type").attr("data")];
    return {username: username, password: password, re_password: password, type: type};
};

let refreshDataTableQLTK = () => {
    let n = Math.floor(Math.random() * 10);
    //Lấy thông tin types
    taikhoanTypes = ["Người dùng", "Nhân viên", "Admin"];

    //Thêm option type
    $("#modelThemTaiKhoan").find("#themTaiKhoanLoaiTaiKhoan").html("");
    $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").html("");
    for (let type of taikhoanTypes) {
        let newLoaiOption = `<option value="${type}">${type}</option>`;
        $("#modelThemTaiKhoan").find("#themTaiKhoanLoaiTaiKhoan").append(newLoaiOption);
        $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").append(newLoaiOption);
    }

    tableQuanLyTaiKhoan.clear();
    //Lấy thông tin tài khoản
    let taikhoans = new Array();    
    for (let i = 0; i < n; i += 1) {
        let password = `Mật khẩu Tài khoản  ${i.toString().padStart(3, "0")}`;
        let username = `User${i.toString().padStart(3, "0")}`;
        let type = Math.floor(Math.random() * taikhoanTypes.length);
        taikhoans.push({username: username, password: password, re_password: password, type: type,});
    }

    //Thêm vào bảng
    for (let taikhoan of taikhoans) {
        tableQuanLyTaiKhoan.row.add(createTableQLTKArrayDataRow(taikhoan));
    }
    tableQuanLyTaiKhoan.draw();
};

let deleteTableQLTKRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyTaiKhoan.row(tableRow).remove().draw();
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
    return {username: username, password: password, re_password: re_password, type: type};
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
    let type =taikhoan.type;

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