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

const initOptionMobil = (mobilArray,div) => {
	$.each(mobilArray, (index) => {
		const input = (`<option value="${mobilArray[index].name}">${mobilArray[index].name}</option>`);
		$(`#${div}`).append(input);
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

	initOptionMobil(landingMobil.concat(premiumMobil),'pilihMobil');
}



const initSubmit = () => {
	$('#formReservasi').off('submit').on('submit',(e) => {
		// set form data
		const submitedData = $('#formReservasi input');
		let jsonData = new Object();
		$.each(submitedData,(index) => {
			if(submitedData[index].name){
				jsonData[`${submitedData[index].name}`] = submitedData[index].value;
			}
		});
		const selectedData = $('#formReservasi select');
		$.each(selectedData,(index) => {
			if(selectedData[index].name){
				jsonData[`${selectedData[index].name}`] = selectedData[index].value;
			}
		});
		const jsonString= JSON.stringify(jsonData);
		$.ajax({
	        url: 'https://easee-be.herokuapp.com/web/form',
	        data: jsonString,
	        processData: false,
	        cache: false,
		    contentType: "application/json",
	        type: 'POST',
	        success: function ( {status,message} ) {
	            alert( message );
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
	        initListMobil(landingMobil,'listMobilAll');
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
	    case '#syarat' :
	    	console.log('masuk syarat');
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