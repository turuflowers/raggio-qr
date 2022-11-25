wow = new WOW(
    {
        offset:       100,          // default
    }
);

wow.init();

$(document).ready(function() {
});

var countDownDate = new Date("April 16, 2022 17:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);


    // When the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        $('#clock ').html('');
    }else{
        // Print the result in html
        $('#clock .days .numero').html(minTwoDigits(days));
        $('#clock .hours .numero').html(minTwoDigits(hours));
        $('#clock .minutes .numero').html(minTwoDigits(minutes));
        $('#clock .seconds .numero').html(minTwoDigits(seconds));
    }
}, 1000);

function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}
