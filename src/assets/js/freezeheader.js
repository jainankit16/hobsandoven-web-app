/* ------------------------------------------------------------------------
DataTable: freezeHeader
-------------------------------------------------------------------------*/

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var window_bottom = $(document).height() - $(window).height() - $(window).scrollTop();
    var div_top = ($('#sticky-anchor').length) ? $('#sticky-anchor').offset().top : '';
    if (div_top) {
        //freeze Header
        if (window_top > div_top) {
            $('#sticky-anchor').height($('.datatable-header').outerHeight());
            $('.ngx-datatable').css('display', 'inline');
            $('.visible').css('border', '1px solid rgba(0,0,0,.125)');
            // $('.datatable-header-cell-template-wrap').addClass('text-white');
            $('.datatable-header').addClass('freezeHeader');

        } else {
            $('#sticky-anchor').height(0);
            $('.ngx-datatable').css('display', 'block');
            // $('.datatable-header-cell-template-wrap').removeClass('text-white');
            $('.datatable-header').removeClass('freezeHeader');
        }


        //$('.datatable-footer').addClass('freezeFooter');
        //$('.datatable-footer-inner').addClass('text-white');
        ///reset-Footer
        // if (window_bottom < 50) {
        //     $('.datatable-footer').removeClass('freezeFooter');
        //     $('.datatable-footer-inner').removeClass('text-white');
        // }
    }

}

$(function () {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});