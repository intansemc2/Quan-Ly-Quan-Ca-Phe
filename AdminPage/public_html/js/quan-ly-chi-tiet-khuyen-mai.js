let tableQuanLyChiTietKhuyenMai;
let sanphams = [];

$(document).ready(function () {
/*Active dataTable*/
    tableQuanLyChiTietKhuyenMai = $("#tableQuanLyChiTietKhuyenMai").DataTable({
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
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaChiTietKhuyenMai" modify="${chitietkhuyenmai.id_khuyen_mai} ${chitietkhuyenmai.id_san_pham}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLCTKMRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    $("#danhDauTatCaChiTietKhuyenMai").click(function () {
        $("#modelChiTietKhuyenMai").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaChiTietKhuyenMai").click(function () {
        $("#modelChiTietKhuyenMai").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauChiTietKhuyenMai").click(function () {
        let markedRows = $("#modelChiTietKhuyenMai").find(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyChiTietKhuyenMai.rows(markedRows).remove().draw();
    });
    $("#xoaTatCaChiTietKhuyenMai").click(function () {
        tableQuanLyChiTietKhuyenMai.clear().draw();
    });
    $("#lamMoiChiTietKhuyenMai").click(function () {
        refreshDataTableQLCTKM();
    });
    $("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiConfirm").click(function () {
        /*Xóa hết alert cũ*/
        $("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiAlerts").html("");
        
        /*Validate*/
        let modifyChiTietKhuyenMai = extractModelThemChiTietKhuyenMai();
        let numberValidateError = validateChiTietKhuyenMaiInformation($("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiAlerts"), modifyChiTietKhuyenMai);
        if (numberValidateError > 0) {
            return;
        }

        /*Tạo khuyến mãi mới */
        let newChiTietKhuyenMai = modifyChiTietKhuyenMai;
        /*Thêm xuống CSDL*/
        let themNVResult = true;
        /*Thêm thành công*/
        if (themNVResult) {
            $("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiAlerts").append(createAlerts("success", "Thêm thành công"));
            /*Thêm khuyến mãi mới vào bảng*/
            $("#modelThemChiTietKhuyenMai").find(".close").trigger("click");
            tableQuanLyChiTietKhuyenMai.row.add(createTableQLCTKMArrayDataRow(newChiTietKhuyenMai)).draw();
        }
        /*Thêm thất bại*/
        else {
            $("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiReset").click(function() {
        setModelThemChiTietKhuyenMai({});
    });

    $("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiConfirm").click(function () {
        /*Xóa hết alert cũ*/
        $("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiAlerts").html("");        

        let modifyChiTietKhuyenMai = extractModelSuaChiTietKhuyenMai();

        /*Validate*/
        let numberValidateError = validateChiTietKhuyenMaiInformation($("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiAlerts"), modifyChiTietKhuyenMai);
        if (numberValidateError > 0) {
            return;
        }

        /*Tạo khuyến mãi mới */
        let newChiTietKhuyenMai = modifyChiTietKhuyenMai;
        let id_khuyen_mai = $(this).parents("#modelSuaChiTietKhuyenMai").attr("id_khuyen_mai");
        let id_san_pham = $(this).parents("#modelSuaChiTietKhuyenMai").attr("id_san_pham");
        let oldChiTietKhuyenMaiRow = $("#tableQuanLyChiTietKhuyenMai").find(`button[modify='${id_khuyen_mai} ${id_san_pham}']`).parents("tr");

        /*Sửa xuống CSDL*/
        let suaNVResult = true;

        /*Sửa thành công*/
        if (suaNVResult) {
            $("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiAlerts").append(createAlerts("success", "Sửa thành công"));

            /*Sửa khuyến mãi mới vào bảng*/
            $("#modelSuaChiTietKhuyenMai").find(".close").trigger("click");
            tableQuanLyChiTietKhuyenMai.row(oldChiTietKhuyenMaiRow).data(createTableQLCTKMArrayDataRow(newChiTietKhuyenMai)).draw();            
        }
        /*Sửa thất bại*/
        else {
            $("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiReset").click(function() {
        setModelSuaChiTietKhuyenMai({});
    });

    $('#modelSuaChiTietKhuyenMai').on('show.bs.modal', function (event) {
        let suaChiTietKhuyenMaiTriggered = $(event.relatedTarget); /* Button that triggered the modal*/

        let modifyChiTietKhuyenMai = extractDataFromTableQLCTKMRow(suaChiTietKhuyenMaiTriggered.parents("tr"));

        $(this).attr("id_khuyen_mai", modifyChiTietKhuyenMai.id_khuyen_mai);
        $(this).attr("id_san_pham", modifyChiTietKhuyenMai.id_san_pham);
        setModelSuaChiTietKhuyenMai(modifyChiTietKhuyenMai);
    });

    $("#modelThemChiTietKhuyenMai").find(".close").click(() => $("#modelThemChiTietKhuyenMai").trigger("click"));
    $("#modelSuaChiTietKhuyenMai").find(".close").click(() => $("#modelSuaChiTietKhuyenMai").trigger("click"));

    $("#themChiTietKhuyenMaiSanPham").change(function () {        
        let id_san_pham = $(this).val();
        let sanpham = sanphams.find(item => item.id_san_pham == id_san_pham);
        $(this).parents("#modelThemChiTietKhuyenMai").find(".don_gia").val(sanpham.don_gia);
        $(this).parents("#modelThemChiTietKhuyenMai").find(".diem_tich_luy").val(sanpham.diem_tich_luy);
    });

    $("#themChiTietKhuyenMai").click(function () {
        let id_khuyen_mai = $(this).parents("#modelChiTietKhuyenMai").attr("id_khuyen_mai");
        $("#modelThemChiTietKhuyenMai").find(".id_khuyen_mai").val(id_khuyen_mai);
        $("#modelThemChiTietKhuyenMai").find(".id_san_pham").val(sanphams[0].id_san_pham);
    });
});

const createTableQLCTKMArrayDataRow = (chitietkhuyenmai) => {
    return [chitietkhuyenmai.id_khuyen_mai, chitietkhuyenmai.id_san_pham, chitietkhuyenmai.so_luong, chitietkhuyenmai.don_gia, chitietkhuyenmai.diem_tich_luy, chitietkhuyenmai];
};

const extractDataFromTableQLCTKMRow = (tableRow) => {
    let id_khuyen_mai = $(tableRow).find(".id_khuyen_mai").attr("data");
    let id_san_pham = $(tableRow).find(".id_san_pham").attr("data");
    let so_luong = $(tableRow).find(".so_luong").attr("data");
    let don_gia = $(tableRow).find(".don_gia").attr("data");
    let diem_tich_luy = $(tableRow).find(".diem_tich_luy").attr("data");
    return  {id_khuyen_mai:id_khuyen_mai, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const refreshDataTableQLCTKM = () => {    
    /*Lấy thông tin usernames*/
    sanphams = [];
    for (let i = 0; i < 10; i += 1) { sanphams.push({id_san_pham: i, ten: `Sản phẩm ${i}`, don_gia: Math.floor(Math.random()*1000)*1000, diem_tich_luy: Math.floor(Math.random()*1000)}); }

    /*Thêm option username*/
    $("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiSanPham").html("");
    $("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiSanPham").html("");
    for (let sanpham of sanphams) {
        let newUsernameOption = `<option value="${sanpham.id_san_pham}">${sanpham.id_san_pham} - ${sanpham.ten}</option>`;
        $("#modelThemChiTietKhuyenMai").find("#themChiTietKhuyenMaiSanPham").append(newUsernameOption);
        $("#modelSuaChiTietKhuyenMai").find("#suaChiTietKhuyenMaiSanPham").append(newUsernameOption);
    }

    tableQuanLyChiTietKhuyenMai.clear();
    /*Lấy thông tin khuyến mãi*/
    let n = Math.floor(Math.random() * 10);
    let chitietkhuyenmais =[];
    for (let i = 0; i < n; i += 1) {
        let id_khuyen_mai = i;
        let id_san_pham = sanphams[Math.floor(Math.random()*sanphams.length)].id_san_pham;
        let so_luong = Math.floor(Math.random()*sanphams.length)
        let don_gia = sanphams[Math.floor(Math.random()*sanphams.length)].don_gia;
        let diem_tich_luy = sanphams[Math.floor(Math.random()*sanphams.length)].diem_tich_luy;
        chitietkhuyenmais.push({id_khuyen_mai:id_khuyen_mai, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy});
    }

    /*Thêm vào bảng*/
    for (let chitietkhuyenmai of chitietkhuyenmais) {
        tableQuanLyChiTietKhuyenMai.row.add(createTableQLCTKMArrayDataRow(chitietkhuyenmai));
    }
    tableQuanLyChiTietKhuyenMai.draw();
};

const deleteTableQLCTKMRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyChiTietKhuyenMai.row(tableRow).remove().draw();
};

const extractModelThemChiTietKhuyenMai = () => {
    return extractFromModelChiTietKhuyenMai($("#modelThemChiTietKhuyenMai"));
};

const extractModelSuaChiTietKhuyenMai = () => {
    return extractFromModelChiTietKhuyenMai($("#modelSuaChiTietKhuyenMai"));
};

const extractFromModelChiTietKhuyenMai = (model) => {
    /*Lấy thông tin*/
    let id_khuyen_mai = $(model).find(".id_khuyen_mai").val();
    let id_san_pham = $(model).find(".id_san_pham").val();
    let so_luong = $(model).find(".so_luong").val();
    let don_gia = $(model).find(".don_gia").val();
    let diem_tich_luy = $(model).find(".diem_tich_luy").val();
    return  {id_khuyen_mai:id_khuyen_mai, id_san_pham:id_san_pham, so_luong:so_luong, don_gia:don_gia, diem_tich_luy:diem_tich_luy};
};

const setModelThemChiTietKhuyenMai = (modifyChiTietKhuyenMai) => {
    setToModelChiTietKhuyenMai($("#modelThemChiTietKhuyenMai"), modifyChiTietKhuyenMai);
};

const setModelSuaChiTietKhuyenMai = (modifyChiTietKhuyenMai) => {
    setToModelChiTietKhuyenMai($("#modelSuaChiTietKhuyenMai"), modifyChiTietKhuyenMai);
};

const setToModelChiTietKhuyenMai = (model, chitietkhuyenmai) => {
    $(model).find(".id_khuyen_mai").val(chitietkhuyenmai.id_khuyen_mai);
    $(model).find(".id_san_pham").val(chitietkhuyenmai.id_san_pham);
    $(model).find(".so_luong").val(chitietkhuyenmai.so_luong);
    $(model).find(".don_gia").val(chitietkhuyenmai.don_gia);
    $(model).find(".diem_tich_luy").val(chitietkhuyenmai.diem_tich_luy);
};

const validateChiTietKhuyenMaiInformation = (alertContainer, chitietkhuyenmai) => {
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