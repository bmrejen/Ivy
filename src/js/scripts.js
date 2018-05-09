(function($, window, document, undefined) {
	'use strict';

	$(function() {
		feather.replace();
		$('header').headroom({
			offset: 205,
			tolerance: 5,
			classes: {
				initial: 'animated',
				pinned: 'slideDown',
				unpinned: 'slideUp'
			}
		});
		$('.slider').on('init', function(event, slick) {
			var $items = slick.$dots.find('li');
			$items.addClass('step-item');
		});

		$('.slider').slick({
			infinite: true,
			speed: 500,
			fade: true,
			cssEase: 'linear',
			dots: true,
			prevArrow: $('button.prev'),
			nextArrow: $('button.next'),
			appendDots: $('.journey-steps'),
			dotsClass: 'step',
			zIndex: 3,
			customPaging: function(slider, i) {
				var step = $(slider.$slides[i]).data('step');
				var title =$(slider.$slides[i]).find('.slide-title').text();
				return '<a class="tooltip" data-tooltip="'+step+'">'+title+'</a>';
			}
		});
	});
})(jQuery, window, document);
