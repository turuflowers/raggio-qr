jQuery.fn.anchorAnimate = function(settings) {

    settings = jQuery.extend({
        speed : 1000
    }, settings);

    return this.each(function(){
        var caller = this;
        $(caller).click(function (event) {
            event.preventDefault();
            var locationHref = window.location.href;
            var elementClick = $(caller).attr("href");

            var destination = $(elementClick).offset().top;
            $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
                window.location.hash = elementClick
            });

            return false;
        })
    })
}

document.getElementById("menu").addEventListener('click', function(){
    if(document.getElementById("menu").classList.contains('active')){
        document.getElementById("menu").classList.remove('active');
        document.getElementById("topheader").classList.remove('mb-active');
        document.getElementById("topheader").classList.add('mb-inactive');
        document.getElementById("blackout").classList.remove('active');
    }else{
        document.getElementById("menu").classList.add('active');
        document.getElementById("topheader").classList.add('mb-active');
        document.getElementById("topheader").classList.remove('mb-inactive');
        document.getElementById("blackout").classList.add('active');
    }
});

var navoffset = 30;

$(document).ready(function() {
    $('nav button').on('click', function(){
        var subnav = $(this).data('target');
        var li = $(this).parent();

        $('.subnav:not(' + subnav + ')').removeClass('active');
        $('.subnav:not(' + subnav + ')').parent().removeClass('active');

        $(subnav).toggleClass('active');
        $(li).toggleClass('active');
    });

    $('nav a').on('click', function(){
        document.getElementById("menu").classList.remove('active');
        document.getElementById("topheader").classList.remove('mb-active');
        document.getElementById("topheader").classList.add('mb-inactive');
        document.getElementById("blackout").classList.remove('active');
    });


    $('nav a').anchorAnimate();

    checkWindowWith();

    var intervalOffset = setInterval(setOffset, 1000);
});


function checkWindowWith(){
    var w = $(window).width();
    if(w > 992){
        navoffset = 30;

        document.getElementById("menu").classList.remove('active');
        document.getElementById("topheader").classList.remove('mb-active');
        document.getElementById("topheader").classList.remove('mb-inactive');
        document.getElementById("blackout").classList.remove('active');
    }else{
        navoffset = 60;
    }
    console.log(navoffset)
}

var d1 = $('#fecha').offset().top - navoffset;
var d2 = $('#clock').offset().top - navoffset;
var d3 = $('#ceremonia').offset().top - navoffset;
var d4 = $('#asistencia').offset().top - navoffset;
var d5 = $('#regalo').offset().top - navoffset;
var d6 = $('#social').offset().top - navoffset;
var d7 = $('#protocolo').offset().top - navoffset;
var d8 = $('#cierre').offset().top - navoffset;

$(window).resize(function() {
    checkWindowWith();


});

function setOffset(){
    d1 = $('#fecha').offset().top - navoffset;
    d2 = $('#clock').offset().top - navoffset;
    d3 = $('#ceremonia').offset().top - navoffset;
    d4 = $('#asistencia').offset().top - navoffset;
    d5 = $('#regalo').offset().top - navoffset;
    d6 = $('#social').offset().top - navoffset;
    d7 = $('#protocolo').offset().top - navoffset;
    d8 = $('#cierre').offset().top - navoffset;
}

$(window).scroll(function() {
    if ( $(this).scrollTop() <= d1 ) {
        $('.topnav').removeClass('w')
    }
    if ( $(this).scrollTop() >= d1 && $(this).scrollTop() <= d2  ) {
        $('.topnav').addClass('w')
    }
    if ( $(this).scrollTop() >= d2 && $(this).scrollTop() <= d3 ) {
        $('.topnav').removeClass('w')
    }
    if ( $(this).scrollTop() >= d3 && $(this).scrollTop() <= d4 ) {
        $('.topnav').addClass('w')
    }
    if ( $(this).scrollTop() >= d4 && $(this).scrollTop() <= d5 ) {
        $('.topnav').removeClass('w')
    }
    if ( $(this).scrollTop() >= d5 && $(this).scrollTop() <= d6 ) {
        $('.topnav').addClass('w')
    }
    if ( $(this).scrollTop() >= d6 && $(this).scrollTop() <= d7 ) {
        $('.topnav').removeClass('w')
    }
    if ( $(this).scrollTop() >= d7 && $(this).scrollTop() <= d8 ) {
        $('.topnav').addClass('w')
    }
    if ( $(this).scrollTop() >= d8 ) {
        $('.topnav').removeClass('w')
    }
});

