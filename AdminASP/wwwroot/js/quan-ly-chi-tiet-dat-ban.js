let tableQuanLyDatBan;
let usernames = [];

$(document).ready(function () {
//Active dataTable
    tableQuanLyDatBan = $("#tableQuanLyDatBan").DataTable({
        "columnDefs": [
            {
                "targets": 0,
                "render": function (data, type, row, meta) {
                    let renderData = data;
                    return `<span class="id_ban" data="${data}">${renderData}</span>`;
                }
            },            {
                "targets": 1,
                "render": function (data, type, row, meta) {
                    let renderData = `${data}`;
                    return `<span class="username" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 2,
                "render": function (data, type, row, meta) {
                    let renderData = convertDateTimeToString(data);
                    return `<span class="thoi_gian_lap" data="${data}">${renderData}</span>`;
                }
            },
            {
                "targets": 3,
                "render": function (data, type, row, meta) {
                    let renderData = convertDateTimeToString(data);
                    return `<span class="thoi_gian_nhan" data="${data}">${renderData}</span>`;
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
                    let chitietdatban = data;
                    let renderData = `
<button type="button" class="custom-toggle-button btn btn-outline-info opacity-25 m-1" checked="false" onclick="toggleButton(this)" onmouseenter="toggleButton(this)" onmouseleave="toggleButton(this)"><i class="fa fa-check-circle"></i></button>
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaDatBan" modify="${chitietdatban.id_ban}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLDBRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    $("#danhDauTatCaDatBan").click(function () {
        $("#modelDatBan").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaDatBan").click(function () {
        $("#modelDatBan").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauDatBan").click(function () {
        $(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton)).each((index, element) => deleteTableQLDBRow($(element)));


    });
    $("#xoaTatCaDatBan").click(function () {
        $.post("/DatBan/DeleteAll", function (data) {
            //Lấy thông tin 
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            let outputs = JSON.parse(inputJson);

            //Xóa khỏi bảng
            if (outputs.output >= 0) {
                tableQuanLyDatBan.clear().draw();
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
    $("#lamMoiDatBan").click(function () {
        refreshDataTableQLDB();
    });
    $("#modelThemDatBan").find("#themDatBanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemDatBan").find("#themDatBanAlerts").html("");
        
        //Validate
        let modifyDatBan = extractModelThemDatBan();
        let numberValidateError = validateDatBanInformation($("#modelThemDatBan").find("#themDatBanAlerts"), modifyDatBan);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo chi tiết đặt bàn mới 
        let newDatBan = modifyDatBan;
        newDatBan.id_ban = -1;
        //Thêm xuống CSDL
        $.post("/DatBan/Add", { Username: newDatBan.username, IdBan: newDatBan.id_ban, ThoiGIanLap: newDatBan.thoi_gian_lap, ThoiGIanNhan: newDatBan.thoi_gian_nhan, GhiChu: newDatBan.ghi_chu }, function (data) {
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
                $("#modelThemDatBan").find("#themDatBanAlerts").append(createAlerts("success", "Thêm thành công"));
                //Thêm mới vào bảng
                $("#modelThemDatBan").find(".close").trigger("click");
                tableQuanLyDatBan.row.add(createTableQLDBArrayDataRow(newDatBan)).draw();
            }
            //Thêm thất bại
            else {
                $("#modelThemDatBan").find("#themDatBanAlerts").append(createAlerts("danger", "Thêm thất bại"));

                for (let error of outputs.errors) {
                    $("#modelThemDatBan").find("#themDatBanAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để thêm dữ liệu vào CSDL");
                $("#modelThemDatBan").find("#themDatBanAlerts").append(createAlerts("danger", "Thêm thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelThemDatBan").find("#themDatBanReset").click(function() {
        setModelThemDatBan({});
    });

    $("#modelSuaDatBan").find("#suaDatBanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaDatBan").find("#suaDatBanAlerts").html("");        

        let modifyDatBan = extractModelSuaDatBan();

        //Validate
        let numberValidateError = validateDatBanInformation($("#modelSuaDatBan").find("#suaDatBanAlerts"), modifyDatBan);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo chi tiết đặt bàn mới 
        let newDatBan = modifyDatBan;
        let id_ban = $(this).parents("#modelSuaDatBan").attr("id_ban");
        let oldDatBanRow = $("#tableQuanLyDatBan").find(`button[modify='${id_ban}']`).parents("tr");

        //Sửa xuống CSDL
        $.post("/DatBan/Edit", { Username: newDatBan.username, IdBan: newDatBan.id_ban, ThoiGIanLap: newDatBan.thoi_gian_lap, ThoiGIanNhan: newDatBan.thoi_gian_nhan, GhiChu: newDatBan.ghi_chu }, function (data) {
            //Lấy thông tin tài khoản
            let inputJson = data;
            inputJson = inputJson.replace(/"/g, `"`);
            inputJson = inputJson.replace(/Username/g, `username`);;
            inputJson = inputJson.replace(/IdBan/g, `idban`);;
            inputJson = inputJson.replace(/ThoiGIanLap/g, `thoigianlap`);;
            inputJson = inputJson.replace(/ThoiGIanNhan/g, `thoigiannhan`);;
            inputJson = inputJson.replace(/GhiChu/g, `ghichu`);
            let outputs = JSON.parse(inputJson);

            let suaModelResult = true;
            if (outputs.errors.length > 0 || outputs.output < 0) {
                suaModelResult = false;
            }

            //Sửa thành công
            if (suaModelResult) {
                $("#modelSuaDatBan").find("#suaDatBanAlerts").append(createAlerts("success", "Sửa thành công"));

                //Sửa tài khoản mới vào bảng
                $("#modelSuaDatBan").find(".close").trigger("click");
                tableQuanLyDatBan.row(oldDatBanRow).data(createTableQLDBArrayDataRow(outputs.newDatBan)).draw();
            }
            //Sửa thất bại
            else {
                $("#modelSuaDatBan").find("#suaDatBanAlerts").append(createAlerts("danger", "Sửa thất bại"));

                for (let error of outputs.errors) {
                    $("#modelSuaDatBan").find("#suaDatBanAlerts").append(createAlerts("danger", error));
                }
            }
        })
            .done(function () {
            })
            .fail(function () {
                alert("Không thể gửi dữ liệu đến server để sửa dữ liệu vào CSDL");
                $("#modelSuaDatBan").find("#suaDatBanAlerts").append(createAlerts("danger", "Sửa thất bại"));
            })
            .always(function () {
            });


    });

    $("#modelSuaDatBan").find("#suaDatBanReset").click(function() {
        setModelSuaDatBan({});
    });

    $('#modelSuaDatBan').on('show.bs.modal', function (event) {
        let suaDatBanTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyDatBan = extractDataFromTableQLDBRow(suaDatBanTriggered.parents("tr"));

        $(this).attr("id_ban", modifyDatBan.id_ban);
        $(this).attr("username", modifyDatBan.username);
        setModelSuaDatBan(modifyDatBan);
    });

    $("#modelThemDatBan").find(".close").click(() => $("#modelThemDatBan").trigger("click"));
    $("#modelSuaDatBan").find(".close").click(() => $("#modelSuaDatBan").trigger("click"));

    $("#themDatBan").click(function () {
        let id_ban = $(this).parents("#modelDatBan").attr("id_ban");
        $("#modelThemDatBan").find(".id_ban").val(id_ban);
        $("#modelThemDatBan").find(".username").val(usernames[0].username);
    });

    $("#modelThemDatBan").find("#themDatBanCurrentTimeLap").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemDatBan").find(".thoi_gian_lap[type='date']").val(currentTimeParts[0]);
        $("#modelThemDatBan").find(".thoi_gian_lap[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaDatBan").find("#suaDatBanCurrentTimeLap").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaDatBan").find(".thoi_gian_lap[type='date']").val(currentTimeParts[0]);
        $("#modelSuaDatBan").find(".thoi_gian_lap[type='time']").val(currentTimeParts[1]);
    });

    $("#modelThemDatBan").find("#themDatBanCurrentTimeNhan").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemDatBan").find(".thoi_gian_nhan[type='date']").val(currentTimeParts[0]);
        $("#modelThemDatBan").find(".thoi_gian_nhan[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaDatBan").find("#suaDatBanCurrentTimeNhan").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaDatBan").find(".thoi_gian_nhan[type='date']").val(currentTimeParts[0]);
        $("#modelSuaDatBan").find(".thoi_gian_nhan[type='time']").val(currentTimeParts[1]);
    });
});

const createTableQLDBArrayDataRow = (chitietdatban) => {
    return [chitietdatban.id_ban, chitietdatban.username, chitietdatban.thoi_gian_lap, chitietdatban.thoi_gian_nhan, chitietdatban.ghi_chu, chitietdatban];
};

const extractDataFromTableQLDBRow = (tableRow) => {
    let id_ban = $(tableRow).find(".id_ban").attr("data");
    let username = $(tableRow).find(".username").attr("data");
    let thoi_gian_lap = $(tableRow).find(".thoi_gian_lap").attr("data");
    let thoi_gian_nhan = $(tableRow).find(".thoi_gian_nhan").attr("data");
    let ghi_chu = $(tableRow).find(".ghi_chu").attr("data");
    return  {id_ban:id_ban, username:username, thoi_gian_lap:thoi_gian_lap, thoi_gian_nhan:thoi_gian_nhan, ghi_chu:ghi_chu};
};

const refreshDataTableQLDB = () => {    
    //Lấy thông tin usernames
    usernames = [];
    $.post("/TaiKhoan/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/Username/g, `username`);;
        inputJson = inputJson.replace(/Password/g, `password`);;
        inputJson = inputJson.replace(/Type/g, `type`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào usernames
        for (let output of outputs) {
            usernames.push(output.username);
        }

        //Thêm option username
        $("#modelThemDatBan").find("#themDatBanUsername").html("");
        $("#modelSuaDatBan").find("#suaDatBanUsername").html("");
        for (let username of usernames) {
            let newUsernameOption = `<option value="${username}">${username}</option>`;
            $("#modelThemDatBan").find("#themDatBanUsername").append(newUsernameOption);
            $("#modelSuaDatBan").find("#suaDatBanUsername").append(newUsernameOption);
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });

    tableQuanLyDatBan.clear();
    //Lấy thông tin chi tiết đặt bàn
    $.post("/DatBan/GetAll", function (data) {
        //Lấy thông tin tài khoản
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        inputJson = inputJson.replace(/Username/g, `username`);;
        inputJson = inputJson.replace(/IdBan/g, `idban`);;
        inputJson = inputJson.replace(/ThoiGIanLap/g, `thoigianlap`);;
        inputJson = inputJson.replace(/ThoiGIanNhan/g, `thoigiannhan`);;
        inputJson = inputJson.replace(/GhiChu/g, `ghichu`);
        let outputs = JSON.parse(inputJson);

        //Thêm vào bảng
        for (let output of outputs) {
            tableQuanLyDatBan.row.add(createTableQLDBArrayDataRow(output));
        }
        tableQuanLyDatBan.draw();
    })
        .done(function () {
        })
        .fail(function () {
            alert("Không thể gửi dữ liệu đến server để lấy dữ liệu từ CSDL");
        })
        .always(function () {
        });


};

const deleteTableQLDBRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    let datBan = extractDataFromTableQLDBRow(tableRow);
    $.post("/DatBan/Delete", { Username: datBan.username, IdBan: datBan.id_ban, ThoiGIanLap: datBan.thoi_gian_lap }, function (data) {
        //Lấy thông tin 
        let inputJson = data;
        inputJson = inputJson.replace(/"/g, `"`);
        let outputs = JSON.parse(inputJson);

        //Xóa khỏi bảng
        if (outputs.output >= 0) {
            tableQuanLyDatBan.row(tableRow).remove().draw();
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

const extractModelThemDatBan = () => {
    return extractFromModelDatBan($("#modelThemDatBan"));
};

const extractModelSuaDatBan = () => {
    return extractFromModelDatBan($("#modelSuaDatBan"));
};

const extractFromModelDatBan = (model) => {
    //Lấy thông tin
    let id_ban = $(model).find(".id_ban").val();
    let username = $(model).find(".username").val();

    let thoi_gian_lap_date = $(model).find(".thoi_gian_lap[type='date']").val();
    let thoi_gian_lap_time = $(model).find(".thoi_gian_lap[type='time']").val();
    let thoi_gian_lap = undefined;
    if (thoi_gian_lap_date !== "" && thoi_gian_lap_time !== "") {
        thoi_gian_lap = new Date(`${thoi_gian_lap_date} ${thoi_gian_lap_time}`);
    }

    let thoi_gian_nhan_date = $(model).find(".thoi_gian_nhan[type='date']").val();
    let thoi_gian_nhan_time = $(model).find(".thoi_gian_nhan[type='time']").val();
    let thoi_gian_nhan = undefined;
    if (thoi_gian_nhan_date !== "" && thoi_gian_nhan_time !== "") {
        thoi_gian_nhan = new Date(`${thoi_gian_nhan_date} ${thoi_gian_nhan_time}`);
    }

    let ghi_chu = $(model).find(".ghi_chu").val();
    return  {id_ban:id_ban, username:username, thoi_gian_lap:thoi_gian_lap, thoi_gian_nhan:thoi_gian_nhan, ghi_chu:ghi_chu};
};

const setModelThemDatBan = (modifyDatBan) => {
    setToModelDatBan($("#modelThemDatBan"), modifyDatBan);
};

const setModelSuaDatBan = (modifyDatBan) => {
    setToModelDatBan($("#modelSuaDatBan"), modifyDatBan);
};

const setToModelDatBan = (model, chitietdatban) => {
    $(model).find(".id_ban").val(chitietdatban.id_ban);
    $(model).find(".username").val(chitietdatban.username);

    let datetimeLapStrings = convertDateTimeToString(chitietdatban.thoi_gian_lap).split(" ");
    $(model).find(".thoi_gian_lap[type='date']").val(datetimeLapStrings[0]);
    $(model).find(".thoi_gian_lap[type='time']").val(datetimeLapStrings[1]);

    let datetimeNhanStrings = convertDateTimeToString(chitietdatban.thoi_gian_nhan).split(" ");
    $(model).find(".thoi_gian_nhan[type='date']").val(datetimeNhanStrings[0]);
    $(model).find(".thoi_gian_nhan[type='time']").val(datetimeNhanStrings[1]);

    $(model).find(".ghi_chu").val(chitietdatban.ghi_chu);
};

const validateDatBanInformation = (alertContainer, chitietdatban) => {
    //Validate
    let id_ban = chitietdatban.id_ban;
    let username = chitietdatban.username;
    let thoi_gian_lap = chitietdatban.thoi_gian_lap;
    let thoi_gian_nhan = chitietdatban.thoi_gian_nhan;
    let ghi_chu = `${chitietdatban.ghi_chu}`;

    let numberValidateError = 0;
    if (!username || username === "") {
        $(alertContainer).append(createAlerts("danger", "Username không được để trống"));
        numberValidateError += 1;
    }
    if (!thoi_gian_lap || thoi_gian_lap === "") {
        $(alertContainer).append(createAlerts("danger", "Thời gian lập không được để trống"));
        numberValidateError += 1;
    }
    if (!thoi_gian_nhan || thoi_gian_nhan === "") {
        $(alertContainer).append(createAlerts("danger", "Thời gian nhận không được để trống"));
        numberValidateError += 1;
    }
    if (thoi_gian_lap.getTime() > thoi_gian_nhan.getTime() )  {
        $(alertContainer).append(createAlerts("danger", "Thời gian lập không được lớn hơn Thời gian nhận"));
        numberValidateError += 1;
    }
    if (!ghi_chu || ghi_chu === "") {
        $(alertContainer).append(createAlerts("danger", "Ghi chú không được để trống"));
        numberValidateError += 1;
    }
    return numberValidateError;
};