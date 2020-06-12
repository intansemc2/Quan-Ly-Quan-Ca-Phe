let tableQuanLyChiTietHoaDon;
let chitiethoadonTypes = [];

$(document).ready(function () {
//Active dataTable
    tableQuanLyChiTietHoaDon = $("#tableQuanLyChiTietHoaDon").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_chitiethoadon">${renderData}</span>`;
                }
            },            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ten">${renderData}</span>`;
                }
            },
            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="sdt">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let typeIndex = data;
                    let renderData = chitiethoadonTypes[typeIndex] ? chitiethoadonTypes[typeIndex] : data;
                    return `<span class="type">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="username">${renderData}</span>`;
                }
            },
            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let chitiethoadon = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaChiTietHoaDon" modify="${chitiethoadon.id_chitiethoadon}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-dark m-1" data-toggle="modal" data-target="#modelChiTietChiTietHoaDon" modify="${chitiethoadon.id_chitiethoadon}"><i class="fas fa-cart-plus"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLCTHDRow(this)"><i class="fas fa-trash"></i></button>`
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLCTHD();

    $("#danhDauTatCaChiTietHoaDon").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaChiTietHoaDon").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauChiTietHoaDon").click(function () {
        let markedRows = $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyChiTietHoaDon.rows(markedRows).remove().draw();
    });
    $("#xoaTatCaChiTietHoaDon").click(function () {
        tableQuanLyChiTietHoaDon.clear().draw();
    });
    $("#lamMoiChiTietHoaDon").click(function () {
        refreshDataTableQLCTHD();
    });
    $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonAlerts").html("");
        
        //Validate
        let modifyChiTietHoaDon = extractModelThemChiTietHoaDon();
        let numberValidateError = validateChiTietHoaDonInformation($("#modelThemChiTietHoaDon").find("#themChiTietHoaDonAlerts"), modifyChiTietHoaDon);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newChiTietHoaDon = modifyChiTietHoaDon;
        newChiTietHoaDon.id_chitiethoadon = -1;
        //Thêm xuống CSDL
        let themNVResult = true;
        //Thêm thành công
        if (themNVResult) {
            $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonAlerts").append(createAlerts("success", "Thêm thành công"));
            //Thêm hoá đơn mới vào bảng
            $("#modelThemChiTietHoaDon").find(".close").trigger("click");
            tableQuanLyChiTietHoaDon.row.add(createTableQLCTHDArrayDataRow(newChiTietHoaDon)).draw();
        }
        //Thêm thất bại
        else {
            $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonReset").click(function() {
        setModelThemChiTietHoaDon({});
    });

    $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonAlerts").html("");        

        //Validate
        let modifyChiTietHoaDon = extractModelSuaChiTietHoaDon();
        let numberValidateError = validateChiTietHoaDonInformation($("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonAlerts"), modifyChiTietHoaDon);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newChiTietHoaDon = modifyChiTietHoaDon;
        let oldUsername = $("#modelSuaChiTietHoaDon").attr("username");
        let oldChiTietHoaDonRow = $("#tableQuanLyChiTietHoaDon").find("button[modify='" + modifyChiTietHoaDon.id_chitiethoadon + "']").parents("tr");

        //Sửa xuống CSDL
        let suaNVResult = true;

        //Sửa thành công
        if (suaNVResult) {
            $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa hoá đơn mới vào bảng
            $("#modelSuaChiTietHoaDon").find(".close").trigger("click");
            tableQuanLyChiTietHoaDon.row(oldChiTietHoaDonRow).data(createTableQLCTHDArrayDataRow(newChiTietHoaDon)).draw();            
        }
        //Sửa thất bại
        else {
            $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonReset").click(function() {
        setModelSuaChiTietHoaDon({});
    });

    $('#modelSuaChiTietHoaDon').on('show.bs.modal', function (event) {
        let suaChiTietHoaDonTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyChiTietHoaDon = extractDataFromTableQLCTHDRow(suaChiTietHoaDonTriggered.parents("tr"));

        $(this).attr("id_chitiethoadon", modifyChiTietHoaDon.id_chitiethoadon);
        setModelSuaChiTietHoaDon(modifyChiTietHoaDon);
    });
});

