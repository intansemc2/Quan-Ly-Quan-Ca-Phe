let tableQuanLyCthd;
let sanphams = [];

$(document).ready(function () {
//Active dataTable
    tableQuanLyCthd = $("#tableQuanLyCthd").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_hoa_don" data="${data}">${renderData}</span>`;
                }
            },            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let sanpham = sanphams.find(item => item.id_san_pham == data);
                    if (!sanpham) { sanpham = {}; }
                    let renderData = `${sanpham.id_san_pham} - ${sanpham.ten}`;
                    return `<span class="id_san_pham" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="so_luong" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="don_gia" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diem_tich_luy" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let chitiethoadon = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaCthd" modify="${chitiethoadon.id_hoa_don} ${chitiethoadon.id_san_pham}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLCthdRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    $("#danhDauTatCaCthd").click(function () {
        $("#modelCthd").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaCthd").click(function () {
        $("#modelCthd").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauCthd").click(function () {
        $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton)).each((index, element) => deleteTableQLCthdRow($(element)));


    });
    $("#xoaTatCaCthd").click(function () {
        $.post("/Cthd/DeleteAll", function (data) {
            //Lấy thông tin 
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output >= 0) {
                tableQuanLyCthd.clear().draw();
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
    $("#lamMoiCthd").click(function () {
        refreshDataTableQLCthd();
    });
    $("#modelThemCthd").find("#themCthdConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemCthd").find("#themCthdAlerts").html("");
        
        //Validate
        let modifyCthd = extractModelThemCthd();
        let numberValidateError = validateCthdInformation($("#modelThemCthd").find("#themCthdAlerts"), modifyCthd);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newCthd = modifyCthd;
        //Thêm xuống CSDL
        $.post("/Cthd/Add", { IdHoaDon: newCthd.id_hoa_don, IdSanPham: newCthd.id_san_pham, SoLuong: newCthd.so_luong, DonGia: newCthd.don_gia, DiemTichLuy: newCthd.diem_tich_luy }, function (data) {
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
                $("#modelThemCthd").find("#themCthdAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm mới vào bảng
                $("#modelThemCthd").find(".close").trigger("click");
                tableQuanLyCthd.row.add(createTableQLCthdArrayDataRow(newCthd)).draw();
            }
            //Thêm thất bại
            else {
                $("#modelThemCthd").find("#themCthdAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemCthd").find("#themCthdAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để thêm dữ liệu vào CSDL");
                $("#modelThemCthd").find("#themCthdAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelThemCthd").find("#themCthdReset").click(function() {
        setModelThemCthd({});
    });

    $("#modelSuaCthd").find("#suaCthdConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaCthd").find("#suaCthdAlerts").html("");        

        let modifyCthd = extractModelSuaCthd();

        //Validate
        let numberValidateError = validateCthdInformation($("#modelSuaCthd").find("#suaCthdAlerts"), modifyCthd);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newCthd = modifyCthd;
        let id_hoa_don = $(this).parents("#modelSuaCthd").attr("id_hoa_don");
        let id_san_pham = $(this).parents("#modelSuaCthd").attr("id_san_pham");
        let oldCthdRow = $("#tableQuanLyCthd").find(`button[modify='${id_hoa_don} ${id_san_pham}']`).parents("tr");
        debugger;

        //Sửa xuống CSDL
        $.post("/Cthd/Edit", { IdHoaDon: newCthd.id_hoa_don, IdSanPham: newCthd.id_san_pham, SoLuong: newCthd.so_luong, DonGia: newCthd.don_gia, DiemTichLuy: newCthd.diem_tich_luy }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            inputJson = inputJson.replace(/IdHoaDon/g, `idhoadon`);;
            inputJson = inputJson.replace(/IdSanPham/g, `idsanpham`);;
            inputJson = inputJson.replace(/SoLuong/g, `soluong`);;
            inputJson = inputJson.replace(/DonGia/g, `dongia`);;
            inputJson = inputJson.replace(/DiemTichLuy/g, `diemtichluy`);
            let outputs = JSON.parse(inputJson);

            let suaModelResult = true;
            if (outputs.errors.length > 0 || outputs.output < 0) {
                suaModelResult = false;
            }

            //Sửa thành công
            if (suaModelResult) {
                $("#modelSuaCthd").find("#suaCthdAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa tài khoản mới vào bảng
                $("#modelSuaCthd").find(".close").trigger("click");
                tableQuanLyCthd.row(oldCthdRow).data(createTableQLCthdArrayDataRow(outputs.newCthd)).draw();
            }
            //Sửa thất bại
            else {
                $("#modelSuaCthd").find("#suaCthdAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaCthd").find("#suaCthdAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để sửa dữ liệu vào CSDL");
                $("#modelSuaCthd").find("#suaCthdAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelSuaCthd").find("#suaCthdReset").click(function() {
        setModelSuaCthd({});
    });

    $('#modelSuaCthd').on('show.bs.modal', function (event) {
        let suaCthdTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyCthd = extractDataFromTableQLCthdRow(suaCthdTriggered.parents("tr"));

        $(this).attr("id_hoa_don", modifyCthd.id_hoa_don);
        $(this).attr("id_san_pham", modifyCthd.id_san_pham);
        setModelSuaCthd(modifyCthd);
    });

    $("#modelThemCthd").find(".close").click(() => $("#modelThemCthd").trigger("click"));
    $("#modelSuaCthd").find(".close").click(() => $("#modelSuaCthd").trigger("click"));

    $("#themCthdSanPham").change(function () {        
        let id_san_pham = $(this).val();
        let sanpham = sanphams.find(item => item.id_san_pham == id_san_pham);
        $(this).parents("#modelThemCthd").find(".don_gia").val(sanpham.gia);
        $(this).parents("#modelThemCthd").find(".diem_tich_luy").val(sanpham.diem_tich_luy);
    });

    $("#themCthd").click(function () {
        let id_hoa_don = $(this).parents("#modelCthd").attr("id_hoa_don");
        $("#modelThemCthd").find(".id_hoa_don").val(id_hoa_don);
        $("#modelThemCthd").find(".id_san_pham").val(sanphams[0].id_san_pham);
    });
});

const createTableQLCthdArrayDataRow = (chitiethoadon) => {
    return [chitiethoadon.id_hoa_don, chitiethoadon.id_san_pham, chitiethoadon.so_luong, chitiethoadon.don_gia, chitiethoadon.diem_tich_luy, chitiethoadon];
};

const extractDataFromTableQLCthdRow = (tableRow) => {
    let id_hoa_don = $(tableRow).find(".id_hoa_don").attr("data");
    let id_san_pham = $(tableRow).find(".id_san_pham").attr("data");
    let so_luong = $(tableRow).find(".so_luong").attr("data");
    let don_gia = $(tableRow).find(".don_gia").attr("data");
    let diem_tich_luy = $(tableRow).find(".diem_tich_luy").attr("data");
    return  {id_hoa_don:id_hoa_don, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const refreshDataTableQLCthd = () => {    
    //Lấy thông tin sanphams
    sanphams = [];
    $.post("/SanPham/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdSanPham/g, `idsanpham`);;
        inputJson = inputJson.replace(/IdLoaiSP/g, `idloaisp`);;
        inputJson = inputJson.replace(/Ten/g, `ten`);;
        inputJson = inputJson.replace(/Gia/g, `gia`);;
        inputJson = inputJson.replace(/DiemTichLuy/g, `diemtichluy`);;
        inputJson = inputJson.replace(/Description/g, `description`);
        let outputs = JSON.parse(inputJson);

        sanphams = outputs;

        //Thêm option sanpham
        $("#modelThemCthd").find("#themCthdSanPham").html("");
        $("#modelSuaCthd").find("#suaCthdSanPham").html("");
        for (let sanpham of sanphams) {
            let newUsernameOption = `<option value="${sanpham.id_san_pham}">${sanpham.id_san_pham} - ${sanpham.ten}</option>`;
            $("#modelThemCthd").find("#themCthdSanPham").append(newUsernameOption);
            $("#modelSuaCthd").find("#suaCthdSanPham").append(newUsernameOption);
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });

    tableQuanLyCthd.clear();
    //Lấy thông tin hoá đơn
    $.post("/Cthd/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdHoaDon/g, `idhoadon`);;
        inputJson = inputJson.replace(/IdSanPham/g, `idsanpham`);;
        inputJson = inputJson.replace(/SoLuong/g, `soluong`);;
        inputJson = inputJson.replace(/DonGia/g, `dongia`);;
        inputJson = inputJson.replace(/DiemTichLuy/g, `diemtichluy`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyCthd.row.add(createTableQLCthdArrayDataRow(output));
        }
        tableQuanLyCthd.draw();
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });


};

const deleteTableQLCthdRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    let cthd = extractDataFromTableQLCthdRow(tableRow);
    $.post("/Cthd/Delete", { IdHoaDon: cthd.id_hoa_don, IdSanPham: cthd.id_san_pham }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {
            tableQuanLyCthd.row(tableRow).remove().draw();
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

const extractModelThemCthd = () => {
    return extractFromModelCthd($("#modelThemCthd"));
};

const extractModelSuaCthd = () => {
    return extractFromModelCthd($("#modelSuaCthd"));
};

const extractFromModelCthd = (model) => {
    //Lấy thông tin
    let id_hoa_don = $(model).find(".id_hoa_don").val();
    let id_san_pham = $(model).find(".id_san_pham").val();
    let so_luong = $(model).find(".so_luong").val();
    let don_gia = $(model).find(".don_gia").val();
    let diem_tich_luy = $(model).find(".diem_tich_luy").val();
    return  {id_hoa_don:id_hoa_don, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const setModelThemCthd = (modifyCthd) => {
    setToModelCthd($("#modelThemCthd"), modifyCthd);
};

const setModelSuaCthd = (modifyCthd) => {
    setToModelCthd($("#modelSuaCthd"), modifyCthd);
};

const setToModelCthd = (model, chitiethoadon) => {
    $(model).find(".id_hoa_don").val(chitiethoadon.id_hoa_don);
    $(model).find(".id_san_pham").val(chitiethoadon.id_san_pham);
    $(model).find(".so_luong").val(chitiethoadon.so_luong);
    $(model).find(".don_gia").val(chitiethoadon.don_gia);
    $(model).find(".diem_tich_luy").val(chitiethoadon.diem_tich_luy);
};

const validateCthdInformation = (alertContainer, chitiethoadon) => {
    //Validate
    let id_hoa_don = chitiethoadon.id_hoa_don;
    let id_san_pham = chitiethoadon.id_san_pham;
    let so_luong = `${chitiethoadon.so_luong}`;
    let don_gia = `${chitiethoadon.don_gia}`;
    let diem_tich_luy = `${chitiethoadon.diem_tich_luy}`;

    let numberValidateError = 0;
    if (!id_san_pham || id_san_pham === "") {
        $(alertContainer).append(createAlerts("danger", "Sản phẩm không được để trống"));
        numberValidateError += 1;
    }
    if (!so_luong || so_luong === "") {
        $(alertContainer).append(createAlerts("danger", "Số luợng không được để trống"));
        numberValidateError += 1;
    }
    if (!don_gia || don_gia === "") {
        $(alertContainer).append(createAlerts("danger", "Đơn giá không được để trống"));
        numberValidateError += 1;
    }
    if (!diem_tich_luy || diem_tich_luy === "") {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};