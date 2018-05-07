/*!
 * ivy
 * 
 * 
 * @author Marco Dizo
 * @version 1.0.0
 * Copyright 2018. MIT licensed.
 */
(function ($, window, document, undefined) {

	'use strict';

	$(function () {
		feather.replace();
		$('header').headroom({
			'offset': 205,
			'tolerance': 5,
			'classes': {
				'initial': 'animated',
				'pinned': 'slideDown',
				'unpinned': 'slideUp'
			}
		});
		$('.steps').slick({
			infinite: true,
			speed: 500,
			fade: true,
			cssEase: 'linear',
			prevArrow: false,
			nextArrow: '<button class="btn btn-ghost next">Next Step <i class = "icon icon-forward" > < /i> </button>',

		});
		$('button.next').click(function () {
			$(".steps").slick('slickNext');
		});
		$('button.prev').click(function () {
			$(".steps").slick('slickPrev');
		});
	});

})(jQuery, window, document);