const createTableQLCTHDArrayDataRow = (chitiethoadon) => {
    return [chitiethoadon.id_chitiethoadon, chitiethoadon.ten, chitiethoadon.sdt, chitiethoadon.type, chitiethoadon.username, chitiethoadon];
};

const extractDataFromTableQLCTHDRow = (tableRow) => {
    let id_chitiethoadon = $(tableRow).find(".id_chitiethoadon").text();
    let ten = $(tableRow).find(".ten").text();
    let sdt = $(tableRow).find(".sdt").text();
    let type = $(tableRow).find(".type").text();
    let username = $(tableRow).find(".username").text();

    type = chitiethoadonTypes.find(typename => typename === type);
    return {id_chitiethoadon: id_chitiethoadon, ten: ten, sdt: sdt, type: type, username: username};
};

const refreshDataTableQLCTHD = () => {
    let n = Math.floor(Math.random() * 10);
    //Lấy thông tin usernames
    usernames = [];
    for (let i = 0; i < n; i += 1) { usernames.push(`User${i.toString().padStart(3, "0")}`); }
    //Lấy thông tin types
    chitiethoadonTypes = ["Hoá đơn", "Admin"];

    //Thêm option username
    $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonUsername").html("");
    $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonUsername").html("");
    for (let username of usernames) {
        let newUsernameOption = `<option value="${username}">${username}</option>`;
        $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonUsername").append(newUsernameOption);
        $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonUsername").append(newUsernameOption);
    }

    //Thêm option type
    $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonLoaiChiTietHoaDon").html("");
    $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonLoaiChiTietHoaDon").html("");
    for (let type of chitiethoadonTypes) {
        let newLoaiOption = `<option value="${type}">${type}</option>`;
        $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonLoaiChiTietHoaDon").append(newLoaiOption);
        $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonLoaiChiTietHoaDon").append(newLoaiOption);
    }

    tableQuanLyChiTietHoaDon.clear();
    //Lấy thông tin hoá đơn
    let chitiethoadons = new Array();    
    for (let i = 0; i < n; i += 1) {
        let id_chitiethoadon = i;
        let ten = `Nhân Văn Viên ${i.toString().padStart(3, "0")}`;

        let sdt = "";
        for(let sdtIndex=0; sdtIndex<10; sdtIndex+=1) {
            sdt += Math.floor(Math.random()*10).toString();
        }

        let username = `User${i.toString().padStart(3, "0")}`;
        let type = Math.floor(Math.random() * chitiethoadonTypes.length);
        chitiethoadons.push({id_chitiethoadon: id_chitiethoadon, ten: ten, sdt: sdt, type: type, username: username});
    }

    //Thêm vào bảng
    for (let chitiethoadon of chitiethoadons) {
        tableQuanLyChiTietHoaDon.row.add(createTableQLCTHDArrayDataRow(chitiethoadon));
    }
    tableQuanLyChiTietHoaDon.draw();
};

const deleteTableQLCTHDRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyChiTietHoaDon.row(tableRow).remove().draw();
};

const extractModelThemChiTietHoaDon = () => {
    return extractFromModel($("#modelThemChiTietHoaDon"));
};

const extractModelSuaChiTietHoaDon = () => {
    return extractFromModel($("#modelSuaChiTietHoaDon"));
};

const setModelThemChiTietHoaDon = (modifyChiTietHoaDon) => {
    setToModel($("#modelThemChiTietHoaDon"), modifyChiTietHoaDon);
};

const setModelSuaChiTietHoaDon = (modifyChiTietHoaDon) => {
    setToModel($("#modelSuaChiTietHoaDon"), modifyChiTietHoaDon);
};

const validateChiTietHoaDonInformation = (alertContainer, chitiethoadon) => {
    //Validate
    let id_chitiethoadon = chitiethoadon.id_chitiethoadon;
    let ten = chitiethoadon.ten;
    let sdt = chitiethoadon.sdt;
    let type =chitiethoadon.type;
    let username = chitiethoadon.username;

    let numberValidateError = 0;
    if (ten === undefined || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên hoá đơn không được để trống"));
        numberValidateError += 1;
    }
    if (sdt === undefined || sdt === "") {
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
    if (type === undefined || type === "") {
        $(alertContainer).append(createAlerts("danger", "Loại không được để trống"));
        numberValidateError += 1;
    }
    if (username === undefined || username === "") {
        $(alertContainer).append(createAlerts("danger", "Username không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};