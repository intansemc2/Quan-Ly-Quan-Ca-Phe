let tableQuanLyNhanVien;
let usernames = [];
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
            },            {
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
                    let renderData = data;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let nhanvien = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaNhanVien" modify="${nhanvien.id_nhan_vien}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLNVRow(this)"><i class="fas fa-trash"></i></button>`
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
        let markedRows = $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyNhanVien.rows(markedRows).remove().draw();
    });
    $("#xoaTatCa").click(function () {
        tableQuanLyNhanVien.clear().draw();
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
        newNhanVien.id_nhan_vien = -1;
        //Thêm xuống CSDL
        let themNVResult = true;
        //Thêm thành công
        if (themNVResult) {
            $("#modelThemNhanVien").find("#themNhanVienAlerts").append(createAlerts("success", "Thêm thành công"));
            //Thêm nhân viên mới vào bảng
            $("#modelThemNhanVien").find(".close").trigger("click");
            tableQuanLyNhanVien.row.add(createTableQLNVArrayDataRow(newNhanVien)).draw();
        }
        //Thêm thất bại
        else {
            $("#modelThemNhanVien").find("#themNhanVienAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelThemNhanVien").find("#themNhanVienReset").click(function() {
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
        let oldNhanVienRow = $("#tableQuanLyNhanVien").find("button[modify='" + oldIdNhanVien + "']").parents("tr");

        //Sửa xuống CSDL
        let suaNVResult = true;

        //Sửa thành công
        if (suaNVResult) {
            $("#modelSuaNhanVien").find("#suaNhanVienAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa nhân viên mới vào bảng
            $("#modelSuaNhanVien").find(".close").trigger("click");
            tableQuanLyNhanVien.row(oldNhanVienRow).data(createTableQLNVArrayDataRow(newNhanVien)).draw();            
        }
        //Sửa thất bại
        else {
            $("#modelSuaNhanVien").find("#suaNhanVienAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaNhanVien").find("#suaNhanVienReset").click(function() {
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
    return [nhanvien.id_nhan_vien, nhanvien.ten, nhanvien.sdt, nhanvien.type, nhanvien.username, nhanvien];
};

let extractDataFromTableQLNVRow = (tableRow) => {
    let id_nhan_vien = $(tableRow).find(".id_nhan_vien").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let sdt = $(tableRow).find(".sdt").attr("data");
    let username = $(tableRow).find(".username").attr("data");
    let type = $(tableRow).find(".type").attr("data");
    return {id_nhan_vien: id_nhan_vien, ten: ten, sdt: sdt, type: type, username: username};
};

let refreshDataTableQLNV = () => {
    let n = Math.floor(Math.random() * 10);
    //Lấy thông tin usernames
    usernames = [];
    for (let i = 0; i < n; i += 1) { usernames.push(`User${i.toString().padStart(3, "0")}`); }
    //Lấy thông tin types
    nhanvienTypes = ["Nhân viên", "Admin"];

    //Thêm option username
    $("#modelThemNhanVien").find("#themNhanVienUsername").html("");
    $("#modelSuaNhanVien").find("#suaNhanVienUsername").html("");
    for (let username of usernames) {
        let newUsernameOption = `<option value="${username}">${username}</option>`;
        $("#modelThemNhanVien").find("#themNhanVienUsername").append(newUsernameOption);
        $("#modelSuaNhanVien").find("#suaNhanVienUsername").append(newUsernameOption);
    }

    //Thêm option type
    $("#modelThemNhanVien").find("#themNhanVienLoaiNhanVien").html("");
    $("#modelSuaNhanVien").find("#suaNhanVienLoaiNhanVien").html("");
    for (let i=0; i<nhanvienTypes.length; i+=1) {
        let type = nhanvienTypes[i];
        let newLoaiOption = `<option value="${i}">${type}</option>`;
        $("#modelThemNhanVien").find("#themNhanVienLoaiNhanVien").append(newLoaiOption);
        $("#modelSuaNhanVien").find("#suaNhanVienLoaiNhanVien").append(newLoaiOption);
    }

    tableQuanLyNhanVien.clear();
    //Lấy thông tin nhân viên
    let nhanviens = new Array();    
    for (let i = 0; i < n; i += 1) {
        let id_nhan_vien = i;
        let ten = `Nhân Văn Viên ${i.toString().padStart(3, "0")}`;

        let sdt = "";
        for(let sdtIndex=0; sdtIndex<10; sdtIndex+=1) {
            sdt += Math.floor(Math.random()*10).toString();
        }

        let username = `User${i.toString().padStart(3, "0")}`;
        let type = Math.floor(Math.random() * nhanvienTypes.length);
        nhanviens.push({id_nhan_vien: id_nhan_vien, ten: ten, sdt: sdt, type: type, username: username});
    }

    //Thêm vào bảng
    for (let nhanvien of nhanviens) {
        tableQuanLyNhanVien.row.add(createTableQLNVArrayDataRow(nhanvien));
    }
    tableQuanLyNhanVien.draw();
};

let deleteTableQLNVRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyNhanVien.row(tableRow).remove().draw();
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
    let username = $(model).find(".username").val();
    return {id_nhan_vien: id_nhan_vien, ten: ten, sdt: sdt, type: type, username: username};
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
   $(model).find(".username").val(nhanvien.username);
};

let validateNhanVienInformation = (alertContainer, nhanvien) => {
    //Validate
    let id_nhan_vien = nhanvien.id_nhan_vien;
    let ten = nhanvien.ten;
    let sdt = nhanvien.sdt;
    let type =nhanvien.type;
    let username = nhanvien.username;

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
    if (!username || username === "") {
        $(alertContainer).append(createAlerts("danger", "Username không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};