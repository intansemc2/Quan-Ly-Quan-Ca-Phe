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
                    let renderData = `${trangThaiBans[data]}`;
                    return `<span class="trang_thai" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let ban = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaBan" modify="${ban.id_ban}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-dark m-1" data-toggle="modal" data-target="#modelChiTietBan" modify="${ban.id_ban}"><i class="fas fa-info"></i></button>
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
                tableQuanLyBan.clear().draw();
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để xóa dữ liệu từ CSDL");
            })
            .always(function () {
            });


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
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newBan = modifyBan;
        newBan.id_ban = -1;
        //Thêm xuống CSDL
        $.post("/Ban/Add", { IdBan: newBan.id_ban, Ten: newBan.ten, TrangThai: newBan.trang_thai }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            let themModelResult = true;
            if (outputs.errors.Length > 0 || outputs.output < 0) {
                themModelResult = false;
            }

            //Thêm thành công
            if (themModelResult) {
                $("#modelThemBan").find("#themBanAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm mới vào bảng
                $("#modelThemBan").find(".close").trigger("click");
                tableQuanLyBan.row.add(createTableQLBanArrayDataRow(newBan)).draw();
            }
            //Thêm thất bại
            else {
                $("#modelThemBan").find("#themBanAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemBan").find("#themBanAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để thêm dữ liệu vào CSDL");
                $("#modelThemBan").find("#themBanAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });


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

        //Tạo hoá đơn mới 
        let newBan = modifyBan;
        let oldBanRow = $("#tableQuanLyBan").find("button[modify='" + modifyBan.id_ban + "']").parents("tr");

        //Sửa xuống CSDL
        $.post("/Ban/Edit", { IdBan: newBan.id_ban, Ten: newBan.ten, TrangThai: newBan.trang_thai }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            inputJson = inputJson.replace(/IdBan/g, `idban`);;
            inputJson = inputJson.replace(/Ten/g, `ten`);;
            inputJson = inputJson.replace(/TrangThai/g, `trangthai`);
            let outputs = JSON.parse(inputJson);

            let suaModelResult = true;
            if (outputs.errors.length > 0 || outputs.output < 0) {
                suaModelResult = false;
            }

            //Sửa thành công
            if (suaModelResult) {
                $("#modelSuaBan").find("#suaBanAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa tài khoản mới vào bảng
                $("#modelSuaBan").find(".close").trigger("click");
                tableQuanLyBan.row(oldBanRow).data(createTableQLBanArrayDataRow(outputs.newBan)).draw();
            }
            //Sửa thất bại
            else {
                $("#modelSuaBan").find("#suaBanAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaBan").find("#suaBanAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để sửa dữ liệu vào CSDL");
                $("#modelSuaBan").find("#suaBanAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelSuaBan").find("#suaBanReset").click(function() {
        setModelSuaBan({});
    });

    $('#modelChiTietBan').on('show.bs.modal', function (event) {
        let suaBanTriggered = $(event.relatedTarget); // Button that triggered the modal

        let rowBan = suaBanTriggered.parents("tr");        

        if ($(rowBan).find("button[data-target='#modelChiTietBan']").length) {
            let modifyBan = extractDataFromTableQLBanRow(rowBan);
            $(this).attr("id_ban", modifyBan.id_ban);

            $("#modelChiTietBan").find("#banTitleInformation").text(`${$(rowBan).find(".id_ban").attr("data")}`);
             refreshDataTableQLCTBan();
         }
    });

    $('#modelSuaBan').on('show.bs.modal', function (event) {
        let suaBanTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyBan = extractDataFromTableQLBanRow(suaBanTriggered.parents("tr"));

        $(this).attr("id_ban", modifyBan.id_ban);
        setModelSuaBan(modifyBan);       
    });
});

let createTableQLBanArrayDataRow = (ban) => {
    return [ban.id_ban, ban.ten, ban.trang_thai, ban];
};

let extractDataFromTableQLBanRow = (tableRow) => {
    let id_ban = $(tableRow).find(".id_ban").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let trang_thai = $(tableRow).find(".trang_thai").attr("data");

    return {id_ban: id_ban, ten: ten, trang_thai: trang_thai};
};

let refreshDataTableQLBan = () => {
    //Lấy thông tin trạng thái bàn 
    trangThaiBans = ["Còn trống", "Đã được đặt", "Đang được sử dụng"];

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
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdBan/g, `idban`);;
        inputJson = inputJson.replace(/Ten/g, `ten`);;
        inputJson = inputJson.replace(/TrangThai/g, `trangthai`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyBan.row.add(createTableQLBanArrayDataRow(output));
        }
        tableQuanLyBan.draw();
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
    let ban = extractDataFromTableQLBanRow(tableRow);
    let ban = extractDataFromTableQLBanRow(tableRow);
    $.post("/Ban/Delete", { IdBan: ban.id_ban }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {
            tableQuanLyBan.row(tableRow).remove().draw();
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
    let id_ban = $(model).find(".id_ban").val();
    let ten = $(model).find(".ten").val();
    let trang_thai = $(model).find(".trang_thai").val();

    return {id_ban: id_ban, ten: ten, trang_thai: trang_thai};
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
    $(model).find(".trang_thai").val(ban.trang_thai);
};

const validateBanInformation = (alertContainer, ban) => {
    //Validate
    let id_ban = ban.id_ban;
    let ten = ban.ten;
    let trang_thai = ban.trang_thai;

    let numberValidateError = 0;
    if (ten === undefined || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên không được để trống"));
        numberValidateError += 1;
    }
    if (trang_thai === undefined || trang_thai === "") {
        $(alertContainer).append(createAlerts("danger", "Trạng thái không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};