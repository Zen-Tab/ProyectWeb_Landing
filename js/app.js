(function($, document, window){

	$(document).ready(function(){

		$("[data-background]").each(function(){
			var retina = window.devicePixelRatio > 1;
			var bg = $(this).data("background");
			if( retina ){
				var retinabg = bg.replace(".jpg","@2x.jpg");
				$(this).css("background-image","url("+retinabg+")");	
			} else{
				$(this).css("background-image","url("+bg+")");
			}
			
		});

		$("[data-bg-color]").each(function(){
			var bg = $(this).data("bg-color");
			$(this).css("background-color",bg);
		});

		$(".slider").flexslider({
			directionNav: false,
			controlNav: true,
		});

		$(".quote-slider").flexslider({
			directionNav: true,
			controlNav: false,
			prevText: "<i class='fa fa-caret-left'></i>",
			nextText: "<i class='fa fa-caret-right'></i>",
		});

		var eventCarousel = $(".event-carousel");
		eventCarousel.owlCarousel({
 
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			rewindNav: false,
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]

		});
		// Custom Navigation Events
		$("#event-next").click(function(e){
			e.preventDefault();
			eventCarousel.trigger('owl.next');
		});
		$("#event-prev").click(function(e){
			e.preventDefault();
			eventCarousel.trigger('owl.prev');
		});

		var $container = $('.filterable-items');

		$container.imagesLoaded(function(){
		    $container.isotope({
		        filter: '*',
		        layoutMode: 'fitRows',
		        animationOptions: {
		            duration: 750,
		            easing: 'linear',
		            queue: false
		        }
		    });
		});
		$('.filterable-nav a').click(function(e){
	    	e.preventDefault();
	        $('.filterable-nav .current').removeClass('current');
	        $(this).addClass('current');

	        var selector = $(this).attr('data-filter');
	        $container.isotope({
	            filter: selector,
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	         });
	         return false;
	    });
	    $('.mobile-filter').change(function(){

	        var selector = $(this).val();
	        $container.isotope({
	            filter: selector,
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	         });
	         return false;
	    });

	    initLightbox({
	    	selector : '.filterable-item a',
	    	overlay: true,
	    	closeButton: true,
	    	arrow: true
	    });

	    $(".mobile-menu").append($(".main-navigation .menu").clone());
	    $(".toggle-menu").click(function(){
	    	$(".mobile-menu").slideToggle();
	    });

	});

	// Inicializar mapa con Leaflet
	function inicializarMapa() {
		if($(".map").length && typeof L !== 'undefined') {
			try {
				// Destruir mapa anterior si existe
				if(window.mapaInstance) {
					window.mapaInstance.remove();
				}
				
				// Crear mapa nuevo
				window.mapaInstance = L.map('.map').setView([-11.1095, -77.6019], 16);
				
				// Agregar tiles
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '© OpenStreetMap contributors',
					maxZoom: 19
				}).addTo(window.mapaInstance);
				
				// Agregar marcador
				L.marker([-11.1095, -77.6019]).addTo(window.mapaInstance)
					.bindPopup('<strong>Takibatú</strong><br>Huacho, Perú')
					.openPopup();
				
				// Ajustar tamaño
				window.mapaInstance.invalidateSize();
				console.log('✅ Mapa inicializado correctamente');
			} catch(e) {
				console.error('❌ Error al inicializar mapa:', e);
			}
		}
	}

	// Detectar cuando Leaflet esté disponible
	if(typeof L !== 'undefined') {
		// Leaflet ya está cargado
		$(document).ready(inicializarMapa);
	} else {
		// Esperar a que Leaflet cargue
		var checkLeaflet = setInterval(function() {
			if(typeof L !== 'undefined') {
				clearInterval(checkLeaflet);
				$(document).ready(inicializarMapa);
			}
		}, 100);
	}

	// También intentar cuando window loading complete
	$(window).on('load', function(){
		setTimeout(inicializarMapa, 1000);
	});

})(jQuery, document, window);