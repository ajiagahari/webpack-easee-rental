import $ from 'jquery';
import 'scrollTo';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { getRoute, renderRoute } from './route.js';
import landingMobil from '../json/landingMobil.js';
import listMobil from '../json/listMobil.js';
import premiumMobil from '../json/premiumMobil.js';
import Parallax from 'scroll-parallax';

// render List thumbnail mobil
const initListMobil = (mobilArray,div)  => {
	$.each(mobilArray, (index) => {
		const thumbnailMobil = (
			'<div class="col-xs-6 col-md-4">'+
                '<div class="thumbnail">'+
                  `<img src="${mobilArray[index].image}">`+
                  '<div class="caption">'+
                    `<h3 class="text-left">${mobilArray[index].name}</h3>`+
                    '<h4 class="text-left">Lepas Kunci</h4>'+
                    '<div class="row">'+
                        '<p class="text-left col-md-6 col-xs-6">12 jam</p>'+
                        `<p class="text-right col-md-6 col-xs-6">Rp. ${mobilArray[index].lepas_kunci_12}</p>`+
                    '</div>'+
                    '<div class="row">'+
                        '<p class="text-left col-md-6 col-xs-6">24 jam</p>'+
                        `<p class="text-right col-md-6 col-xs-6">Rp. ${mobilArray[index].lepas_kunci_24}</p>`+
                    '</div>'+
                    '<h4 class="text-left">Mobil + Supir + BBM</h4>'+
                    '<div class="row">'+
                        '<p class="text-left col-md-6 col-xs-6">12 jam</p>'+
                        `<p class="text-right col-md-6 col-xs-6">Rp. ${mobilArray[index].Mobil_BBM_12}</p>`+
                    '</div>'+
                    '<div class="row">'+
                        '<p class="text-left col-md-6 col-xs-6">24 jam</p>'+
                        `<p class="text-right col-md-6 col-xs-6">Rp. ${mobilArray[index].Mobil_BBM_24}</p>`+
                    '</div>'+
                  '</div>'+
                '</div>'+
            '</div>');
		$(`#${div}`).append(thumbnailMobil);
	})
}

// render Home Page
const initHome = () => {
	initListMobil(listMobil,'listMobil');
	initSubmit();
	var p = new Parallax('.parallax').init();
	$('.navbar').off('show.bs.collapse').on('show.bs.collapse', function(e) {
		$('.navbar').removeClass('transparent');
	});
}

// CORS 
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

const initSubmit = () => {
	$('#formReservasi').off('submit').on('submit',(e) => {
		// set form data
		const submitedData = $('#formReservasi input');
		const formData = new FormData();
		$.each(submitedData,(index) => {
			if(submitedData[index].name){
				formData.append(submitedData[index].name,submitedData[index].value);
			}
		});
		$.ajax({
	        url: 'https://easee-be.herokuapp.com/web/form',
	        data: formData,
	        processData: false,
	        type: 'POST',
	        success: function ( data ) {
	            alert( data );
	        },
	        error: function (e) {
	        	alert('maaf server sedang sibuk');
	        }
	    });
	    e.preventDefault();
	})
}

// 
const initDocument = () => {
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
}
const checkRoute = () => {
	switch(getRoute()) {
	    case '#sewa_mobil':
	        $('#mobil').hide()
	        $('#description').hide()
	        $('#myCarousel').hide()
	        $('#paket').hide()
	        $('#reservasi').hide()
	        $('#sewa_mobil').show()
	        $('#testimoni').hide()
	        $('#help').hide()
	        initListMobil(listMobil,'listMobilAll');
	        initListMobil(premiumMobil,'listMobilPremium');
	        window.scrollTo(0, 0);
	        break;
	    case '#lihat_paket':
	        console.log('lihat paket')
	        break;
	    case '#testimoni':
	        $('#mobil').hide()
	        $('#description').hide()
	        $('#myCarousel').hide()
	        $('#paket').hide()
	        $('#reservasi').hide()
	        $('#sewa_mobil').hide()
	        $('#testimoni').show()
	        $('#help').hide()
	        window.scrollTo(0, 0);
	        break;
	    case '#lihat_kontak':
	        console.log('lihat kontak')
	        break;
	    case '#lihat_reservasi':
	    	$('#mobil').hide()
	        $('#description').hide()
	        $('#myCarousel').hide()
	        $('#paket').hide()
	        $('#reservasi').show()
	        $('#sewa_mobil').hide()
	        $('#testimoni').hide()
	        $('#help').hide()
	        window.scrollTo(0, 0);
	        break;
	    default:
	    	// home
	    	$('#mobil').show()
	        $('#description').show()
	        $('#myCarousel').show()
	        $('#paket').show()
	        $('#reservasi').show()
	        $('#sewa_mobil').hide()
	        $('#testimoni').hide()
	        $('#help').show()
	}
}

export {
	initDocument,
	checkRoute,
	initHome,
}