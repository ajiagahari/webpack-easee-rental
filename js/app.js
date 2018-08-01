import '../css/app.scss';
import $ from "jquery";
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'waypoints';
import 'scrollTo';
import 'bootstrap-daterangepicker';

import { initHome, initDocument, checkRoute } from './pageElement.js'
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
        initDocument();
        initHome();
        checkRoute();
        window.addEventListener('hashchange', function() {
            checkRoute();
        });
    });
});
/**
 * EXAMPLE JS ENDS
 */
