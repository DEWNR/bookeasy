

// this script REQUIRES imutility.js
// please ensure you include imutility.js before this script, like so:
// <jdoc:include type="impartScript" name="{shared}/v3/js/imutility.js" compress="true" />


// convert the details gadget into bootstrap format, to allow for better styling, and automatic responsiveness
jQuery(document).on('gadget.script.loaded', function() {
	$w.event.subscribe('grid.rendered', function() {
		
// Please do not make changes to this file within the {shared}/v3/ folder
// If you wish to make changes, consider copying and pasting this file into your {template}/js/ folder, and then customising
		
		jQuery('.im-grid td.quantity').addClass('hidden-xs');
		jQuery('.im-grid td.date').addClass('hidden-xs');
		jQuery('.im-grid td.date:gt(3)').addClass('hidden-sm');
		jQuery('.im-grid td.date:gt(7)').addClass('hidden-md');
		
		jQuery('.im-grid tbody tr').each(function() {
			jQuery(this).find('td.price').addClass('hidden-xs');
			jQuery(this).find('td.price:gt(3)').addClass('hidden-sm');
			jQuery(this).find('td.price:gt(7)').addClass('hidden-md');
		});
		
		jQuery('.im-grid td.name .thumb').after('<div class="roominfo"><div class="operatorname"></div><div class="roomname"></div><div class="actionbar"></div></div>');
		jQuery('.im-grid td.name a.more').remove();
		jQuery('.im-grid tbody tr').each(function() {
			jQuery(this).find('.operatorname').text(jQuery('.operator-title').text());
			jQuery(this).find('.actionbar').append('<div class="viewmore">View more info...</div>');
			jQuery(this).find('td.name a').appendTo(jQuery(this).find('.roomname'));
			jQuery(this).find('td.name .specials').appendTo(jQuery(this).find('.actionbar'));
		});
		//jQuery('.im-grid .viewmore').click(function() {
		//	jQuery(this).parent().parent().parent().parent().find('.OperatorInfo').slideToggle();
		//});
		
		jQuery('.im-grid thead tr').prepend('<td class="thumb"></td>');
		jQuery('.im-grid tbody tr').each(function() {
			jQuery(this).find('td.name').before('<td class="thumb"></td>');
			jQuery(this).find('td.thumb').append(jQuery(this).find('div.thumb'));
		});
		
	});
});
