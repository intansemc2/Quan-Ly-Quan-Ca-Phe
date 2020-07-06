let tableQuanLyCtkm;
let sanphams = [];

$(document).ready(function () {
/*Active dataTable*/
    tableQuanLyCtkm = $("#tableQuanLyCtkm").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_khuyen_mai" data="${data}">${renderData}</span>`;
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
                    let chitietkhuyenmai = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaCtkm" modify="${chitietkhuyenmai.id_khuyen_mai} ${chitietkhuyenmai.id_san_pham}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLCtkmRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    $("#danhDauTatCaCtkm").click(function () {
        $("#modelCtkm").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaCtkm").click(function () {
        $("#modelCtkm").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauCtkm").click(function () {
        $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton)).each((index, element) => deleteTableQLCtkmRow($(element)));


    });
    $("#xoaTatCaCtkm").click(function () {
        $.post("/Ctkm/DeleteAll", function (data) {
            //Lấy thông tin 
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output >= 0) {
                tableQuanLyCtkm.clear().draw();
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
    $("#lamMoiCtkm").click(function () {
        refreshDataTableQLCtkm();
    });
    $("#modelThemCtkm").find("#themCtkmConfirm").click(function () {
        /*Xóa hết alert cũ*/
        $("#modelThemCtkm").find("#themCtkmAlerts").html("");
        
        /*Validate*/
        let modifyCtkm = extractModelThemCtkm();
        let numberValidateError = validateCtkmInformation($("#modelThemCtkm").find("#themCtkmAlerts"), modifyCtkm);
        if (numberValidateError > 0) {
            return;
        }

        /*Tạo khuyến mãi mới */
        let newCtkm = modifyCtkm;
        /*Thêm xuống CSDL*/
        $.post("/Ctkm/Add", { IdKhuyenMai: newCtkm.id_khuyen_mai, IdSanPham: newCtkm.id_san_pham, SoLuong: newCtkm.so_luong, DonGia: newCtkm.don_gia, DiemTichLuy: newCtkm.diem_tich_luy }, function (data) {
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
                $("#modelThemCtkm").find("#themCtkmAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm mới vào bảng
                $("#modelThemCtkm").find(".close").trigger("click");
                tableQuanLyCtkm.row.add(createTableQLCtkmArrayDataRow(newCtkm)).draw();
            }
            //Thêm thất bại
            else {
                $("#modelThemCtkm").find("#themCtkmAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemCtkm").find("#themCtkmAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để thêm dữ liệu vào CSDL");
                $("#modelThemCtkm").find("#themCtkmAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelThemCtkm").find("#themCtkmReset").click(function() {
        setModelThemCtkm({});
    });

    $("#modelSuaCtkm").find("#suaCtkmConfirm").click(function () {
        /*Xóa hết alert cũ*/
        $("#modelSuaCtkm").find("#suaCtkmAlerts").html("");        

        let modifyCtkm = extractModelSuaCtkm();

        /*Validate*/
        let numberValidateError = validateCtkmInformation($("#modelSuaCtkm").find("#suaCtkmAlerts"), modifyCtkm);
        if (numberValidateError > 0) {
            return;
        }

        /*Tạo khuyến mãi mới */
        let newCtkm = modifyCtkm;
        let id_khuyen_mai = $(this).parents("#modelSuaCtkm").attr("id_khuyen_mai");
        let id_san_pham = $(this).parents("#modelSuaCtkm").attr("id_san_pham");
        let oldCtkmRow = $("#tableQuanLyCtkm").find(`button[modify='${id_khuyen_mai} ${id_san_pham}']`).parents("tr");

        /*Sửa xuống CSDL*/
        $.post("/Ctkm/Edit", { IdKhuyenMai: newCtkm.id_khuyen_mai, IdSanPham: newCtkm.id_san_pham, SoLuong: newCtkm.so_luong, DonGia: newCtkm.don_gia, DiemTichLuy: newCtkm.diem_tich_luy }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            inputJson = inputJson.replace(/IdKhuyenMai/g, `idkhuyenmai`);;
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
                $("#modelSuaCtkm").find("#suaCtkmAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa tài khoản mới vào bảng
                $("#modelSuaCtkm").find(".close").trigger("click");
                tableQuanLyCtkm.row(oldCtkmRow).data(createTableQLCtkmArrayDataRow(outputs.newCtkm)).draw();
            }
            //Sửa thất bại
            else {
                $("#modelSuaCtkm").find("#suaCtkmAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaCtkm").find("#suaCtkmAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để sửa dữ liệu vào CSDL");
                $("#modelSuaCtkm").find("#suaCtkmAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelSuaCtkm").find("#suaCtkmReset").click(function() {
        setModelSuaCtkm({});
    });

    $('#modelSuaCtkm').on('show.bs.modal', function (event) {
        let suaCtkmTriggered = $(event.relatedTarget); /* Button that triggered the modal*/

        let modifyCtkm = extractDataFromTableQLCtkmRow(suaCtkmTriggered.parents("tr"));

        $(this).attr("id_khuyen_mai", modifyCtkm.id_khuyen_mai);
        $(this).attr("id_san_pham", modifyCtkm.id_san_pham);
        setModelSuaCtkm(modifyCtkm);
    });

    $("#modelThemCtkm").find(".close").click(() => $("#modelThemCtkm").trigger("click"));
    $("#modelSuaCtkm").find(".close").click(() => $("#modelSuaCtkm").trigger("click"));

    $("#themCtkmSanPham").change(function () {        
        let id_san_pham = $(this).val();
        let sanpham = sanphams.find(item => item.id_san_pham == id_san_pham);
        $(this).parents("#modelThemCtkm").find(".don_gia").val(sanpham.don_gia);
        $(this).parents("#modelThemCtkm").find(".diem_tich_luy").val(sanpham.diem_tich_luy);
    });

    $("#themCtkm").click(function () {
        let id_khuyen_mai = $(this).parents("#modelCtkm").attr("id_khuyen_mai");
        $("#modelThemCtkm").find(".id_khuyen_mai").val(id_khuyen_mai);
        $("#modelThemCtkm").find(".id_san_pham").val(sanphams[0].id_san_pham);
    });
});

const createTableQLCtkmArrayDataRow = (chitietkhuyenmai) => {
    return [chitietkhuyenmai.id_khuyen_mai, chitietkhuyenmai.id_san_pham, chitietkhuyenmai.so_luong, chitietkhuyenmai.don_gia, chitietkhuyenmai.diem_tich_luy, chitietkhuyenmai];
};

const extractDataFromTableQLCtkmRow = (tableRow) => {
    let id_khuyen_mai = $(tableRow).find(".id_khuyen_mai").attr("data");
    let id_san_pham = $(tableRow).find(".id_san_pham").attr("data");
    let so_luong = $(tableRow).find(".so_luong").attr("data");
    let don_gia = $(tableRow).find(".don_gia").attr("data");
    let diem_tich_luy = $(tableRow).find(".diem_tich_luy").attr("data");
    return  {id_khuyen_mai:id_khuyen_mai, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const refreshDataTableQLCtkm = () => {    
    /*Lấy thông tin sanphams*/
    sanphams = [];
    for (let i = 0; i < 10; i += 1) { sanphams.push({id_san_pham: i, ten: `Sản phẩm ${i}`, don_gia: Math.floor(Math.random()*1000)*1000, diem_tich_luy: Math.floor(Math.random()*1000)}); }

    /*Thêm option sanpham*/
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
        $("#modelThemCtkm").find("#themCtkmSanPham").html("");
        $("#modelSuaCtkm").find("#suaCtkmSanPham").html("");
        for (let sanpham of sanphams) {
            let newUsernameOption = `<option value="${sanpham.id_san_pham}">${sanpham.id_san_pham} - ${sanpham.ten}</option>`;
            $("#modelThemCtkm").find("#themCtkmSanPham").append(newUsernameOption);
            $("#modelSuaCtkm").find("#suaCtkmSanPham").append(newUsernameOption);
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });
    

    tableQuanLyCtkm.clear();
    /*Lấy thông tin khuyến mãi*/
    $.post("/Ctkm/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/IdKhuyenMai/g, `idkhuyenmai`);;
        inputJson = inputJson.replace(/IdSanPham/g, `idsanpham`);;
        inputJson = inputJson.replace(/SoLuong/g, `soluong`);;
        inputJson = inputJson.replace(/DonGia/g, `dongia`);;
        inputJson = inputJson.replace(/DiemTichLuy/g, `diemtichluy`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyCtkm.row.add(createTableQLCtkmArrayDataRow(output));
        }
        tableQuanLyCtkm.draw();
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });


};

const deleteTableQLCtkmRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    let ctkm = extractDataFromTableQLCtkmRow(tableRow);
    $.post("/Ctkm/Delete", { IdKhuyenMai: ctkm.id_khuyen_mai, IdSanPham: ctkm.id_san_pham }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {
            tableQuanLyCtkm.row(tableRow).remove().draw();
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

const extractModelThemCtkm = () => {
    return extractFromModelCtkm($("#modelThemCtkm"));
};

const extractModelSuaCtkm = () => {
    return extractFromModelCtkm($("#modelSuaCtkm"));
};

const extractFromModelCtkm = (model) => {
    /*Lấy thông tin*/
    let id_khuyen_mai = $(model).find(".id_khuyen_mai").val();
    let id_san_pham = $(model).find(".id_san_pham").val();
    let so_luong = $(model).find(".so_luong").val();
    let don_gia = $(model).find(".don_gia").val();
    let diem_tich_luy = $(model).find(".diem_tich_luy").val();
    return  {id_khuyen_mai:id_khuyen_mai, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const setModelThemCtkm = (modifyCtkm) => {
    setToModelCtkm($("#modelThemCtkm"), modifyCtkm);
};

const setModelSuaCtkm = (modifyCtkm) => {
    setToModelCtkm($("#modelSuaCtkm"), modifyCtkm);
};

const setToModelCtkm = (model, chitietkhuyenmai) => {
    $(model).find(".id_khuyen_mai").val(chitietkhuyenmai.id_khuyen_mai);
    $(model).find(".id_san_pham").val(chitietkhuyenmai.id_san_pham);
    $(model).find(".so_luong").val(chitietkhuyenmai.so_luong);
    $(model).find(".don_gia").val(chitietkhuyenmai.don_gia);
    $(model).find(".diem_tich_luy").val(chitietkhuyenmai.diem_tich_luy);
};

const validateCtkmInformation = (alertContainer, chitietkhuyenmai) => {
    /*Validate*/
    let id_khuyen_mai = chitietkhuyenmai.id_khuyen_mai;
    let id_san_pham = chitietkhuyenmai.id_san_pham;
    let so_luong = `${chitietkhuyenmai.so_luong}`;
    let don_gia = `${chitietkhuyenmai.don_gia}`;
    let diem_tich_luy = `${chitietkhuyenmai.diem_tich_luy}`;

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