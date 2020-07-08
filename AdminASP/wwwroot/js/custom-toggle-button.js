$(document).ready(() => {
    resetToggleEvent();
});

let initializeToggle = (button) => {
    if ($(button).hasClass("custom-toggle-button") === false) {
        $(button).attr("class", "custom-toggle-button");
    }

    if ($(button).hasClass("btn") === false) {
        $(button).addClass("btn");
    }

    setToggleStatus(button, "false");
};

let toggleButton = (button) => {
    if (getToggleStatus(button)) {
        setToggleStatus(button, "false");
    } else {
        setToggleStatus(button, "true");
    }
};

let getToggleStatus = (button) => {
    return $(button).attr("button-toggle") === "true";
};

let setToggleStatus = (button, status) => {
    if (status === "true") {
        $(button).removeClass("btn-outline-info").removeClass("opacity-25");
        $(button).addClass("btn-success").addClass("opacity-100");
        $(button).attr("button-toggle", "true");
    } else {
        $(button).removeClass("btn-success").removeClass("opacity-100");
        $(button).addClass("btn-outline-info").addClass("opacity-25");
        $(button).attr("button-toggle", "false");
    }
};

let resetToggleEvent = () => {
    //Unbind click events
    $(".custom-toggle-button").unbind("click");

    //Thêm click event mới
    $(".custom-toggle-button").click(function () {
        toggleButton(this);
    });

    //Khởi tạo nút
    $(".custom-toggle-button").each((index, element) => initializeToggle(element));
};

let resetToggleEventButton = (customToggleButton) => {
    //Unbind click events đi
    $(customToggleButton).unbind("click");

    //Thêm click event mới
    $(customToggleButton).click(function () {
        toggleButton(this);
    });

    //Khởi tạo nút
    initializeToggle(customToggleButton);
};