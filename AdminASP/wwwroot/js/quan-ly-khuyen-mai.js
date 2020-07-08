let tableQuanLyKhuyenMai;

$(document).ready(function () {
/*Active dataTable*/
    tableQuanLyKhuyenMai = $("#tableQuanLyKhuyenMai").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_khuyen_mai" data="${data}">${renderData}</span>`;
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
                    let renderData = `${convertDateTimeToString(data)}`;
                    return `<span class="thoi_gian_bat_dau" data="${data}">${renderData}</span>`;
                }
            },            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = `${convertDateTimeToString(data)}`;
                    return `<span class="thoi_gian_ket_thuc" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 4,
                "render": function (data, type, row, meta) {
                    let khuyenmai = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaKhuyenMai" modify="${khuyenmai.id_khuyen_mai}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-dark m-1 so_khuyen_mai" data-toggle="modal" data-target="#modelChiTietKhuyenMai" modify="${khuyenmai.id_khuyen_mai}" data="${khuyenmai.so_khuyen_mai}">${khuyenmai.so_khuyen_mai}<i class="fa fa-gift ml-2"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLKMRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLKM();

    $("#danhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDau").click(function () {
        let markedRows = $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyKhuyenMai.rows(markedRows).remove().draw();
    });
    $("#xoaTatCa").click(function () {
        tableQuanLyKhuyenMai.clear().draw();
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLKM();
    });
    $("#modelThemKhuyenMai").find("#themKhuyenMaiConfirm").click(function () {
        /*Xóa hết alert cũ*/
        $("#modelThemKhuyenMai").find("#themKhuyenMaiAlerts").html("");
        
        /*Validate*/
        let modifyKhuyenMai = extractModelThemKhuyenMai();
        let numberValidateError = validateKhuyenMaiInformation($("#modelThemKhuyenMai").find("#themKhuyenMaiAlerts"), modifyKhuyenMai);
        if (numberValidateError > 0) {
            return;
        }

        /*Tạo khuyến mãi mới */
        let newKhuyenMai = modifyKhuyenMai;
        newKhuyenMai.id_khuyen_mai = -1;
        newKhuyenMai.so_khuyen_mai = 0;
        /*Thêm xuống CSDL*/
        let themKMResult = true;
        /*Thêm thành công*/
        if (themKMResult) {
            $("#modelThemKhuyenMai").find("#themKhuyenMaiAlerts").append(createAlerts("success", "Thêm thành công"));
            /*Thêm khuyến mãi mới vào bảng*/
            $("#modelThemKhuyenMai").find(".close").trigger("click");
            tableQuanLyKhuyenMai.row.add(createTableQLKMArrayDataRow(newKhuyenMai)).draw();
        }
        /*Thêm thất bại*/
        else {
            $("#modelThemKhuyenMai").find("#themKhuyenMaiAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelThemKhuyenMai").find("#themKhuyenMaiReset").click(function() {
        setModelThemKhuyenMai({});
    });

    $("#modelSuaKhuyenMai").find("#suaKhuyenMaiConfirm").click(function () {
        /*Xóa hết alert cũ*/
        $("#modelSuaKhuyenMai").find("#suaKhuyenMaiAlerts").html("");        

        /*Validate*/
        let modifyKhuyenMai = extractModelSuaKhuyenMai();
        let numberValidateError = validateKhuyenMaiInformation($("#modelSuaKhuyenMai").find("#suaKhuyenMaiAlerts"), modifyKhuyenMai);
        if (numberValidateError > 0) {
            return;
        }

        /*Tạo khuyến mãi mới */
        let newKhuyenMai = modifyKhuyenMai;
        let old_id_khuyen_mai = $("#modelSuaKhuyenMai").attr("id_khuyen_mai");
        let oldKhuyenMaiRow = $("#tableQuanLyKhuyenMai").find("button[modify='" + old_id_khuyen_mai + "']").parents("tr");

        /*Sửa xuống CSDL*/
        let suaKMResult = true;

        /*Sửa thành công*/
        if (suaKMResult) {
            $("#modelSuaKhuyenMai").find("#suaKhuyenMaiAlerts").append(createAlerts("success", "Sửa thành công"));

            /*Sửa khuyến mãi mới vào bảng*/
            $("#modelSuaKhuyenMai").find(".close").trigger("click");
            tableQuanLyKhuyenMai.row(oldKhuyenMaiRow).data(createTableQLKMArrayDataRow(newKhuyenMai)).draw();            
        }
        /*Sửa thất bại*/
        else {
            $("#modelSuaKhuyenMai").find("#suaKhuyenMaiAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaKhuyenMai").find("#suaKhuyenMaiReset").click(function() {
        setModelSuaKhuyenMai({});
    });

    $('#modelChiTietKhuyenMai').on('show.bs.modal', function (event) {
        let suaKhuyenMaiTriggered = $(event.relatedTarget); /* Button that triggered the modal*/

        let rowKhuyenMai = suaKhuyenMaiTriggered.parents("tr");        

        if ($(rowKhuyenMai).find("button[data-target='#modelChiTietKhuyenMai']").length) {
            let modifyKhuyenMai = extractDataFromTableQLKMRow(rowKhuyenMai);
            $(this).attr("id_khuyen_mai", modifyKhuyenMai.id_khuyen_mai);

            $("#modelChiTietKhuyenMai").find("#khuyenMaiTitleInformation").text(`${$(rowKhuyenMai).find(".id_khuyen_mai").attr("data")}`);
             refreshDataTableQLCTKM();
         }
    });

    $('#modelSuaKhuyenMai').on('show.bs.modal', function (event) {
        let suaKhuyenMaiTriggered = $(event.relatedTarget); /* Button that triggered the modal*/        

        let modifyKhuyenMai = extractDataFromTableQLKMRow(suaKhuyenMaiTriggered.parents("tr"));
        $(this).attr("id_khuyen_mai", modifyKhuyenMai.id_khuyen_mai);
        
        setModelSuaKhuyenMai(modifyKhuyenMai);       
    });

    $("#modelThemKhuyenMai").find("#themKhuyenMaiThoiGianBatDauCurrentTime").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemKhuyenMai").find(".thoi_gian_bat_dau[type='date']").val(currentTimeParts[0]);
        $("#modelThemKhuyenMai").find(".thoi_gian_bat_dau[type='time']").val(currentTimeParts[1]);
    });

    $("#modelThemKhuyenMai").find("#themKhuyenMaiThoiGianKetThucCurrentTime").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemKhuyenMai").find(".thoi_gian_ket_thuc[type='date']").val(currentTimeParts[0]);
        $("#modelThemKhuyenMai").find(".thoi_gian_ket_thuc[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaKhuyenMai").find("#suaKhuyenMaiThoiGianBatDauCurrentTime").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaKhuyenMai").find(".thoi_gian_bat_dau[type='date']").val(currentTimeParts[0]);
        $("#modelSuaKhuyenMai").find(".thoi_gian_bat_dau[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaKhuyenMai").find("#suaKhuyenMaiThoiGianKetThucCurrentTime").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaKhuyenMai").find(".thoi_gian_ket_thuc[type='date']").val(currentTimeParts[0]);
        $("#modelSuaKhuyenMai").find(".thoi_gian_ket_thuc[type='time']").val(currentTimeParts[1]);
    });
});

let createTableQLKMArrayDataRow = (khuyenmai) => {
    return [khuyenmai.id_khuyen_mai, khuyenmai.ten, khuyenmai.thoi_gian_bat_dau, khuyenmai.thoi_gian_ket_thuc, khuyenmai];
};

let extractDataFromTableQLKMRow = (tableRow) => {
    let id_khuyen_mai = $(tableRow).find(".id_khuyen_mai").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let thoi_gian_bat_dau = $(tableRow).find(".thoi_gian_bat_dau").attr("data");
    let thoi_gian_ket_thuc = $(tableRow).find(".thoi_gian_ket_thuc").attr("data");
    let so_khuyen_mai = $(tableRow).find(".so_khuyen_mai").attr("data");

    return {id_khuyen_mai: id_khuyen_mai, ten: ten, thoi_gian_bat_dau: thoi_gian_bat_dau, thoi_gian_ket_thuc: thoi_gian_ket_thuc, so_khuyen_mai: so_khuyen_mai};
};

let refreshDataTableQLKM = () => {
    tableQuanLyKhuyenMai.clear();

    /*Lấy thông tin hóa đơn*/
    let khuyenmais = [];
    let n = Math.floor(Math.random()*10);
    for (let i=0; i<n; i+=1) {
        khuyenmais.push( {id_khuyen_mai: i, ten: `Khuyến mãi ${i}`, thoi_gian_bat_dau: new Date(), thoi_gian_ket_thuc: new Date(), so_khuyen_mai: Math.floor(Math.random() * 100 + 1) });
    }

    /*Thêm vào bảng*/
    for (let khuyenmai of khuyenmais) {
        tableQuanLyKhuyenMai.row.add(createTableQLKMArrayDataRow(khuyenmai));
    }
    tableQuanLyKhuyenMai.draw();
};

const deleteTableQLKMRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyKhuyenMai.row(tableRow).remove().draw();
};

const extractModelThemKhuyenMai = () => {
    return extractFromModelKhuyenMai($("#modelThemKhuyenMai"));
};

const extractModelSuaKhuyenMai = () => {
    return extractFromModelKhuyenMai($("#modelSuaKhuyenMai"));
};

const extractFromModelKhuyenMai = (model) => {
/*Lấy thông tin*/
    let id_khuyen_mai = $(model).find(".id_khuyen_mai").val();
    let ten = $(model).find(".ten").val();
    let so_khuyen_mai = $(model).find(".so_khuyen_mai").val();

    let thoi_gian_bat_dau_date = $(model).find(".thoi_gian_bat_dau[type='date']").val();
    let thoi_gian_bat_dau_time = $(model).find(".thoi_gian_bat_dau[type='time']").val();
    let thoi_gian_bat_dau = undefined;
    if (thoi_gian_bat_dau_date !== "" && thoi_gian_bat_dau_time !== "") {
        thoi_gian_bat_dau = new Date(`${thoi_gian_bat_dau_date} ${thoi_gian_bat_dau_time}`);
    }

    let thoi_gian_ket_thuc_date = $(model).find(".thoi_gian_ket_thuc[type='date']").val();
    let thoi_gian_ket_thuc_time = $(model).find(".thoi_gian_ket_thuc[type='time']").val();
    let thoi_gian_ket_thuc = undefined; 
    if (thoi_gian_ket_thuc_date !== "" && thoi_gian_ket_thuc_time !== "") {
        thoi_gian_ket_thuc = new Date(`${thoi_gian_ket_thuc_date} ${thoi_gian_ket_thuc_time}`);
    }

    return {id_khuyen_mai: id_khuyen_mai, ten: ten, thoi_gian_bat_dau: thoi_gian_bat_dau, thoi_gian_ket_thuc: thoi_gian_ket_thuc, so_khuyen_mai: so_khuyen_mai};
};

const setModelThemKhuyenMai = (modifyKhuyenMai) => {
    setToModelKhuyenMai($("#modelThemKhuyenMai"), modifyKhuyenMai);
};

const setModelSuaKhuyenMai = (modifyKhuyenMai) => {
    setToModelKhuyenMai($("#modelSuaKhuyenMai"), modifyKhuyenMai);
};

const setToModelKhuyenMai = (model, khuyenmai) => {
    $(model).find(".id_khuyen_mai").val(khuyenmai.id_khuyen_mai);
    $(model).find(".ten").val(khuyenmai.ten);
    $(model).find(".so_khuyen_mai").val(khuyenmai.so_khuyen_mai);

    let datetime_bat_dauStrings = convertDateTimeToString(khuyenmai.thoi_gian_bat_dau).split(" ");
    $(model).find(".thoi_gian_bat_dau[type='date']").val(datetime_bat_dauStrings[0]);
    $(model).find(".thoi_gian_bat_dau[type='time']").val(datetime_bat_dauStrings[1]);

    let datetime_ket_thucStrings = convertDateTimeToString(khuyenmai.thoi_gian_ket_thuc).split(" ");
    $(model).find(".thoi_gian_ket_thuc[type='date']").val(datetime_ket_thucStrings[0]);
    $(model).find(".thoi_gian_ket_thuc[type='time']").val(datetime_ket_thucStrings[1]);
};

const validateKhuyenMaiInformation = (alertContainer, khuyenmai) => {
    /*Validate*/
    let id_khuyen_mai = khuyenmai.id_khuyen_mai;
    let ten = khuyenmai.ten;
    let thoi_gian_bat_dau = khuyenmai.thoi_gian_bat_dau;
    let thoi_gian_ket_thuc = khuyenmai.thoi_gian_ket_thuc;

    let numberValidateError = 0;
    if (!ten || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên khuyến mãi không được để trống"));
        numberValidateError += 1;
    }
    if (!thoi_gian_bat_dau || thoi_gian_bat_dau === "") {
        $(alertContainer).append(createAlerts("danger", "Thời gian bắt đầu không được để trống"));
        numberValidateError += 1;
    }
    if (!thoi_gian_ket_thuc || thoi_gian_ket_thuc === "") {
        $(alertContainer).append(createAlerts("danger", "Thời gian kết thúc không được để trống"));
        numberValidateError += 1;
    }
    if (thoi_gian_bat_dau > thoi_gian_ket_thuc === "") {
        $(alertContainer).append(createAlerts("danger", "Thời gian bắt đầu phải không được lớn hơn Thời gian kết thúc"));
        numberValidateError += 1;
    }
    return numberValidateError;
};