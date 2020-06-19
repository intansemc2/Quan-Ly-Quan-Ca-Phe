let tableQuanLyChiTietHoaDon;
let sanphams = [];

$(document).ready(function () {
//Active dataTable
    tableQuanLyChiTietHoaDon = $("#tableQuanLyChiTietHoaDon").DataTable({
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
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaChiTietHoaDon" modify="${chitiethoadon.id_hoa_don} ${chitiethoadon.id_san_pham}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLCTHDRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    $("#danhDauTatCaChiTietHoaDon").click(function () {
        $("#modelChiTietHoaDon").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaChiTietHoaDon").click(function () {
        $("#modelChiTietHoaDon").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauChiTietHoaDon").click(function () {
        let markedRows = $("#modelChiTietHoaDon").find(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
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

        let modifyChiTietHoaDon = extractModelSuaChiTietHoaDon();

        //Validate
        let numberValidateError = validateChiTietHoaDonInformation($("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonAlerts"), modifyChiTietHoaDon);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newChiTietHoaDon = modifyChiTietHoaDon;
        let id_hoa_don = $(this).parents("#modelSuaChiTietHoaDon").attr("id_hoa_don");
        let id_san_pham = $(this).parents("#modelSuaChiTietHoaDon").attr("id_san_pham");
        let oldChiTietHoaDonRow = $("#tableQuanLyChiTietHoaDon").find(`button[modify='${id_hoa_don} ${id_san_pham}']`).parents("tr");
        debugger;

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

        $(this).attr("id_hoa_don", modifyChiTietHoaDon.id_hoa_don);
        $(this).attr("id_san_pham", modifyChiTietHoaDon.id_san_pham);
        setModelSuaChiTietHoaDon(modifyChiTietHoaDon);
    });

    $("#modelThemChiTietHoaDon").find(".close").click(() => $("#modelThemChiTietHoaDon").trigger("click"));
    $("#modelSuaChiTietHoaDon").find(".close").click(() => $("#modelSuaChiTietHoaDon").trigger("click"));

    $("#themChiTietHoaDonSanPham").change(function () {        
        let id_san_pham = $(this).val();
        let sanpham = sanphams.find(item => item.id_san_pham == id_san_pham);
        $(this).parents("#modelThemChiTietHoaDon").find(".don_gia").val(sanpham.gia);
        $(this).parents("#modelThemChiTietHoaDon").find(".diem_tich_luy").val(sanpham.diem_tich_luy);
    });

    $("#themChiTietHoaDon").click(function () {
        let id_hoa_don = $(this).parents("#modelChiTietHoaDon").attr("id_hoa_don");
        $("#modelThemChiTietHoaDon").find(".id_hoa_don").val(id_hoa_don);
        $("#modelThemChiTietHoaDon").find(".id_san_pham").val(sanphams[0].id_san_pham);
    });
});

const createTableQLCTHDArrayDataRow = (chitiethoadon) => {
    return [chitiethoadon.id_hoa_don, chitiethoadon.id_san_pham, chitiethoadon.so_luong, chitiethoadon.don_gia, chitiethoadon.diem_tich_luy, chitiethoadon];
};

const extractDataFromTableQLCTHDRow = (tableRow) => {
    let id_hoa_don = $(tableRow).find(".id_hoa_don").attr("data");
    let id_san_pham = $(tableRow).find(".id_san_pham").attr("data");
    let so_luong = $(tableRow).find(".so_luong").attr("data");
    let don_gia = $(tableRow).find(".don_gia").attr("data");
    let diem_tich_luy = $(tableRow).find(".diem_tich_luy").attr("data");
    return  {id_hoa_don:id_hoa_don, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const refreshDataTableQLCTHD = () => {    
    //Lấy thông tin usernames
    sanphams = [];
    for (let i = 0; i < 10; i += 1) { sanphams.push({id_san_pham: i, ten: `Sản phẩm ${i}`, gia: Math.floor(Math.random()*1000)*1000, diem_tich_luy: Math.floor(Math.random()*1000)}); }

    //Thêm option username
    $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonSanPham").html("");
    $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonSanPham").html("");
    for (let sanpham of sanphams) {
        let newUsernameOption = `<option value="${sanpham.id_san_pham}">${sanpham.id_san_pham} - ${sanpham.ten}</option>`;
        $("#modelThemChiTietHoaDon").find("#themChiTietHoaDonSanPham").append(newUsernameOption);
        $("#modelSuaChiTietHoaDon").find("#suaChiTietHoaDonSanPham").append(newUsernameOption);
    }

    tableQuanLyChiTietHoaDon.clear();
    //Lấy thông tin hoá đơn
    let n = Math.floor(Math.random() * 10);
    let chitiethoadons =[];
    for (let i = 0; i < n; i += 1) {
        let id_hoa_don = i;
        let id_san_pham = sanphams[Math.floor(Math.random()*sanphams.length)].id_san_pham;
        let so_luong = Math.floor(Math.random()*sanphams.length)
        let don_gia = sanphams[Math.floor(Math.random()*sanphams.length)].gia;
        let diem_tich_luy = sanphams[Math.floor(Math.random()*sanphams.length)].diem_tich_luy;
        chitiethoadons.push({id_hoa_don:id_hoa_don, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy});
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
    return extractFromModelChiTietHoaDon($("#modelThemChiTietHoaDon"));
};

const extractModelSuaChiTietHoaDon = () => {
    return extractFromModelChiTietHoaDon($("#modelSuaChiTietHoaDon"));
};

const extractFromModelChiTietHoaDon = (model) => {
    //Lấy thông tin
    let id_hoa_don = $(model).find(".id_hoa_don").val();
    let id_san_pham = $(model).find(".id_san_pham").val();
    let so_luong = $(model).find(".so_luong").val();
    let don_gia = $(model).find(".don_gia").val();
    let diem_tich_luy = $(model).find(".diem_tich_luy").val();
    return  {id_hoa_don:id_hoa_don, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const setModelThemChiTietHoaDon = (modifyChiTietHoaDon) => {
    setToModelChiTietHoaDon($("#modelThemChiTietHoaDon"), modifyChiTietHoaDon);
};

const setModelSuaChiTietHoaDon = (modifyChiTietHoaDon) => {
    setToModelChiTietHoaDon($("#modelSuaChiTietHoaDon"), modifyChiTietHoaDon);
};

const setToModelChiTietHoaDon = (model, chitiethoadon) => {
    $(model).find(".id_hoa_don").val(chitiethoadon.id_hoa_don);
    $(model).find(".id_san_pham").val(chitiethoadon.id_san_pham);
    $(model).find(".so_luong").val(chitiethoadon.so_luong);
    $(model).find(".don_gia").val(chitiethoadon.don_gia);
    $(model).find(".diem_tich_luy").val(chitiethoadon.diem_tich_luy);
};

const validateChiTietHoaDonInformation = (alertContainer, chitiethoadon) => {
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