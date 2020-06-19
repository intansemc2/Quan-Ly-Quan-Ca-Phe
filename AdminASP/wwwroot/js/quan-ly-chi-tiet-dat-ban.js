let tableQuanLyChiTietDatBan;
let usernames = [];

$(document).ready(function () {
//Active dataTable
    tableQuanLyChiTietDatBan = $("#tableQuanLyChiTietDatBan").DataTable({
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
<button type="button" class="btn btn-outline-warning m-1" data-toggle="modal" data-target="#modelSuaChiTietDatBan" modify="${chitietdatban.id_ban}"><i class="fas fa-edit"></i></button>
<button type="button" class="btn btn-outline-danger m-1" onclick="deleteTableQLCTBanRow(this)"><i class="fas fa-trash"></i></button>`;
                    return `${renderData}`;
                }
            }]
    });

    $("#danhDauTatCaChiTietDatBan").click(function () {
        $("#modelChiTietDatBan").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "true"));
    });
    $("#boDanhDauTatCaChiTietDatBan").click(function () {
        $("#modelChiTietDatBan").find(".custom-toggle-button").each((index, element) => setToggleStatus(element, "false"));
    });
    $("#xoaDanhDauChiTietDatBan").click(function () {
        let markedRows = $("#modelChiTietDatBan").find(".custom-toggle-button").filter((index, toggleButton) => getToggleStatus(toggleButton))
                .map((index, toggleButton) => $(toggleButton).parents("tr"));
        tableQuanLyChiTietDatBan.rows(markedRows).remove().draw();
    });
    $("#xoaTatCaChiTietDatBan").click(function () {
        tableQuanLyChiTietDatBan.clear().draw();
    });
    $("#lamMoiChiTietDatBan").click(function () {
        refreshDataTableQLCTBan();
    });
    $("#modelThemChiTietDatBan").find("#themChiTietDatBanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelThemChiTietDatBan").find("#themChiTietDatBanAlerts").html("");
        
        //Validate
        let modifyChiTietDatBan = extractModelThemChiTietDatBan();
        let numberValidateError = validateChiTietDatBanInformation($("#modelThemChiTietDatBan").find("#themChiTietDatBanAlerts"), modifyChiTietDatBan);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newChiTietDatBan = modifyChiTietDatBan;
        newChiTietDatBan.id_ban = -1;
        //Thêm xuống CSDL
        let themNVResult = true;
        //Thêm thành công
        if (themNVResult) {
            $("#modelThemChiTietDatBan").find("#themChiTietDatBanAlerts").append(createAlerts("success", "Thêm thành công"));
            //Thêm hoá đơn mới vào bảng
            $("#modelThemChiTietDatBan").find(".close").trigger("click");
            tableQuanLyChiTietDatBan.row.add(createTableQLCTBanArrayDataRow(newChiTietDatBan)).draw();
        }
        //Thêm thất bại
        else {
            $("#modelThemChiTietDatBan").find("#themChiTietDatBanAlerts").append(createAlerts("danger", "Thêm thất bại"));
        }
    });

    $("#modelThemChiTietDatBan").find("#themChiTietDatBanReset").click(function() {
        setModelThemChiTietDatBan({});
    });

    $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanConfirm").click(function () {
        //Xóa hết alert cũ
        $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanAlerts").html("");        

        let modifyChiTietDatBan = extractModelSuaChiTietDatBan();

        //Validate
        let numberValidateError = validateChiTietDatBanInformation($("#modelSuaChiTietDatBan").find("#suaChiTietDatBanAlerts"), modifyChiTietDatBan);
        if (numberValidateError > 0) {
            return;
        }

        //Tạo hoá đơn mới 
        let newChiTietDatBan = modifyChiTietDatBan;
        let id_ban = $(this).parents("#modelSuaChiTietDatBan").attr("id_ban");
        let oldChiTietDatBanRow = $("#tableQuanLyChiTietDatBan").find(`button[modify='${id_ban}']`).parents("tr");

        //Sửa xuống CSDL
        let suaNVResult = true;

        //Sửa thành công
        if (suaNVResult) {
            $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanAlerts").append(createAlerts("success", "Sửa thành công"));

            //Sửa hoá đơn mới vào bảng
            $("#modelSuaChiTietDatBan").find(".close").trigger("click");
            tableQuanLyChiTietDatBan.row(oldChiTietDatBanRow).data(createTableQLCTBanArrayDataRow(newChiTietDatBan)).draw();            
        }
        //Sửa thất bại
        else {
            $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanAlerts").append(createAlerts("danger", "Sửa thất bại"));
        }
    });

    $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanReset").click(function() {
        setModelSuaChiTietDatBan({});
    });

    $('#modelSuaChiTietDatBan').on('show.bs.modal', function (event) {
        let suaChiTietDatBanTriggered = $(event.relatedTarget); // Button that triggered the modal

        let modifyChiTietDatBan = extractDataFromTableQLCTBanRow(suaChiTietDatBanTriggered.parents("tr"));

        $(this).attr("id_ban", modifyChiTietDatBan.id_ban);
        $(this).attr("username", modifyChiTietDatBan.username);
        setModelSuaChiTietDatBan(modifyChiTietDatBan);
    });

    $("#modelThemChiTietDatBan").find(".close").click(() => $("#modelThemChiTietDatBan").trigger("click"));
    $("#modelSuaChiTietDatBan").find(".close").click(() => $("#modelSuaChiTietDatBan").trigger("click"));

    $("#themChiTietDatBan").click(function () {
        let id_ban = $(this).parents("#modelChiTietDatBan").attr("id_ban");
        $("#modelThemChiTietDatBan").find(".id_ban").val(id_ban);
        $("#modelThemChiTietDatBan").find(".username").val(usernames[0].username);
    });

    $("#modelThemChiTietDatBan").find("#themChiTietDatBanCurrentTimeLap").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemChiTietDatBan").find(".thoi_gian_lap[type='date']").val(currentTimeParts[0]);
        $("#modelThemChiTietDatBan").find(".thoi_gian_lap[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanCurrentTimeLap").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaChiTietDatBan").find(".thoi_gian_lap[type='date']").val(currentTimeParts[0]);
        $("#modelSuaChiTietDatBan").find(".thoi_gian_lap[type='time']").val(currentTimeParts[1]);
    });

    $("#modelThemChiTietDatBan").find("#themChiTietDatBanCurrentTimeNhan").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelThemChiTietDatBan").find(".thoi_gian_nhan[type='date']").val(currentTimeParts[0]);
        $("#modelThemChiTietDatBan").find(".thoi_gian_nhan[type='time']").val(currentTimeParts[1]);
    });

    $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanCurrentTimeNhan").click(function () {
        let currentTimeParts = convertDateTimeToString(new Date()).split(" ");
        $("#modelSuaChiTietDatBan").find(".thoi_gian_nhan[type='date']").val(currentTimeParts[0]);
        $("#modelSuaChiTietDatBan").find(".thoi_gian_nhan[type='time']").val(currentTimeParts[1]);
    });
});

const createTableQLCTBanArrayDataRow = (chitietdatban) => {
    return [chitietdatban.id_ban, chitietdatban.username, chitietdatban.thoi_gian_lap, chitietdatban.thoi_gian_nhan, chitietdatban.ghi_chu, chitietdatban];
};

const extractDataFromTableQLCTBanRow = (tableRow) => {
    let id_ban = $(tableRow).find(".id_ban").attr("data");
    let username = $(tableRow).find(".username").attr("data");
    let thoi_gian_lap = $(tableRow).find(".thoi_gian_lap").attr("data");
    let thoi_gian_nhan = $(tableRow).find(".thoi_gian_nhan").attr("data");
    let ghi_chu = $(tableRow).find(".ghi_chu").attr("data");
    return  {id_ban:id_ban, username:username, thoi_gian_lap:thoi_gian_lap, thoi_gian_nhan:thoi_gian_nhan, ghi_chu:ghi_chu};
};

const refreshDataTableQLCTBan = () => {    
    //Lấy thông tin usernames
    usernames = [];
    for (let i = 0; i < 10; i += 1) { usernames.push(`Username ${i}`); }

    //Thêm option username
    $("#modelThemChiTietDatBan").find("#themChiTietDatBanUsername").html("");
    $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanUsername").html("");
    for (let username of usernames) {
        let newUsernameOption = `<option value="${username}">${username}</option>`;
        $("#modelThemChiTietDatBan").find("#themChiTietDatBanUsername").append(newUsernameOption);
        $("#modelSuaChiTietDatBan").find("#suaChiTietDatBanUsername").append(newUsernameOption);
    }

    tableQuanLyChiTietDatBan.clear();
    //Lấy thông tin hoá đơn
    let n = Math.floor(Math.random() * 10);
    let chitietdatbans =[];
    for (let i = 0; i < n; i += 1) {
        let id_ban = i;
        let username = usernames[Math.floor(Math.random()*usernames.length)];
        let thoi_gian_lap = new Date();
        let thoi_gian_nhan = new Date();
        let ghi_chu = "Ghi chú " + i;
        chitietdatbans.push({id_ban:id_ban, username:username, thoi_gian_lap:thoi_gian_lap, thoi_gian_nhan:thoi_gian_nhan, ghi_chu:ghi_chu});
    }

    //Thêm vào bảng
    for (let chitietdatban of chitietdatbans) {
        tableQuanLyChiTietDatBan.row.add(createTableQLCTBanArrayDataRow(chitietdatban));
    }
    tableQuanLyChiTietDatBan.draw();
};

const deleteTableQLCTBanRow = (buttonInside) => {
    let tableRow = $(buttonInside).parents("tr");
    tableQuanLyChiTietDatBan.row(tableRow).remove().draw();
};

const extractModelThemChiTietDatBan = () => {
    return extractFromModelChiTietDatBan($("#modelThemChiTietDatBan"));
};

const extractModelSuaChiTietDatBan = () => {
    return extractFromModelChiTietDatBan($("#modelSuaChiTietDatBan"));
};

const extractFromModelChiTietDatBan = (model) => {
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

const setModelThemChiTietDatBan = (modifyChiTietDatBan) => {
    setToModelChiTietDatBan($("#modelThemChiTietDatBan"), modifyChiTietDatBan);
};

const setModelSuaChiTietDatBan = (modifyChiTietDatBan) => {
    setToModelChiTietDatBan($("#modelSuaChiTietDatBan"), modifyChiTietDatBan);
};

const setToModelChiTietDatBan = (model, chitietdatban) => {
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

const validateChiTietDatBanInformation = (alertContainer, chitietdatban) => {
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