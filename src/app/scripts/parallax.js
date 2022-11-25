$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var imgPos1 = scrollTop / 6 + 'px';
    var imgPos2 = scrollTop / 12 + 'px';
    var imgPos2b = scrollTop / 36 + 'px';
    var imgPos3 = scrollTop / 8 + 'px';

    $('#intro .logo').css('transform', 'translateY(' + imgPos2b + ')');
    $('#intro .hexagonos_inferiores').css('transform', 'translateY(' + imgPos1 + ')');
    $('#intro .hexagonosiz').css('transform', 'translateY(' + imgPos2b + ')');
    $('#intro .hojasizq').css('transform', 'translateY(' + imgPos1 + ')');
    $('#intro .manchitasizq01').css('transform', 'translateY(-' + imgPos2 + ')');
    $('#intro .manchitasizq02').css('transform', 'translateY(' + imgPos3 + ')');
    $('#intro .manchitas_inferiores').css('transform', 'translateY(' + imgPos1 + ')');
    $('#intro .hojas_inferiores').css('transform', 'translateY(' + imgPos2 + ')');

    var scrollClock = $('#clock').scrollTop();
    var imgPos4 = scrollTop / 24 + 'px';

    $('#clock .hexagonos_inferiores').css('transform', 'translateX(-46%) translateY(-' + imgPos4 + ')');

    var scrollCeremonia = $('#ceremonia').scrollTop();
    var imgPos5 = scrollTop / 36 + 'px';
    var imgPos6 = scrollTop / 6 + 'px';

    $('#ceremonia .hojasderecha').css('transform', 'translateY(-' + imgPos5 + ')');
    $('#ceremonia .lineasderecha').css('transform', 'translateY(' + imgPos6 + ')');
    $('#ceremonia .hojasizq').css('transform', 'translateY(' + imgPos5 + ')');
    $('#ceremonia .lineasizquierda').css('transform', 'translateY(' + imgPos5 + ')');

    var imgPos6 = scrollTop / 36 + 'px';
    var imgPos7 = scrollTop / 12 + 'px';

    $('#asistencia .geometricoinferior').css('transform', 'translateY(' + imgPos6 + ')');
    $('#asistencia .hojasinferior').css('transform', 'translateY(-' + imgPos6 + ')');
    $('#asistencia .manchitasinferiores').css('transform', 'translateY(' + imgPos7 + ')');

    $('#asistencia .geometricosuperior').css('transform', 'translateY(-' + imgPos6 + ')');
    $('#asistencia .hojassuperior').css('transform', 'translateY(-' + imgPos6 + ')');

    var imgPos8 = scrollTop / 60 + 'px';

    $('#social .hojassuperiores').css('transform', 'translateY(-' + imgPos8 + ')');
    $('#social .hojasinferiores').css('transform', 'translateY(-' + imgPos8 + ')');

});