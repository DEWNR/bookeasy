

// this script REQUIRES imutility.js
// please ensure you include imutility.js before this script, like so:
// <jdoc:include type="impartScript" name="{shared}/v3/js/imutility.js" compress="true" />


// on mobile devices, on the region gadget Prices tab, show the Book Now / Request now buttons UNDERNEATH each operator (not in a table cell on the right)
jQuery(document).on('gadget.script.loaded', function() {
	$w.event.subscribe('region.gadget.built', function() {
		
// Please do not make changes to this file within the {shared}/v3/ folder
// If you wish to make changes, consider copying and pasting this file into your {template}/js/ folder, and then customising
		
		jQuery('.im-grid tr.odd, .im-grid tr.even').each(function() {
			var bookButtonHtml = jQuery(this).find('td.total').html();
			var operatorUrl = jQuery(this).find('td.property .name').attr('href');
			console.log(bookButtonHtml);
			jQuery(this).find('td.mobile-book-btn').remove();
			jQuery(this).find('td.property').append('<div class="clear"></div>');
			jQuery(this).find('td.property').append('<div class="mobile-book-btn hidden-sm hidden-md hidden-lg"></div>');
			jQuery(this).find('td.property .mobile-book-btn').html(bookButtonHtml);
			jQuery(this).find('td.property .mobile-book-btn span').css('display', 'block');
			jQuery(this).find('td.property .mobile-book-btn .type_aaa').remove();
			jQuery(this).find('td.property .mobile-book-btn .type_self').remove();
			jQuery(this).find('td.property .mobile-book-btn').click(function() {
				IMUtility.redirect(operatorUrl);
			}).css('cursor', 'pointer');
		});
		jQuery('.im-grid td.total').addClass('hidden-xs');
		
	});
	jQuery('head').append('<style> @media (max-width: 767px) { .view-results .region-gadget.BE .im-grid thead { display:none; } .mobile-book-btn { padding:10px 60px 25px 60px; } } </style>');
	jQuery('head').append('<style> @media (max-width: 767px) { .view-results div.region-gadget.BE div.prices-grid div.type-group table tbody tr td.property { text-align:center; } .view-results div.region-gadget.BE div.prices-grid div.type-group table tbody tr td.property div.thumb { display:block; width:100px; height:100px; margin:10px auto; float:none; border:none; } } </style>');
});
