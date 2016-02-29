(function($) {
    "use strict";
    //Fixed breadcrumbs issue in IE8.
    $(document).ready(function() {
        $('.breadcrumbs ul li:not(:has(span)):not(:last)').append($('<span>&gt;</span>'));

        var width=[41, 74, 230, 76, 296, 110, 145, 100];
        $('.details tr').each(function(index, value) {
            if(index === 0) {
                $(this).css({filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#FEFEFE', endColorstr='#F2F2F2',GradientType=0 )"});
            }
            $(this).children().each(function(index, value) {
                $(this).width(width[index]);
            });
        });
    });
})(jQuery);
