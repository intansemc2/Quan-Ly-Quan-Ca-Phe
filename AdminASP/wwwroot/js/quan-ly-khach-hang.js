let tableQuanLyKhachHang;
let usernames = [];
let khachhangTypes = [];

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
                    let pointIndex = data;
                    let renderData = khachhangTypes[pointIndex] ? khachhangTypes[pointIndex] : data;
                    return `<span class="point" data="${data}">${renderData}</span>`;
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
                    let khachhang = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaKhachHang" modify="${khachhang.id_khach_hang}"><i class="fas fa-edit"></i></button>
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
        let markedRows = $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyKhachHang.rows(markedRows).remove().draw();
    });
    $("#xoaTatCa").click(function () {
        tableQuanLyKhachHang.clear().draw();
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLNV();
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
        let themNVResult = true;
        //Thêm thành công
        if (themNVResult) {
            $("#modelThemKhachHang").find("#themKhachHangAlerts").append(createAlerts("success", "Thêm thành công"));
            //Thêm khách hàng mới vào bảng
            $("#modelThemKhachHang").find(".close").trigger("click");
            tableQuanLyKhachHang.row.add(createTableQLNVArrayDataRow(newKhachHang)).draw();
        }
        //Thêm thất bại
        else {
            $("#modelThemKhachHang").find("#themKhachHangAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelThemKhachHang").find("#themKhachHangReset").click(function() {
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
        let oldIdkhachHang = $("#modelSuaKhachHang").attr("id_khach_hang");
        let oldKhachHangRow = $("#tableQuanLyKhachHang").find("button[modify='" + oldIdkhachHang + "']").parents("tr");

        //Sửa xuống CSDL
        let suaNVResult = true;

        //Sửa thành công
        if (suaNVResult) {
            $("#modelSuaKhachHang").find("#suaKhachHangAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa khách hàng mới vào bảng
            $("#modelSuaKhachHang").find(".close").trigger("click");
            tableQuanLyKhachHang.row(oldKhachHangRow).data(createTableQLNVArrayDataRow(newKhachHang)).draw();            
        }
        //Sửa thất bại
        else {
            $("#modelSuaKhachHang").find("#suaKhachHangAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaKhachHang").find("#suaKhachHangReset").click(function() {
        setModelSuaKhachHang({});
    });

    $('#modelSuaKhachHang').on('show.bs.modal', function (event) {
        let suaKhachHangTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyKhachHang = extractDataFromTableQLNVRow(suaKhachHangTriggered.parents("tr"));

        $(this).attr("id_khach_hang", modifyKhachHang.id_khach_hang);
        setModelSuaKhachHang(modifyKhachHang);
    });
});

let createTableQLNVArrayDataRow = (khachhang) => {
    return [khachhang.id_khach_hang, khachhang.ten, khachhang.sdt, khachhang.point, khachhang.username, khachhang];
};

let extractDataFromTableQLNVRow = (tableRow) => {
    let id_khach_hang = $(tableRow).find(".id_khach_hang").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let sdt = $(tableRow).find(".sdt").attr("data");
    let point = $(tableRow).find(".point").attr("data");
    let username = $(tableRow).find(".username").attr("data");

    return {id_khach_hang: id_khach_hang, ten: ten, sdt: sdt, point: point, username: username};
};

let refreshDataTableQLNV = () => {
    let n = Math.floor(Math.random() * 10);
    //Lấy thông tin usernames
    usernames = [];
    for (let i = 0; i < n; i += 1) { usernames.push(`User${i.toString().padStart(3, "0")}`); }

    //Thêm option username
    $("#modelThemKhachHang").find("#themKhachHangUsername").html("");
    $("#modelSuaKhachHang").find("#suaKhachHangUsername").html("");
    for (let username of usernames) {
        let newUsernameOption = `<option value="${username}">${username}</option>`;
        $("#modelThemKhachHang").find("#themKhachHangUsername").append(newUsernameOption);
        $("#modelSuaKhachHang").find("#suaKhachHangUsername").append(newUsernameOption);
    }

    tableQuanLyKhachHang.clear();
    //Lấy thông tin khách hàng
    let khachhangs = new Array();    
    for (let i = 0; i < n; i += 1) {
        let id_khach_hang = i;
        let ten = `Khách Văn Hàng ${i.toString().padStart(3, "0")}`;

        let sdt = "";
        for(let sdtIndex=0; sdtIndex<10; sdtIndex+=1) {
            sdt += Math.floor(Math.random()*10).toString();
        }

        let username = `User${i.toString().padStart(3, "0")}`;
        let point = Math.floor(Math.random() * 1000);
        khachhangs.push({id_khach_hang: id_khach_hang, ten: ten, sdt: sdt, point: point, username: username});
    }

    //Thêm vào bảng
    for (let khachhang of khachhangs) {
        tableQuanLyKhachHang.row.add(createTableQLNVArrayDataRow(khachhang));
    }
    tableQuanLyKhachHang.draw();
};

let deleteTableQLNVRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyKhachHang.row(tableRow).remove().draw();
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
    let point = $(model).find(".point").val();
    let username = $(model).find(".username").val();
    return {id_khach_hang: id_khach_hang, ten: ten, sdt: sdt, point: point, username: username};
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
   $(model).find(".point").val(khachhang.point);
   $(model).find(".username").val(khachhang.username);
};

let validateKhachHangInformation = (alertContainer, khachhang) => {
    //Validate
    let id_khach_hang = khachhang.id_khach_hang;
    let ten = khachhang.ten;
    let sdt = khachhang.sdt;
    let point =khachhang.point;
    let username = khachhang.username;

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
    if (!point || point === "") {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy không được để trống"));
        numberValidateError += 1;
    }
    else if (point.search(/^[0-9]+$/) < 0) {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy chỉ được có số"));
        numberValidateError += 1;
    }
    else if (parseInt(point) < 0) {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy phải là số không âm"));
        numberValidateError += 1;
    }
    if (!username || username === "") {
        $(alertContainer).append(createAlerts("danger", "Username không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};