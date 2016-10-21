// this script can be used standalone, or in combination with other scripts
if (typeof(IMUtility) == 'undefined') {
    IMUtility = {};
    IMUtility.init = function() { IMUtility.debug=0; if (typeof(wisDOM) != 'undefined') { jQuery(document).trigger('gadget.script.loaded'); } else { setTimeout('IMUtility.init();', 100); } };
    jQuery(document).ready(function() { IMUtility.init(); });
}

// wait for the search gadget to have loaded, then publish an event
IMUtility.pushSearchGadgetLoadedEvent = function() {
    if (jQuery('.search-gadget .date .input').size() > 0) {
        $w.event.publish('search.gadget.ready');
    } else {
        setTimeout('IMUtility.pushSearchGadgetLoadedEvent();', 100);
    }
};

// wait for the region gadget to have loaded, then publish an event
IMUtility.pushRegionGadgetLoadedEvent = function() {
    if (jQuery('.prices-grid td.date').size() > 0) {
        $w.event.publish('region.gadget.ready');
    } else {
        setTimeout('IMUtility.pushRegionGadgetLoadedEvent();', 100);
    }
};

// sometimes the changes we do to the DOM are lost, e.g. after user changes the number of nights or number of adults... we need to re-publish the events when this happens
IMUtility.pushRegionGadgetChangedEvent = function() {
    if (jQuery('.tabs-group').size() > 0) {
        $w.event.publish('region.refinetools.built');
    }
    if ((jQuery('.prices-grid td.date').size() > 0) && (jQuery('.prices-grid td.date.hidden-xs').size() == 0)) {
        $w.event.publish('region.gadget.built');
    }
    setTimeout('IMUtility.pushRegionGadgetChangedEvent();', 100);
};

// wait for the booking gadget to have loaded, then publish an event
IMUtility.pushBookGadgetLoadedEvent = function() {
    if (jQuery('.booking-gadget .cartItems').size() > 0) {
        $w.event.publish('book.gadget.ready');
    } else {
        setTimeout('IMUtility.pushBookGadgetLoadedEvent();', 100);
    }
};

// sometimes the changes we do to the DOM are lost, e.g. after user adds or removes cart items in the booking gadget... we need to re-publish the events when this happens
IMUtility.pushBookGadgetChangedEvent = function() {
    if ((jQuery('.booking-gadget .personalDetails').size() > 0) && !jQuery('.personalDetails').hasClass('imUtilityStyled')) {
        jQuery('.personalDetails').addClass('imUtilityStyled');
        $w.event.publish('book.gadget.ready');
    }
    setTimeout('IMUtility.pushBookGadgetChangedEvent();', 100);
};

// utility function
IMUtility.redirect = function(url_file) {
    document.location.href = url_file;
};


// gadgets only load minimal styles
BEcssOverride = 'none';


(function ($) {

    /**
     * @function
     * @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
     * @param {function} handler A function to execute at the time when the element is inserted
     * @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
     * @example $(selector).waitUntilExists(function);
     */

    $.fn.IMElementExists    = function (handler, shouldRunHandlerOnce, isChild) {
        var found   = 'found';
        var $this   = $(this.selector);
        var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

        if (!isChild)
        {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
                window.setInterval(function () { $this.IMElementExists(handler, shouldRunHandlerOnce, true); }, 500)
            ;
        }
        else if (shouldRunHandlerOnce && $elements.length)
        {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }

        return $this;
    }

}(jQuery));
