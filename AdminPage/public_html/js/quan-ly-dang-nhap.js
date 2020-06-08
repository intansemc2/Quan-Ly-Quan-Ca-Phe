let tableQuanLyTaiKhoan;
$(document).ready(function () {
//Active dataTable
    tableQuanLyTaiKhoan = $("#tableQuanLyTaiKhoan").DataTable({
        "columnDefs": [{
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = $(data).text() === "0" ? "User" : ($(data).text() === "1" ? "Nhân viên" : ($(data).text() === "2" ? "Admin" : data));
                    return `<span class="type">${renderData}</span>`;
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
        let modifyTaiKhoan = extractModelThemTaiKhoan();

        let username = modifyTaiKhoan.username;
        let password = modifyTaiKhoan.password;
        let re_password = modifyTaiKhoan.re_password;
        let type = modifyTaiKhoan.type;
        //Validate
        let numberValidateError = 0;
        if (username === undefined || username === "") {
            $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", "Username không được để trống"));
            numberValidateError += 1;
        }

        if (password === undefined || password === "") {
            $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", "Password không được để trống"));
            numberValidateError += 1;
        }

        if (re_password === undefined || re_password === "") {
            $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", "RePassword không được để trống"));
            numberValidateError += 1;
        }

        if (password !== re_password) {
            $("#modelThemTaiKhoan").find("#themTaiKhoanAlerts").append(createAlerts("danger", "Password không được khác RePassword"));
            numberValidateError += 1;
        }

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

    $("#modelSuaTaiKhoan").find("#suaTaiKhoanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").html("");
        let modifyTaiKhoan = extractModelSuaTaiKhoan();

        let username = modifyTaiKhoan.username;
        let password = modifyTaiKhoan.password;
        let re_password = modifyTaiKhoan.re_password;
        let type = modifyTaiKhoan.type;
        //Validate
        let numberValidateError = 0;
        if (username === undefined || username === "") {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Username không được để trống"));
            numberValidateError += 1;
        }

        if (password === undefined || password === "") {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Password không được để trống"));
            numberValidateError += 1;
        }

        if (re_password === undefined || re_password === "") {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "RePassword không được để trống"));
            numberValidateError += 1;
        }

        if (password !== re_password) {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Password không được khác RePassword"));
            numberValidateError += 1;
        }

        if (numberValidateError > 0) {
            return;
        }

        //Tạo tài khoản mới 
        let newTaiKhoan = modifyTaiKhoan;
        let oldUsername = $("#modelSuaTaiKhoan").attr("username");
        let oldTaiKhoanRow = $("tableQuanLyTaiKhoan").find("button[modify='" + oldUsername + "']").parents("tr");

        //Sửa xuống CSDL
        let suaTKResult = true;

        //Sửa thành công
        if (suaTKResult) {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa tài khoản mới vào bảng
            $("#modelSuaTaiKhoan").find(".close").trigger("click");
            tableQuanLyTaiKhoan.row.add(createTableQLTKArrayDataRow(newTaiKhoan)).draw();
        }
        //Sửa thất bại
        else {
            $("#modelSuaTaiKhoan").find("#suaTaiKhoanAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $('#modelSuaTaiKhoan').on('show.bs.modal', function (event) {
        let suaTaiKhoanTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyTaiKhoan = extractDataFromTableQLTKRow(suaTaiKhoanTriggered.parents("tr"));

        $(this).attr("username", modifyTaiKhoan.username);
        setModelSuaTaiKhoan(modifyTaiKhoan);
    });
});

let createTableQLTKRow = (taikhoan) => {
    return `<tr>
<td><span class="username">${taikhoan.username}</span></td>
<td><span class="password">${taikhoan.password}</span></td>
<td><span class="type">${taikhoan.type}</span></td>
<td>
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaTaiKhoan" modify="${taikhoan.username}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLNVRow(this)"><i class="fas fa-trash"></i></button>
</td>
</tr>`;
};

let createTableQLTKArrayDataRow = (taikhoan) => {
    return [
        `<span class="username">${taikhoan.username}</span>`,
        `<span class="password">${taikhoan.password}</span>`,
        `<span class="type">${taikhoan.type}</span>`,
        `<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaTaiKhoan" modify="${taikhoan.username}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLNVRow(this)"><i class="fas fa-trash"></i></button>`];
};

let extractDataFromTableQLTKRow = (tableRow) => {
    let username = $(tableRow).find(".username").text();
    let password = $(tableRow).find(".password").text();
    let type = $(tableRow).find(".type").text();
    type = type === "User" ? 0 : (type === "Nhân viên" ? 1 : (type === "Admin" ? 2 : type));
    return {username: username, password: password, type: type};
};

let refreshDataTableQLTK = () => {

    tableQuanLyTaiKhoan.clear();
    //Lấy thông tin tài khoản
    let taikhoans = new Array();
    let n = Math.floor(Math.random() * 10);
    for (let i = 0; i < n; i += 1) {
        let username = "User" + ("" + i).padStart(3, "0");
        let password = "Pass" + i;
        let type = Math.floor(Math.random() * 3);
        taikhoans.push({username: username, password: password, type: type});
    }

//Thêm vào bảng
    for (let taikhoan of taikhoans) {
        tableQuanLyTaiKhoan.row.add($(createTableQLTKRow(taikhoan))[0]);
    }
    tableQuanLyTaiKhoan.draw();
};

let deleteTableQLNVRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyTaiKhoan.row(tableRow).remove().draw();
};

let extractModelThemTaiKhoan = () => {
//Lấy thông tin
    let username = $("#modelThemTaiKhoan").find("#themTaiKhoanUsername").val();
    let password = $("#modelThemTaiKhoan").find("#themTaiKhoanPassword").val();
    let re_password = $("#modelThemTaiKhoan").find("#themTaiKhoanConfirmPassword").val();
    let type = $("#modelThemTaiKhoan").find("#themTaiKhoanLoaiTaiKhoan").val();
    return {username: username, password: password, re_password: re_password, type: type};
};

let extractModelSuaTaiKhoan = () => {
//Lấy thông tin
    let username = $("#modelSuaTaiKhoan").find("#suaTaiKhoanUsername").val();
    let password = $("#modelSuaTaiKhoan").find("#suaTaiKhoanPassword").val();
    let re_password = $("#modelSuaTaiKhoan").find("#suaTaiKhoanConfirmPassword").val();
    let type = $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").val();
    return {username: username, password: password, re_password: re_password, type: type};
};

let setModelSuaTaiKhoan = (modifyTaiKhoan) => {
    $("#modelSuaTaiKhoan").find("#suaTaiKhoanUsername").val(modifyTaiKhoan.username);
    $("#modelSuaTaiKhoan").find("#suaTaiKhoanPassword").val(modifyTaiKhoan.password);
    $("#modelSuaTaiKhoan").find("#suaTaiKhoanConfirmPassword").val(modifyTaiKhoan.password);
    $("#modelSuaTaiKhoan").find("#suaTaiKhoanLoaiTaiKhoan").val(modifyTaiKhoan.type);
};

let changeModifyInformation = (aria_labelledby, modal_title, modifyTaiKhoanConfirm) => {
    $("#modelModifyTaiKhoan").attr("aria-labelledby", aria_labelledby);
    $("#modelModifyTaiKhoan").find(".modal-title").html(modal_title);
    $("#modelModifyTaiKhoan").find("#modifyTaiKhoanConfirm").attr("value", modifyTaiKhoanConfirm);
};