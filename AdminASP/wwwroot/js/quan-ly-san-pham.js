let tableQuanLySanPham;

$(document).ready(function () {
//Active dataTable
    tableQuanLySanPham = $("#tableQuanLySanPham").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_san_pham" data="${data}">${renderData}</span>`;
                }
            },
            {
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
                    return `<span class="gia" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="diem_tich_luy" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ghi_chu" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 5,
                "render": function (data, type, row, meta) {
                    let sanpham = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaSanPham" modify="${sanpham.id_san_pham}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLSPRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

 //HIỂN THỊ BẢNG DỮ LIỆU
    refreshDataTableQLSanPham();

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
        $.post("/SanPham/DeleteAll", function (data) {
            //Lấy thông tin 
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output >= 0) {
                alert("Xóa thành công");
                refreshDataTableQLSanPham();
            }
        })
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLSanPham();
    });


    //Thêm SP
    $("#modelThemSanPham").find("#themSanPhamComfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemSanPham").find("#themSanPhamAlerts").html("");

        //Validate
        let modifyCTLSP = extractmodelThemSanPham();
        let numberValidateError = validateSanPhamInformation($("#modelThemSanPham").find("#themSanPhamAlerts"), modifyCTLSP);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo sản phẩm mới 
        let newSp = modifyCTLSP;

        //Thêm xuống CSDL
        $.post("/SanPham/Add", {
            IdSanPham : newSp.id_san_pham,
            Ten : newSp.ten,
            Gia : newSp.gia,
            DiemTichLuy : newSp.diem_tich_luy,
            GhiChu : newSp.ghi_chu
        },
            function (data) {
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
                    $("#modelThemSanPham").find(".close").trigger("click");
                    refreshDataTableQLSanPham();
                }
                //Thêm thất bại
                else {
                    $("#modelThemSanPham").find("#themSanPhamAlerts").append(createAlerts("danger", outputs.errors));

                    for (let error of outputs.errors) {
                        $("#modelThemSanPham").find("#themBanAlerts").append(createAlerts("danger", error));
                    }
                }

            });
    });

    $("#modelThemSanPham").find("#themSanPhamReset").click(function () {
        let parent_id_loaisp = $("#modelsanpham").attr("id_loaisp");
        setmodelThemSanPham({ id_loaisp: parent_id_loaisp });
    });


    //Sửa SP
    $("#modelSuaSanPham").find("#suaSanPhamComfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaSanPham").find("#suaSanPhamAlerts").html("");        

        //Validate
        let modifySanPham = extractmodelSuaSanPham();
        let numberValidateError = validateSanPhamInformation($("#modelSuaSanPham").find("#suaSanPhamAlerts"), modifySanPham);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo loại sản phẩm mới 
        let newSp = modifySanPham;

        //Sửa xuống CSDL
        $.post("/SanPham/Edit", {
            IdSanPham : newSp.id_san_pham,
            Ten : newSp.ten,
            Gia : newSp.gia,
            DiemTichLuy : newSp.diem_tich_luy,
            GhiChu : newSp.ghi_chu
        },
            function (data) {
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
                    $("#modelSuaSanPham").find(".close").trigger("click");
                    refreshDataTableQLSanPham();
                }
                //Sửa thất bại
                else {
                    $("#modelSuaSanPham").find("#suaSanPhamAlerts").append(createAlerts("danger", "Sửa thất bại"));

                    for (let error of outputs.errors) {
                        $("#modelSuaSanPham").find("#suaSanPhamAlerts").append(createAlerts("danger", error));
                    }
                }
            });
    });


    $("#modelSuaSanPham").find("#suaSanPhamReset").click(function() {
        let parent_id_loaisp = $("#modelSanPham").attr("id_loaisp");
        setmodelThemSanPham({id_loaisp: parent_id_loaisp});
    });

    $('#modelThemSanPham').on('show.bs.modal', function (event) {
        let parent_id_loaisp = $("#modelsanpham").attr("id_loaisp");
        setmodelThemSanPham({id_loaisp: parent_id_loaisp});
    });

    $('#modelSuaSanPham').on('show.bs.modal', function (event) {
        let suaCTLSPTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyCTLSP = extractDataFromTableQLSanPhamRow(suaCTLSPTriggered.parents("tr"));

        $(this).attr("id_san_pham", modifyCTLSP.id_san_pham);
        setmodelSuaSanPham(modifyCTLSP);
    });

    $("#modelThemSanPham").find(".close").click(() => $("#modelThemSanPham").trigger("click"));
    $("#modelSuaSanPham").find(".close").click(() => $("#modelSuaSanPham").trigger("click"));
});

const createTableQLSanPhamArrayDataRow = (sanpham) => {
    return [sanpham.id_san_pham, sanpham.ten, sanpham.gia, sanpham.diem_tich_luy, sanpham.ghi_chu,sanpham];
};

const extractDataFromTableQLSanPhamRow = (tableRow) => {
    let id_san_pham = $(tableRow).find(".id_san_pham").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let gia = $(tableRow).find(".gia").attr("data");
    let diem_tich_luy = $(tableRow).find(".diem_tich_luy").attr("data");
    let ghi_chu = $(tableRow).find(".ghi_chu").attr("data");
    return  {id_san_pham:id_san_pham, ten:ten, gia:gia, diem_tich_luy: diem_tich_luy, ghi_chu:ghi_chu};
};

const refreshDataTableQLSanPham = () => {   
    tableQuanLySanPham.clear();
    $("#tableQuanLySanPhamAlert").empty();

    $.post("/SanPham/GetAll", function (data) {
        //Lấy thông tin sản phẩm
        let inputJson = data;
        inputJson = inputJson.replace(/IdSanPham/g, `id_san_pham`);
        inputJson = inputJson.replace(/Ten/g, `ten`);
        inputJson = inputJson.replace(/Gia/g, `gia`);
        inputJson = inputJson.replace(/DiemTichLuy/g, `diem_tich_luy`);
        inputJson = inputJson.replace(/GhiChu/g, `ghi_chu`);
        let outputs = JSON.parse(inputJson);
        
        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLySanPham.row.add(createTableQLSanPhamArrayDataRow(output));
        }
        tableQuanLySanPham.draw();
        $("#tableQuanLySanPhamAlert").append(createAlerts("success", "Làm mới thành công"));
    })

     .done(function () {
            })
    .fail(function () {
        alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
    })
    .always(function () {
    });

};

//XÓA 1 DÒNG
const deleteTableQLSPRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    let sp = extractDataFromTableQLSanPhamRow(tableRow);

    $.post("/SanPham/Delete", { IdSanPham: sp.id_san_pham }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {

            alert("Xóa thành công");
            refreshDataTableQLSanPham();
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để xóa dữ liệu từ CSDL");
        })
        .always(function () {
        });
}


//lấy dữ liệu từ form thêm
const extractmodelThemSanPham = () => {
    return extractFromModelSP($("#modelThemSanPham"));
};

const extractmodelSuaSanPham = () => {
    return extractFromModelSP($("#modelSuaSanPham"));
};

//LẤY DỮ LIỆU TỪ FORM THÊM
const extractFromModelSP = (model) => {
    //Lấy thông tin
    let id_san_pham = $(model).find(".id_san_pham").val();
    let ten = $(model).find(".ten").val();
    let gia = $(model).find(".gia").val();
    let diem_tich_luy = $(model).find(".diem_tich_luy").val();
    let ghi_chu = $(model).find(".ghi_chu").val();
    return {id_san_pham:id_san_pham, ten:ten, gia:gia, diem_tich_luy:diem_tich_luy, ghi_chu:ghi_chu};
};

const setmodelThemSanPham = (modifyCTLSP) => {
    setToModelCTLSP($("#modelThemSanPham"), modifyCTLSP);
};

const setmodelSuaSanPham = (modifyCTLSP) => {
    setToModelCTLSP($("#modelSuaSanPham"), modifyCTLSP);
};

const setToModelCTLSP = (model, sanpham) => {
    $(model).find(".id_san_pham").val(sanpham.id_san_pham);
    $(model).find(".ten").val(sanpham.ten);
    $(model).find(".gia").val(sanpham.gia);
    $(model).find(".diem_tich_luy").val(sanpham.diem_tich_luy);
    $(model).find(".ghi_chu").val(sanpham.ghi_chu);
};

const validateSanPhamInformation = (alertContainer, sanpham) => {
    //Validate
    let ten = sanpham.ten;
    let gia = sanpham.gia;
    let diem_tich_luy = sanpham.diem_tich_luy;
    let ghi_chu = sanpham.ghi_chu;

    let numberValidateError = 0;
    if (!ten || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên sản phẩm không được để trống"));
        numberValidateError += 1;
    }
    if (!gia || gia === "") {
        $(alertContainer).append(createAlerts("danger", "Giá không được để trống"));
        numberValidateError += 1;
    }
    else if (gia % 500 !== 0) {
        $(alertContainer).append(createAlerts("danger", "Giá phải là bội của 500"));
        numberValidateError += 1;
    }
    else if (gia < 0) {
        $(alertContainer).append(createAlerts("danger", "Giá phải lớn hơn 0"));
        numberValidateError += 1;
    }
    if (!diem_tich_luy || diem_tich_luy === "")  {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy không được để trống"));
        numberValidateError += 1;
    }
    else if (diem_tich_luy < 0) {
        $(alertContainer).append(createAlerts("danger", "Điểm tích lũy phải lớn hơn 0"));
        numberValidateError += 1;
    }
    return numberValidateError;
};