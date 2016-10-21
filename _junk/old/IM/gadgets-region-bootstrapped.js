

// this script REQUIRES imutility.js
// please ensure you include imutility.js before this script, like so:
// <jdoc:include type="impartScript" name="{shared}/v3/js/imutility.js" compress="true" />


// convert the region gadget into bootstrap format, to allow for better styling, and automatic responsiveness
jQuery(document).on('gadget.script.loaded', function() {
	IMUtility.pushRegionGadgetLoadedEvent();
	IMUtility.pushRegionGadgetChangedEvent();
	$w.event.subscribe('region.refinetools.built', function() {
		
		if ((jQuery('.tabs-group').size() > 0) && (jQuery('.gadget__region-tabs').size() > 0)) {
			jQuery('.gadget__region-tabs').remove();
		}
		jQuery('.view-choice .label').hide();
		//jQuery('.view-choice a').css('box-sizing', 'content-box');
		jQuery('.view-choice a.list').addClass('hidden-xs');
		jQuery('.view-choice a.map').addClass('hidden-xs');
		jQuery('.view-choice').addClass('gadget__all-tabs row');
		jQuery('.view-choice a').addClass('tab col-xs-12 col-sm-4 col-md-4');
		jQuery('.tabs-group').addClass('gadget__region-tabs').removeClass('tabs-group');
		jQuery('.search-gadget .period select').change(function() {
			forceManyNightsToListView();
		});
		forceManyNightsToListView();
		
	});
	$w.event.subscribe('region.gadget.built', function() {
		
// Please do not make changes to this file within the {shared}/v3/ folder
// If you wish to make changes, consider copying and pasting this file into your {template}/js/ folder, and then customising
		
		jQuery('.prices-grid td.date').addClass('hidden-xs');
		jQuery('.prices-grid td.date:gt(6)').addClass('hidden-sm');
		jQuery('.prices-grid td.date:gt(13)').addClass('hidden-md');
		
		jQuery('.im-grid tr.odd, .im-grid tr.even').each(function() {
			var operatorUrl = jQuery(this).find('td.property .name').attr('href');
			var operatorId = parseInt(operatorUrl.split('/').pop());
			jQuery(this).find('td.price').addClass('hidden-xs');
			jQuery(this).find('td.price:gt(6)').addClass('hidden-sm');
			jQuery(this).find('td.price:gt(13)').addClass('hidden-md');
			jQuery(this).find('td.property .name').wrapInner('<div class="name"></div>');
			jQuery(this).find('td.property .name div').unwrap();
			//jQuery(this).find('td.total a').wrapInner('<div class="im-btn"></div>');
			//jQuery(this).find('td.total a div').unwrap();
			jQuery(this).find('td.total, td.price, td.property .thumb, td.property .specials, td.property .name, td.property .address, td.property .room-name').click(function() {
				IMUtility.redirect(operatorUrl);
			}).css('cursor', 'pointer');
		});
		
		jQuery('.im-pricebutton-label.label').removeClass('label');
		
	});
	jQuery('head').append('<style> .tabs-group { display:none; } </style>');
});

function forceManyNightsToListView() {
	
	if (parseInt(jQuery('.search-gadget .period select').val()) >= 14) {
		var wThis = $w('div.view-choice a.list');
		var rel = wThis.attr('rel');
		$w.event.publish('region.view.change', wThis, rel);
		jQuery('.gadget__region-tabs a').removeClass('current');
		jQuery('.gadget__region-tabs .list').addClass('current');
	}
	
}
