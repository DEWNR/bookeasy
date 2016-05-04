
jQuery(document).ready(function() {
	
	setInterval(function() {
		
		// re-check the DOM to see whether cart bar should be visible or not
		var cartIsVisible = false;
		if (parseInt(jQuery('#cart-bar #toolbar-tripplanner a').text()) > 0) {
			cartIsVisible = true;
		}
		if (jQuery('#cart-bar .cartItems').size() > 0) {
			cartIsVisible = true;
		}
		
		// apply visibility changes when necessary
		if (cartIsVisible && !jQuery('#cart-bar').hasClass('visible')) {
			jQuery('body').addClass('cart-bar-visible');
			jQuery('#cart-bar').addClass('visible');
		} else if (!cartIsVisible && jQuery('#cart-bar').hasClass('visible')) {
			jQuery('body').removeClass('cart-bar-visible');
			jQuery('#cart-bar').removeClass('visible');
		}
		
	}, 500);
	
});
