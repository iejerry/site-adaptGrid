(function($){
	$.fn.ScrollTop = function(options) {

		var defaults = {
			text: 'Back To Top',
			ID: 'back-to-top',
			min: 300,
			inDelay: 500,
			outDelay: 400,
			skins: 'skin-2',
			easingType: 'easing-2'
		},
			settings = $.extend(defaults, options),
			containerID = '#' + settings.ID;

		$('body').append('<a href="#" id="'+settings.ID+'">'+settings.text+'</a>');
		$(containerID).addClass(settings.skins)
		.hide()
		.on('click', function(){
			pos = $(window).scrollTop();
			$("body").css({
				"margin-top": -pos+"px",
				"overflow-y": "scroll",
			});
			$(window).scrollTop(0);
			$("body").addClass(settings.easingType).css("margin-top","0")
					.on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd",function(){
						$("body").removeClass(settings.easingType);
					});
			return false;
		});


		$(window).scroll(function(){
			if($(this).scrollTop() > settings.min) {
				$(containerID).fadeIn(settings.inDelay);
			}else {
				$(containerID).fadeOut(settings.outDelay);
			}
		});
	}
})(jQuery);