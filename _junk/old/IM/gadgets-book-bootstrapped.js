

// this script REQUIRES imutility.js
// please ensure you include imutility.js before this script, like so:
// <jdoc:include type="impartScript" name="{shared}/v3/js/imutility.js" compress="true" />


// convert the booking gadget into bootstrap format, to allow for better styling, and automatic responsiveness
jQuery(document).on('gadget.script.loaded', function() {
	//IMUtility.pushBookGadgetLoadedEvent();
	IMUtility.pushBookGadgetChangedEvent();
	$w.event.subscribe('book.gadget.ready', function() {
		
		jQuery('.booking-gadget').addClass('row');
		jQuery('.booking-gadget .shopping-cart').wrap('<div class="gadget__book-column gadget__book-column-cart col-xs-12 col-sm-12 col-md-4"></div>').css('width', 'auto').css('margin', '0 0 30px 0').css('float', 'none');
		jQuery('.booking-gadget .personalDetails').wrap('<div class="gadget__book-column gadget__book-column-cart col-xs-12 col-sm-12 col-md-4"></div>').css('width', 'auto').css('margin', '0 0 30px 0').css('float', 'none');
		jQuery('.booking-gadget .ccDetails').wrap('<div class="gadget__book-column gadget__book-column-cart col-xs-12 col-sm-12 col-md-4"></div>').css('width', 'auto').css('margin', '0 0 30px 0').css('float', 'none');
		
		jQuery('.booking-gadget .personalDetails > div, .booking-gadget .ccDetails > div').each(function() {
			if (!jQuery(this).hasClass('receiveENewsletter') && !jQuery(this).hasClass('acceptCancellationPolicy') && !jQuery(this).hasClass('cardTypes') && !jQuery(this).hasClass('button')) {
				jQuery(this).addClass('row');
				jQuery(this).find('label').wrap('<div class="col-xs-12 col-md-4"></div>').css('display', 'block').css('width', 'auto');
				jQuery(this).find('.pers').wrap('<div class="col-xs-12 col-md-8"></div>').css('display', 'block').css('width', '100%');
				jQuery(this).find('input.paym').wrap('<div class="col-xs-12 col-md-8"></div>').css('display', 'block').css('width', '100%');
				jQuery(this).find('.expirySelects').addClass('col-xs-12 col-md-8');
				jQuery(this).find('select.paym').wrap('<div class="col-xs-6 col-md-6"></div>').css('display', 'block').css('width', '100%');
				jQuery(this).find('.expirySelects div').css('padding', '0');
			}
			if (jQuery(this).hasClass('cardTypes')) {
				jQuery(this).wrap('<div class="row"></div>');
				jQuery(this).find('label').wrap('<div class="col-xs-12 col-md-4"></div>').css('display', 'block').css('width', 'auto');
				jQuery(this).find('.cardList').addClass('col-xs-12 col-md-8');
			}
		});
		
		jQuery('head').append('<style> .booking-gadget .row { padding-bottom:8px; } </style>');
		
	});
});
