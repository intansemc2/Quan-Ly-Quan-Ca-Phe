let tableQuanLyBan;
let bans = [];
let trangThaiBans = [];

$(document).ready(function () {
//Active dataTable
    tableQuanLyBan = $("#tableQuanLyBan").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_ban" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = `${data}`;
                    return `<span class="ten" data="${data}">${renderData}</span>`;
                }
            },

            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let ban = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaBan" modify="${ban.id_ban}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLBanRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLBan();

    $("#danhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDau").click(function () {
        $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton)).each((index, element) => deleteTableQLBanRow($(element)));
    });
    $("#xoaTatCa").click(function () {
        $.post("/Ban/DeleteAll", function (data) {
            //Lấy thông tin 
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output >= 0) {
                alert("Xóa thành công");
                refreshDataTableQLBan();
            }
        })
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLBan();
    });
    $("#modelThemBan").find("#themBanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemBan").find("#themBanAlerts").html("");
        
        //Validate
        let modifyBan = extractModelThemBan();
        let numberValidateError = validateBanInformation($("#modelThemBan").find("#themBanAlerts"), modifyBan);

        //Tạo bàn mới
        let newBan = modifyBan;
        //Thêm xuống CSDL
        $.post("/Ban/Add", {Ten: newBan.ten}, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            let outputs = JSON.parse(inputJson);

            let themModelResult = true;
            if (outputs.output <= 0 || outputs.errors.length > 0) {
                themModelResult = false;
            }

            //Thêm thành công
            if (themModelResult) {
                alert("Thêm thành công");
                //Thêm mới vào bảng
                $("#modelThemBan").find(".close").trigger("click");
                refreshDataTableQLBan();
            }
            //Thêm thất bại
            else {
                $("#modelThemBan").find("#themBanAlerts").append(createAlerts("danger", outputs.errors));

                for (let error of outputs.errors) {
                    $("#modelThemBan").find("#themBanAlerts").append(createAlerts("danger", error));
                }
            }
        })
    });

    $("#modelThemBan").find("#themBanReset").click(function() {
        setModelThemBan({});
    });

    $("#modelSuaBan").find("#suaBanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaBan").find("#suaBanAlerts").html("");        

        //Validate
        let modifyBan = extractModelSuaBan();
        let numberValidateError = validateBanInformation($("#modelSuaBan").find("#suaBanAlerts"), modifyBan);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo bàn đơn mới 
        let newBan = modifyBan;
        console.log(newBan);
        let oldBanRow = $("#tableQuanLyBan").find("button[modify='" + modifyBan.id_ban + "']").parents("tr");

        //Sửa xuống CSDL
        $.post("/Ban/Edit", { IdBan: newBan.id_ban, Ten: newBan.ten }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;

            let outputs = JSON.parse(inputJson);

            let suaModelResult = true;
            if (outputs.errors.length > 0 || outputs.output < 0) {
                suaModelResult = false;
            }

            //Sửa thành công
            if (suaModelResult) {
                alert("Sửa thành công");
                $("#modelSuaBan").find(".close").trigger("click");
                refreshDataTableQLBan();
            }
            //Sửa thất bại
            else {
                $("#modelSuaBan").find("#suaBanAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaBan").find("#suaBanAlerts").append(createAlerts("danger", error));
                }
            }
        })
    });

    $("#modelSuaBan").find("#suaBanReset").click(function() {
        setModelSuaBan({});
    });

    $('#modelSuaBan').on('show.bs.modal', function (event) {
        let suaBanTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyBan = extractDataFromTableQLBanRow(suaBanTriggered.parents("tr"));

        $(this).attr("id_ban", modifyBan.id_ban);
        setModelSuaBan(modifyBan);       
    });
});

let createTableQLBanArrayDataRow = (ban) => {
    return [ban.id_ban, ban.ten, ban];
};

let extractDataFromTableQLBanRow = (tableRow) => {
    let id_ban = $(tableRow).find(".id_ban").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");

    return {id_ban: id_ban, ten: ten};
};

let refreshDataTableQLBan = () => {
    $("#tableQuanLyBanAlert").empty();
    //Thêm option khachhangs
    $("#modelThemBan").find("#themBanTrangThai").html("");
    $("#modelSuaBan").find("#suaBanTrangThai").html("");
    for (let i=0; i<trangThaiBans.length; i+=1) {
        let newOption = `<option value="${i}">${trangThaiBans[i]}</option>`;
        $("#modelThemBan").find("#themBanTrangThai").append(newOption);
        $("#modelSuaBan").find("#suaBanTrangThai").append(newOption);
    }

    tableQuanLyBan.clear();

    $.post("/Ban/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/IdBan/g, `id_ban`);;
        inputJson = inputJson.replace(/Ten/g, `ten`);;
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyBan.row.add(createTableQLBanArrayDataRow(output));
        }
        tableQuanLyBan.draw();
        $("#tableQuanLyBanAlert").append(createAlerts("success", "Làm mới thành công"));
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });


};

const deleteTableQLBanRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    let ban = extractDataFromTableQLBanRow(tableRow);
    ban = extractDataFromTableQLBanRow(tableRow);
    ban = extractDataFromTableQLBanRow(tableRow);
    $.post("/Ban/Delete", { IdBan: ban.id_ban }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {
            //$("#modelXoaBan").find(".close").trigger("click");
            alert("Xóa thành công");
            refreshDataTableQLBan();
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để xóa dữ liệu từ CSDL");
        })
        .always(function () {
        });


};

const extractModelThemBan = () => {
    return extractFromModelBan($("#modelThemBan"));
};

const extractModelSuaBan = () => {
    return extractFromModelBan($("#modelSuaBan"));
};

const extractFromModelBan = (model) => {
//Lấy thông tin
    let ten = $(model).find(".ten").val();
    let id_ban = $(model).find(".id_ban").val();

    return {id_ban:id_ban, ten: ten};
};

const setModelThemBan = (modifyBan) => {
    setToModelBan($("#modelThemBan"), modifyBan);
};

const setModelSuaBan = (modifyBan) => {
    setToModelBan($("#modelSuaBan"), modifyBan);
};

const setToModelBan = (model, ban) => {
    $(model).find(".id_ban").val(ban.id_ban);
    $(model).find(".ten").val(ban.ten);
};

const validateBanInformation = (alertContainer, ban) => {
    //Validate
    let ten = ban.ten;

    let numberValidateError = 0;
    if (ten === undefined || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};