import '../css/app.scss';
import $ from "jquery";
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'waypoints';
import 'scrollTo';
import 'bootstrap-daterangepicker';
/**
 * EXAMPLE JS STARTS
 */
$(function() {

    $('[id^=scrollTo]').click(function() {
        var id = $(this).attr('id').slice(9);
        $(window).scrollTo($('#' + id), 1000, { offset: { top: -51, left: 0 } });
    });
    $('.date').daterangepicker({
    singleDatePicker: true});
    $('#marketing').waypoint(function() {
        $('.img-circle').addClass('animated zoomIn');
    }, {
        offset: '50%',
        triggerOnce: true
    });

    $('.featurette').waypoint(function() {
        $('#' + this.element.id + ' .featurette-image').addClass('animated pulse');
    }, {
        offset: '50%',
        triggerOnce: true
    });
    $(document).ready(function(){
        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
                if (scroll > 0) {
                    $(".navbar").removeClass("transparent");
                }
                else{
                    $(".navbar").addClass("transparent");
                }
                if (scroll > 200) {
                    $(".navbar").addClass("bg-primary");
                }

                else{
                    $(".navbar").removeClass("bg-primary");   
                }
        })
    })
});
/**
 * EXAMPLE JS ENDS
 */
