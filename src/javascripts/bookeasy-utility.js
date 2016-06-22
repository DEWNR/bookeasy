
// this script can be used standalone, or in combination with other scripts
if (typeof(IMUtility) == 'undefined') {

    IMUtility = {};
    IMUtility.init = function() { if (typeof(wisDOM) != 'undefined') { jQuery(document).trigger('gadget.script.loaded'); } else { setTimeout('IMUtility.init();', 100); } };
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
    if ((jQuery('.prices-grid td.date').size() > 0) && (jQuery('.prices-grid td.date.region-gadget--built').size() == 0)) {
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


// wait for the details gadget to have loaded, then publish an event
IMUtility.pushDetailsGadgetLoadedEvent = function() {

    if (jQuery('.details-gadget td.name').size() > 0) {
        $w.event.publish('details.gadget.ready');
    } else {
        setTimeout('IMUtility.pushDetailsGadgetLoadedEvent();', 100);
    }

};


// wait for the details content to have loaded, then publish an event
IMUtility.pushDetailsContentLoadedEvent = function() {

    if (jQuery('.OperatorInfo').size() > 0) {
        $w.event.publish('details.content.ready');
    } else {
        setTimeout('IMUtility.pushDetailsContentLoadedEvent();', 100);
    }

};


// utility function
IMUtility.redirect = function(url_file) {
    document.location.href = url_file;
};

jQuery(document).ready(function() {
    jQuery('.be-fancybox').fancybox();
});
