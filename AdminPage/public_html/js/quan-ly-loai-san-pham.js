let tableQuanLyLoaiSanPham;

$(document).ready(function () {
//Active dataTable
    tableQuanLyLoaiSanPham = $("#tableQuanLyLoaiSanPham").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_loaisp" data="${data}">${renderData}</span>`;
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
                    let loaisanpham = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaLoaiSanPham" modify="${loaisanpham.id_loaisp}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-dark m-1 so_san_pham" data-toggle="modal" data-target="#modelChiTietLoaiSanPham" modify="${loaisanpham.id_loaisp}" data="${loaisanpham.so_san_pham}">${loaisanpham.so_san_pham}<i class="fa fa-gift ml-2"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLLoaiSanPhamRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    refreshDataTableQLLoaiSanPham();

    $("#danhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCa").click(function () {
        $(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDau").click(function () {
        let markedRows = $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyLoaiSanPham.rows(markedRows).remove().draw();
    });
    $("#xoaTatCa").click(function () {
        tableQuanLyLoaiSanPham.clear().draw();
    });
    $("#lamMoi").click(function () {
        refreshDataTableQLLoaiSanPham();
    });
    $("#modelThemLoaiSanPham").find("#themLoaiSanPhamConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemLoaiSanPham").find("#themLoaiSanPhamAlerts").html("");
        
        //Validate
        let modifyLoaiSanPham = extractModelThemLoaiSanPham();
        let numberValidateError = validateLoaiSanPhamInformation($("#modelThemLoaiSanPham").find("#themLoaiSanPhamAlerts"), modifyLoaiSanPham);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo loại sản phẩm mới 
        let newLoaiSanPham = modifyLoaiSanPham;
        newLoaiSanPham.id_loaisp = -1;
        newLoaiSanPham.so_san_pham = 0;
        //Thêm xuống CSDL
        let themLSPResult = true;
        //Thêm thành công
        if (themLSPResult) {
            $("#modelThemLoaiSanPham").find("#themLoaiSanPhamAlerts").append(createAlerts("success", "Thêm thành công"));
            //Thêm loại sản phẩm mới vào bảng
            $("#modelThemLoaiSanPham").find(".close").trigger("click");
            tableQuanLyLoaiSanPham.row.add(createTableQLLoaiSanPhamArrayDataRow(newLoaiSanPham)).draw();
        }
        //Thêm thất bại
        else {
            $("#modelThemLoaiSanPham").find("#themLoaiSanPhamAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelThemLoaiSanPham").find("#themLoaiSanPhamReset").click(function() {
        setModelThemLoaiSanPham({});
    });

    $("#modelSuaLoaiSanPham").find("#suaLoaiSanPhamConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaLoaiSanPham").find("#suaLoaiSanPhamAlerts").html("");        

        //Validate
        let modifyLoaiSanPham = extractModelSuaLoaiSanPham();
        let numberValidateError = validateLoaiSanPhamInformation($("#modelSuaLoaiSanPham").find("#suaLoaiSanPhamAlerts"), modifyLoaiSanPham);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo loại sản phẩm mới 
        let newLoaiSanPham = modifyLoaiSanPham;
        let oldLoaisanpham = $("#modelSuaLoaiSanPham").attr("id_loaisp");
        let oldLoaiSanPhamRow = $("#tableQuanLyLoaiSanPham").find("button[modify='" + oldLoaisanpham + "']").parents("tr");

        //Sửa xuống CSDL
        let suaLSPResult = true;

        //Sửa thành công
        if (suaLSPResult) {
            $("#modelSuaLoaiSanPham").find("#suaLoaiSanPhamAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa loại sản phẩm mới vào bảng
            $("#modelSuaLoaiSanPham").find(".close").trigger("click");
            tableQuanLyLoaiSanPham.row(oldLoaiSanPhamRow).data(createTableQLLoaiSanPhamArrayDataRow(newLoaiSanPham)).draw();            
        }
        //Sửa thất bại
        else {
            $("#modelSuaLoaiSanPham").find("#suaLoaiSanPhamAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaLoaiSanPham").find("#suaLoaiSanPhamReset").click(function() {
        setModelSuaLoaiSanPham({});
    });

    $('#modelChiTietLoaiSanPham').on('show.bs.modal', function (event) {
        let suaLoaiSanPhamTriggered = $(event.relatedTarget); // Button that triggered the modal

        let rowLoaiSanPham = suaLoaiSanPhamTriggered.parents("tr");        

        if ($(rowLoaiSanPham).find("button[data-target='#modelChiTietLoaiSanPham']").length) {
            let modifyLoaiSanPham = extractDataFromTableQLLoaiSanPhamRow(rowLoaiSanPham);
            $(this).attr("id_loaisp", modifyLoaiSanPham.id_loaisp);

            $("#modelChiTietLoaiSanPham").find("#loaiSanPhamTitleInformation").text(`${$(rowLoaiSanPham).find(".id_loaisp").attr("data")}`);
             refreshDataTableQLCTLoaiSanPham();
         }
    });

    $('#modelSuaLoaiSanPham').on('show.bs.modal', function (event) {
        let suaLoaiSanPhamTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyLoaiSanPham = extractDataFromTableQLLoaiSanPhamRow(suaLoaiSanPhamTriggered.parents("tr"));

        $(this).attr("id_loaisp", modifyLoaiSanPham.id_loaisp);
        setModelSuaLoaiSanPham(modifyLoaiSanPham);       
    });
});

const createTableQLLoaiSanPhamArrayDataRow = (loaisanpham) => {
    return [loaisanpham.id_loaisp, loaisanpham.ten, loaisanpham];
};

const extractDataFromTableQLLoaiSanPhamRow = (tableRow) => {
    let id_loaisp = $(tableRow).find(".id_loaisp").attr("data");
    let ten = $(tableRow).find(".ten").attr("data");
    let so_san_pham = $(tableRow).find(".so_san_pham").attr("data");
    return {id_loaisp: id_loaisp, ten: ten, so_san_pham: so_san_pham};
};

const refreshDataTableQLLoaiSanPham = () => {
    tableQuanLyLoaiSanPham.clear();

    //Lấy thông tin loại sản phẩm
    let loaisanphams = [];
    let n = Math.floor(Math.random()*10);
    for (let i=0; i<n; i+=1) {
        loaisanphams.push( {id_loaisp: i, ten: "Loại sản phẩm " + i, so_san_pham: Math.floor(Math.random()*100)} );
    }

    //Thêm vào bảng
    for (let loaisanpham of loaisanphams) {
        tableQuanLyLoaiSanPham.row.add(createTableQLLoaiSanPhamArrayDataRow(loaisanpham));
    }
    tableQuanLyLoaiSanPham.draw();
};

const deleteTableQLLoaiSanPhamRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyLoaiSanPham.row(tableRow).remove().draw();
};

const extractModelThemLoaiSanPham = () => {
    return extractFromModelLoaiSanPham($("#modelThemLoaiSanPham"));
};

const extractModelSuaLoaiSanPham = () => {
    return extractFromModelLoaiSanPham($("#modelSuaLoaiSanPham"));
};

const extractFromModelLoaiSanPham = (model) => {
//Lấy thông tin
    let id_loaisp = $(model).find(".id_loaisp").val();
    let ten = $(model).find(".ten").val();
    let so_san_pham = $(model).find(".so_san_pham").val();

    return {id_loaisp: id_loaisp, ten: ten, so_san_pham: so_san_pham};
};

const setModelThemLoaiSanPham = (modifyLoaiSanPham) => {
    setToModelLoaiSanPham($("#modelThemLoaiSanPham"), modifyLoaiSanPham);
};

const setModelSuaLoaiSanPham = (modifyLoaiSanPham) => {
    setToModelLoaiSanPham($("#modelSuaLoaiSanPham"), modifyLoaiSanPham);
};

const setToModelLoaiSanPham = (model, loaisanpham) => {
    $(model).find(".id_loaisp").val(loaisanpham.id_loaisp);
    $(model).find(".ten").val(loaisanpham.ten);
    $(model).find(".so_san_pham").val(loaisanpham.so_san_pham);
};

const validateLoaiSanPhamInformation = (alertContainer, loaisanpham) => {
    //Validate
    let id_loaisp = loaisanpham.id_loaisp;
    let ten = loaisanpham.ten;
    let trang_thai = loaisanpham.trang_thai;

    let numberValidateError = 0;
    if (!ten || ten === "") {
        $(alertContainer).append(createAlerts("danger", "Tên không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};