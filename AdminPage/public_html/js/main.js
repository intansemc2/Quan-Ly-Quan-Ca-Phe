/*!
 * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
 */
// (function($) {
// "use strict";
$(document).ready(function () {

//    // Add active state to sidbar nav links
//    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
//    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {
//        if (this.href === path) {
//            $(this).addClass("active");
//        }
//    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });

    // toggle-checked-button
    $(".toggle-checked-button").hover(function () {
        if ($(this).hasClass("btn-outline-info")) {
            $(this).removeClass("btn-outline-info");
            $(this).addClass("btn-outline-success");
        } else {
            $(this).removeClass("btn-outline-success");
            $(this).addClass("btn-outline-info");
        }
    });
});
// })(jQuery);