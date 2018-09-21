/*
Template Name: Material Pro Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    $(function () {
        $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });
    // ============================================================== 
    // This is for the toolbar dropdown list
    // ==============================================================  
    jQuery(document).on('click', '#main-wrapper', function (e) {
        if (e.target && e.target.offsetParent && e.target.offsetParent.className !== 'dd-column-selector show' && e.target.dataset.showdrop === undefined) {
            $(".dd-column-selector.show").removeClass("show");
        }
    });
    jQuery(document).on('click', '.modal', function (e) {
        if (e.target && e.target.offsetParent && e.target.offsetParent.className !== 'dd-column-selector show' && e.target.dataset.showdrop === undefined) {
            $(".dd-column-selector.show").removeClass("show");
        }
    });
    jQuery(document).on('click', '.editColumn', function (e) {
        $(".dd-column-selector").addClass("show");
        $(".dd-column-selector").css('left', (e.target.offsetLeft) + 'px');
        e.stopPropagation()
    });

    // ============================================================== 
    // This is for ng-select when text hide crose/clearAll button
    // ==============================================================  

    jQuery(document).on('click', '.ng-dropdown-panel-items', function (e) {
        $('.ng-value').attr('style', 'white-space:normal');
        $('.ng-value-label').attr('style', 'word-break:break-all');
        $('.ng-select-container').attr('style', 'overflow:visible');
    });
    // ============================================================== 
    // This is for the gridview auto scroll to right
    // ==============================================================  
    $('.grid-container').animate({ scrollLeft: 0 }, 0);
    jQuery(document).on('click', '.scrollToRight', function (e) {
        $('.grid-container').animate({ scrollLeft: $('.grid-container').width() }, 0);
    });

    jQuery(document).on('click', '.modifyPanel', function (e) {
        var id = $(this).closest('.grid-item').attr('id');
        var widthDiv = 0; //$(this).closest('.grid-item').width();
        var prevDiv = $(this).closest('.grid-container').find('.grid-item:lt(' + id + ')');
        $(prevDiv).each(function (index, ele) {
            widthDiv += $(ele).width();
        });
        $('.grid-container').animate({ scrollLeft: widthDiv }, 0);
    });
    // ============================================================== 
    // This is for ng-select when text hide crose/clearAll button
    // ==============================================================  
    jQuery(document).on('click', '.ng-dropdown-panel-items', function (e) {
        $('.ng-value').attr('style', 'white-space:normal');
        $('.ng-select-container').attr('style', 'overflow:visible');
    });

    // ============================================================== 
    // This is for the top header part and sidebar part
    // ==============================================================  
    var set = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        var topOffset = 59;
        if (width < 1170) {
            $("body").addClass("mini-sidebar");
            $('.navbar-brand span').hide();
            $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
            $(".sidebartoggler i").addClass("ti-menu");
        }
        else {
            $("body").removeClass("mini-sidebar");
            $('.navbar-brand span').show();
            //$(".sidebartoggler i").removeClass("ti-menu");
        }

        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $(".page-wrapper").css("min-height", (height) + "px");
        }
    };
    $(window).ready(set);
    $(window).on("resize", set);
    // ============================================================== 
    // Theme options
    // ==============================================================     
    $(".sidebartoggler").on('click', function () {
        if ($("body").hasClass("mini-sidebar")) {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
            $("body").removeClass("mini-sidebar");
            $('.navbar-brand span').show();
            //$(".sidebartoggler i").addClass("ti-menu");
        }
        else {
            $("body").trigger("resize");
            $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
            $("body").addClass("mini-sidebar");
            $('.navbar-brand span').hide();
            //$(".sidebartoggler i").removeClass("ti-menu");
        }
    });
    // topbar stickey on scroll


    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").click(function () {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
    });
    // $(".sidebartoggler").on('click', function () {
    //     $(".sidebartoggler i").toggleClass("ti-menu");
    // });
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
        $(".app-search").toggle(200);
    });
    // ============================================================== 
    // Right sidebar options
    // ============================================================== 
    $(".right-side-toggle").click(function () {
        $(".right-sidebar").slideDown(50);
        $(".right-sidebar").toggleClass("shw-rside");
    });
    // ============================================================== 
    // Sidebarmenu
    // ============================================================== 
    $(function () {
        $('#sidebarnav').metisMenu({});
        $('#sidenav-vendor').metisMenu({});
    });
    // ==============================================================
    // Auto select left navbar
    // ============================================================== 
    $(function () {
        var url = window.location;
        var element = $('ul#sidebarnav li').filter(function () {
            return this.href == url;
        }).addClass('active').parent().addClass('active')
        var activeId = $('ul#sidebarnav li');
        activeId.each(function () {
            if ($(this).children().contents().find("a").hasClass("active")) {
                element = $(this).addClass('active').find('ul.collapse').addClass('in');
            }
        });
    });
    // ============================================================== 
    //tooltip
    // ============================================================== 
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // ============================================================== 
    //Popover
    // ============================================================== 
    $(function () {
        $('[data-toggle="popover"]').popover()
    })

    // ============================================================== 
    // Slimscrollbars
    // ============================================================== 
    $('.scroll-sidebar').slimScroll({
        position: 'left'
        , size: "5px"
        , height: '100%'
        , color: '#dcdcdc'
    });
    $('.message-center').slimScroll({
        position: 'right'
        , size: "5px"

        , color: '#dcdcdc'
    });


    $('.aboutscroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '80'
        , color: '#dcdcdc'
    });
    $('.message-scroll').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '570'
        , color: '#dcdcdc'
    });
    $('.chat-box').slimScroll({
        position: 'right'
        , size: "5px"
        , height: '470'
        , color: '#dcdcdc'
    });

    $('.slimscrollright').slimScroll({
        height: '100%'
        , position: 'right'
        , size: "5px"
        , color: '#dcdcdc'
    });

    // ============================================================== 
    // Resize all elements
    // ============================================================== 
    $("body").trigger("resize");
    // ============================================================== 
    // To do list
    // ============================================================== 
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });

    // ============================================================== 
    // Login and Recover Password 
    // ============================================================== 
    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });

    // ============================================================== 
    // Collapsable cards
    // ==============================================================
    $('a[data-action="collapse"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
        $(this).closest('.card').children('.card-block').collapse('toggle');

    });
    // Toggle fullscreen
    $('a[data-action="expand"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
        $(this).closest('.card').toggleClass('card-fullscreen');
    });

    // Close Card
    $('a[data-action="close"]').on('click', function () {
        $(this).closest('.card').removeClass().slideUp('fast');
    });
    // ============================================================== 
    // This is for the sparkline charts which is coming in the bradcrumb section
    // ==============================================================
    $('#monthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
        type: 'bar',
        height: '35',
        barWidth: '4',
        resize: true,
        barSpacing: '4',
        barColor: '#1e88e5'
    });
    $('#lastmonthchart').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
        type: 'bar',
        height: '35',
        barWidth: '4',
        resize: true,
        barSpacing: '4',
        barColor: '#7460ee'
    });
    var sparkResize;


});