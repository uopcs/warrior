(function(){
	$('.archive').hide();
	$('.meeting').find('.details').hide();

	$('.meeting').find('.event-name').click(function(e){

		$('.meeting').find('.details').hide();

		$('.archive').slideDown(250);
		
		$(this).parents('.meeting').find('.details').slideToggle(100);
		$(this).parents('.meeting').find('.show-desc').text(swapMoreLess($(this).parents('.meeting').find('.show-desc').text()));
		
		scrollPage(this);

		e.preventDefault();

	});

	$('.more-info-map').click(function(e){
		$('.info-map').slideToggle(100);
		map.invalidateSize();
		openPopups(markers);
		e.preventDefault();
	});

	$('.previous').find('.meetings,.more').click(function(e){

		if($(this).is('.meetings')){	

			$('.meeting').find('.details').hide();	

			$('.archive').slideDown(250);
			
			$(this.hash).find('.details').slideDown(100);
			$(this.hash).find('.show-desc').text(swapMoreLess($(this.hash).find('.show-desc').text()));
			
			scrollPage(this);

		} else {

			$('.archive').slideToggle(250,function(){
				$('.details').hide();
				history.pushState('', document.title, window.location.pathname); // remove the hash
			});

		}

		e.preventDefault();

	});

	checkHash();

	var svg_support = (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect);

	//Remove SVG if it isnt supported
	if (!svg_support) {		
		$('.logo').removeClass('logo-svg');
		$('.twitter').removeClass('twitter-svg');
		$('.facebook').removeClass('facebook-svg');
	}

})();

function swapMoreLess(text){
	if(text.toLowerCase() == 'more'){
		return 'Less';
	}
	return 'More';
}

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