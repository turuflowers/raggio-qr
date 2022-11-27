wow = new WOW(
    {
        offset:       100,          // default
    }
);

wow.init();

$(document).ready(function() {
    var $container = $('.especialidades'); //The ID for the list with all the blog posts
    $container.isotope({
        // options...
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: 0,
            horizontalOrder: true
        }
    });

    $container.isotope( 'layout' );
    setTimeout( fixbug, 1000 );
    setTimeout( fixbug, 5000 );

    $(".grid-item button").on('click', function () {
        $(this).parent().parent().parent().toggleClass('active');
        $('.especialidades').isotope( 'layout' );
    });
});

function fixbug() {
    $('.especialidades').isotope( 'layout' );
}