let tableQuanLyCTLSP;

$(document).ready(function () {
//Active dataTable
    tableQuanLyCTLSP = $("#tableQuanLyCTLSP").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_loaisp" data="${data}">${renderData}</span>`;
                }
            },            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_san_pham" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="ten" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="gia" data="${data}">${renderData}</span>`;
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
                    let renderData = data;
                    return `<span class="ghi_chu" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 6,
                "render": function (data, type, row, meta) {
                    let chitietloaisanpham = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaCTLSP" modify="${chitietloaisanpham.id_san_pham}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLCTLoaiSanPhamRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    $("#danhDauTatCaCTLSP").click(function () {
        $("#modelChiTietLoaiSanPham").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaCTLSP").click(function () {
        $("#modelChiTietLoaiSanPham").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauCTLSP").click(function () {
        let markedRows = $("#modelChiTietLoaiSanPham").find(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyCTLSP.rows(markedRows).remove().draw();
    });
    $("#xoaTatCaCTLSP").click(function () {
        tableQuanLyCTLSP.clear().draw();
    });
    $("#lamMoiCTLSP").click(function () {
        refreshDataTableQLCTLoaiSanPham();
    });
    $("#modelThemCTLSP").find("#themCTLSPComfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemCTLSP").find("#themCTLSPAlerts").html("");
        
        //Validate
        let modifyCTLSP = extractModelThemCTLSP();
        let numberValidateError = validateCTLSPInformation($("#modelThemCTLSP").find("#themCTLSPAlerts"), modifyCTLSP);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo loại sản phẩm mới 
        let newCTLSP = modifyCTLSP;
        newCTLSP.id_san_pham = -1;
        //Thêm xuống CSDL
        let themNVResult = true;
        //Thêm thành công
        if (themNVResult) {
            $("#modelThemCTLSP").find("#themCTLSPAlerts").append(createAlerts("success", "Thêm thành công"));
            //Thêm loại sản phẩm mới vào bảng
            $("#modelThemCTLSP").find(".close").trigger("click");
            tableQuanLyCTLSP.row.add(createTableQLCTLoaiSanPhamArrayDataRow(newCTLSP)).draw();
        }
        //Thêm thất bại
        else {
            $("#modelThemCTLSP").find("#themCTLSPAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelSuaCTLSP").find("#suaCTLSPComfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaCTLSP").find("#suaCTLSPAlerts").html("");        

        let modifyCTLSP = extractModelSuaCTLSP();

        //Validate
        let numberValidateError = validateCTLSPInformation($("#modelSuaCTLSP").find("#suaCTLSPAlerts"), modifyCTLSP);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo loại sản phẩm mới 
        let newCTLSP = modifyCTLSP;
        let id_san_pham = $(this).parents("#modelSuaCTLSP").attr("id_san_pham");
        let oldCTLSPRow = $("#tableQuanLyCTLSP").find(`button[modify='${id_san_pham}']`).parents("tr");

        //Sửa xuống CSDL
        let suaNVResult = true;

        //Sửa thành công
        if (suaNVResult) {
            $("#modelSuaCTLSP").find("#suaCTLSPAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa loại sản phẩm mới vào bảng
            $("#modelSuaCTLSP").find(".close").trigger("click");
            tableQuanLyCTLSP.row(oldCTLSPRow).data(createTableQLCTLoaiSanPhamArrayDataRow(newCTLSP)).draw();            
        }
        //Sửa thất bại
        else {
            $("#modelSuaCTLSP").find("#suaCTLSPAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelThemCTLSP").find("#themCTLSPReset").click(function() {
        let parent_id_loaisp = $("#modelChiTietLoaiSanPham").attr("id_loaisp");
        setModelThemCTLSP({id_loaisp: parent_id_loaisp});
    });

    $("#modelSuaCTLSP").find("#suaCTLSPReset").click(function() {
        let parent_id_loaisp = $("#modelChiTietLoaiSanPham").attr("id_loaisp");
        setModelThemCTLSP({id_loaisp: parent_id_loaisp});
    });

    $('#modelThemCTLSP').on('show.bs.modal', function (event) {
        let parent_id_loaisp = $("#modelChiTietLoaiSanPham").attr("id_loaisp");
        setModelThemCTLSP({id_loaisp: parent_id_loaisp});
    });

    $('#modelSuaCTLSP').on('show.bs.modal', function (event) {
        let suaCTLSPTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyCTLSP = extractDataFromTableQLCTLoaiSanPhamRow(suaCTLSPTriggered.parents("tr"));

        $(this).attr("id_san_pham", modifyCTLSP.id_san_pham);
        setModelSuaCTLSP(modifyCTLSP);
    });

    $("#modelThemCTLSP").find(".close").click(() => $("#modelThemCTLSP").trigger("click"));
    $("#modelSuaCTLSP").find(".close").click(() => $("#modelSuaCTLSP").trigger("click"));
});

const createTableQLCTLoaiSanPhamArrayDataRow = (chitietloaisanpham) => {
    return [chitietloaisanpham.id_loaisp, chitietloaisanpham.id_san_pham, chitietloaisanpham.ten, chitietloaisanpham.gia, chitietloaisanpham.diem_tich_luy, chitietloaisanpham.ghi_chu, chitietloaisanpham];
};

const extractDataFromTableQLCTLoaiSanPhamRow = (tableRow) => {
    let id_loaisp = $(tableRow).find(".id_loaisp").attr("data");
    let id_san_pham = $(tableRow).find(".id_san_pham").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let gia = $(tableRow).find(".gia").attr("data");
    let diem_tich_luy = $(tableRow).find(".diem_tich_luy").attr("data");
    let ghi_chu = $(tableRow).find(".ghi_chu").attr("data");
    return  {id_loaisp:id_loaisp, id_san_pham:id_san_pham, ten:ten, gia:gia, diem_tich_luy: diem_tich_luy, ghi_chu:ghi_chu};
};

const refreshDataTableQLCTLoaiSanPham = () => {    
    //Lấy thông tin id_loaisp
    let parent_id_loaisp = $("#modelChiTietLoaiSanPham").attr("id_loaisp");

    tableQuanLyCTLSP.clear();
    //Lấy thông tin loại sản phẩm
    let n = Math.floor(Math.random() * 10);
    let chitietloaisanphams =[];
    for (let i = 0; i < n; i += 1) {
        let id_loaisp = parent_id_loaisp;
        let id_san_pham = i;
        let ten = "Sản phẩm " + i;
        let gia = Math.floor(Math.random()*1000) * 1000;
        let diem_tich_luy = Math.floor(Math.random()*1000);
        let ghi_chu = "Ghi chú " + i;
        chitietloaisanphams.push({id_loaisp:id_loaisp, id_san_pham:id_san_pham, ten:ten, gia:gia, diem_tich_luy:diem_tich_luy, ghi_chu:ghi_chu});
    }

    //Thêm vào bảng
    for (let chitietloaisanpham of chitietloaisanphams) {
        tableQuanLyCTLSP.row.add(createTableQLCTLoaiSanPhamArrayDataRow(chitietloaisanpham));
    }
    tableQuanLyCTLSP.draw();
};

const deleteTableQLCTLoaiSanPhamRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyCTLSP.row(tableRow).remove().draw();
};

const extractModelThemCTLSP = () => {
    return extractFromModelCTLSP($("#modelThemCTLSP"));
};

const extractModelSuaCTLSP = () => {
    return extractFromModelCTLSP($("#modelSuaCTLSP"));
};

const extractFromModelCTLSP = (model) => {
    //Lấy thông tin
    let id_loaisp = $(model).find(".id_loaisp").val();
    let id_san_pham = $(model).find(".id_san_pham").val();
    let ten = $(model).find(".ten").val();
    let gia = $(model).find(".gia").val();
    let diem_tich_luy = $(model).find(".diem_tich_luy").val();
    let ghi_chu = $(model).find(".ghi_chu").val();
    return  {id_loaisp:id_loaisp, id_san_pham:id_san_pham, ten:ten, gia:gia, diem_tich_luy:diem_tich_luy, ghi_chu:ghi_chu};
};

const setModelThemCTLSP = (modifyCTLSP) => {
    setToModelCTLSP($("#modelThemCTLSP"), modifyCTLSP);
};

const setModelSuaCTLSP = (modifyCTLSP) => {
    setToModelCTLSP($("#modelSuaCTLSP"), modifyCTLSP);
};

const setToModelCTLSP = (model, chitietloaisanpham) => {
    $(model).find(".id_loaisp").val(chitietloaisanpham.id_loaisp);
    $(model).find(".id_san_pham").val(chitietloaisanpham.id_san_pham);
    $(model).find(".ten").val(chitietloaisanpham.ten);
    $(model).find(".gia").val(chitietloaisanpham.gia);
    $(model).find(".diem_tich_luy").val(chitietloaisanpham.diem_tich_luy);
    $(model).find(".ghi_chu").val(chitietloaisanpham.ghi_chu);
};

const validateCTLSPInformation = (alertContainer, chitietloaisanpham) => {
    //Validate
    let ten = chitietloaisanpham.ten;
    let gia = chitietloaisanpham.gia;
    let diem_tich_luy = chitietloaisanpham.diem_tich_luy;
    let ghi_chu = chitietloaisanpham.ghi_chu;

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