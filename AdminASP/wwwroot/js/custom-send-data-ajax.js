//Gửi data đến link có sẵn bằng phương thức post, thêm thông báo trạng thái vào container định sẵn
let sendDataPost = (url, data, handle, handleFail) => {
    $.post(url, data, function () {
        handle();
    })
        .fail(function () {
            handleFail();
        })
};