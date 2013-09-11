(function(){
	$('.info-what').hide();
	$('.archive').hide();	

	$('.more-info-what').click(function(e){
		$('.info-what').slideToggle(100);
		e.preventDefault();
	});

	$('.more-info-map').click(function(e){
		$('.info-map').slideToggle(100);
		map.invalidateSize();
		marker.openPopup();
		e.preventDefault();
	});

	$('.previous').find('.meetings,.more').click(function(e){

		if($(this).is('.meetings')){			
			$('.archive').slideDown(250);
			scrollPage(this);
		} else {			
			$('.archive').slideToggle(250);
		}
		e.preventDefault();
	});

	checkHash();

})();

function checkHash() {
	var hash = window.location.hash.substring(1).toLowerCase();
	if ( hash ) {
		$('[href="#' + hash + '"]').trigger('click');
	}
}

function scrollPage(clicked){
	var animationSpeed = 500;					 // Speed of the animation in ms
	var url = window.location.protocol + "//" + window.location.host + window.location.pathname; // Get current URL
	var id = String(clicked).substr(url.length); // Take the URL and leave the # part
	var scrollAmount = $(id).position().top;	// Finds the position from the top of the window for the heading with the ID 'hrefValue'
	$('html, body').animate({scrollTop: scrollAmount}, animationSpeed, function(){
		parent.location.hash = id; //Set hash id in URL
	}); // Moves to the top of the post in 'animationSpeed'ms
}

// Map

var portlandBuilding = new L.LatLng(50.798612, -1.099304);
var ravelinPark = new L.LatLng(50.792454, -1.097009);

var map = L.map('map', { scrollWheelZoom: false }).setView(portlandBuilding, 16);

L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				 '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(map);

var fullScreen = new L.Control.FullScreen(); 
map.addControl(fullScreen);

var customMarker = L.icon({
	iconUrl: './img/map-marker.png',

	iconSize:     [24, 38], // size of the icon
	iconAnchor:   [12, 38], // where the 'tip' is
	popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

map.panTo(ravelinPark);
var marker = L.marker(ravelinPark, {icon: customMarker }).addTo(map)
		             .bindPopup("<a class='direct' href='https://maps.google.co.uk/maps?daddr=50.792549,-1.097241&hl=en&sll=50.793119,-1.094513&sspn=0.007853,0.021136&t=h&mra=ls&z=16' title='with Google Maps' target='_blank'>Get directions here!</a>");

// Background drawing

var bg = Raphael('background-images');

var delay = 250;
var lineLength = 50;

drawWire(bg, 2, 250, 45, 0, 100);
drawWire(bg, 0, 200, 60, 0, 250);
drawChip(bg, 300, $(document).width() - 170, 120);

function drawChip(bg, delay, x, y){

	var ease =  'bounce';

	var rectAttr = { 'stroke-width': 0, transform: 's0' };

	var chip = bg.rect(x + 20, y, 100, 80)
				 .attr(rectAttr).attr({ fill: '#505050' })
				 .animate({ transform: 's1' }, delay, ease);

	var logo = bg.image('./img/upsu-logo.png', x + 28, y + 40, 80, 28)
				 .attr({ transform: 's0' })
				 .animate({ transform: 's1' }, delay, ease);

	// bits
	for(i = 0; i < 6; i++){

		var side = 0;
		offset = i;
		if(i>2){ side = 120; offset = i - 3; }

		var bitAnim = Raphael.animation({ transform: 's1' }, delay);
		var bit = bg.rect(x+side, y+10+(offset * 25), 20, 15)
					.attr(rectAttr).attr({ fill: '#8A8A8A' })
					.animate(bitAnim.delay(delay+((delay/3)*i)));

	}
}

function drawWire(bg, forks, delay, lineLength, x, y){
	var strokeWidth = 15;
	var strokeOffset = strokeWidth / 2;

	var wireAttributes = {
		stroke:'#DFCF47',
		'stroke-width': strokeWidth,
		'stroke-linejoin': 'round'
	};

	var ease =  'bounce';

	if(forks == 0){

		var wirePathSub1 = 'M'+ x +','+ y;
		var wirePathSub2 = 'L'+ (x+(lineLength*2)-strokeWidth-strokeOffset) +','+ y;

		var wirePathAnim = Raphael.animation({path: wirePathSub1+wirePathSub2}, delay);
		var wirePath = bg.path(wirePathSub1)
						 .attr(wireAttributes)
						 .animate(wirePathAnim.delay(delay * 2));

		var wireCircleAnim = Raphael.animation({'stroke-width': strokeWidth}, delay * 2, ease);
		var circle = bg.circle(x+(lineLength*2)-strokeOffset, y, strokeWidth)
					   .attr(wireAttributes).attr({ 'stroke-width': 0 })
					   .animate(wireCircleAnim.delay(delay * 3));

	}else if(forks == 2){

		var wirePath1Sub1 = 'M'+ x +','+ y;
		var wirePath1Sub2 = 'L'+ (x+lineLength) +','+ y;

		var wirePath1 = bg.path(wirePath1Sub1)
						  .attr(wireAttributes)
						  .animate({path: wirePath1Sub1 + wirePath1Sub2}, delay);

		var wirePath2Sub1 = 'M'+ (x+lineLength-strokeOffset) +','+ y;
		var wirePath2Sub2 = 'L'+ (x+lineLength-strokeOffset) +','+ (y/2);

		var wirePath2Anim = Raphael.animation({path: wirePath2Sub1+wirePath2Sub2}, delay);
		var wirePath2 = bg.path(wirePath2Sub1)
						  .attr(wireAttributes)
						  .animate(wirePath2Anim.delay(delay));

		var wirePath3Sub1 = 'M'+ (x+lineLength-strokeOffset) +','+ (y/2+strokeOffset);
		var wirePath3Sub2 = 'L'+ (x+(lineLength*2)-strokeWidth-strokeOffset) +','+ (y/2+strokeOffset);

		var wirePath3Anim = Raphael.animation({path: wirePath3Sub1+wirePath3Sub2}, delay);
		var wirePath3 = bg.path(wirePath3Sub1)
						  .attr(wireAttributes)
						  .animate(wirePath3Anim.delay(delay * 2));

		var wireCircleAnim = Raphael.animation({'stroke-width': strokeWidth}, delay * 2, ease);
		var circle = bg.circle(x+(lineLength*2)-strokeOffset, strokeOffset + (y/2), strokeWidth)
					   .attr(wireAttributes).attr({ 'stroke-width': 0 })
					   .animate(wireCircleAnim.delay(delay * 3));

	}	

}