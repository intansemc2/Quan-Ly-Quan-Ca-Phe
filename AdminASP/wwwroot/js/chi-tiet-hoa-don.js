let IdHoaDon = $("#IdHoaDon").attr("IdHoaDon");

$(document).ready(function () {

    //Active dataTable
    tableCTHD = $("#tableCTHD").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_hoa_don" data="${data}">${renderData}</span>`;
                }
            },
            {
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
                    return `<span class="so_luong" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="tong_tien" data="${data}">${renderData}</span>`;
                }
            },
        ]//end columdef
    });

    //HIỂN THỊ BẢNG DỮ LIỆU
    refreshDataTableCTHD();

})//end jquery




//RELOAD DỮ LIỆU
const refreshDataTableCTHD = () => {
    tableCTHD.clear();
    $("#tableQuanLySanPhamAlert").empty();

    $.post("/Cthd/GetAll/" + IdHoaDon, function (data) {
        //Lấy thông tin sản phẩm
        let inputJson = data;

        inputJson = inputJson.replace(/IdHoaDon/g, `id_hoa_don`);
        inputJson = inputJson.replace(/IdSanPham/g, `id_san_pham`);
        inputJson = inputJson.replace(/SoLuong/g, `so_luong`);
        inputJson = inputJson.replace(/TongTien/g, `tong_tien`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {

            tableCTHD.row.add(createTableCTHDArrayDataRow(output));
        }
        tableCTHD.draw();

    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });
};

//CREATE TABLE DATA ROW
const createTableCTHDArrayDataRow = (cthd) => {
    return [cthd.id_hoa_don, cthd.id_san_pham, cthd.so_luong, cthd.tong_tien];
}