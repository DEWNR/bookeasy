console.log('bookeasy-utility');

// define IMUtility and run when dom ready
if (typeof(IMUtility) == 'undefined') {

    IMUtility = {};
    IMUtility.init = function() {
        IMUtility.debug = 0;

        if (typeof(wisDOM) != 'undefined') {
            $(document).trigger('gadget.script.loaded');
        } else {
            setTimeout('IMUtility.init();', 100);
        }
    };

    $(document).ready(function() {
        IMUtility.init();
    });

}





// wait for the search gadget to have loaded, then publish an event
IMUtility.pushSearchGadgetLoadedEvent = function() {
    if ($('.search-gadget .date .input').size() > 0) {
        $w.event.publish('search.gadget.ready');
    } else {
        setTimeout('IMUtility.pushSearchGadgetLoadedEvent();', 100);
    }
};

// wait for the region gadget to have loaded, then publish an event
IMUtility.pushRegionGadgetLoadedEvent = function() {
    if ($('.prices-grid td.date').size() > 0) {
        $w.event.publish('region.gadget.ready');
    } else {
        setTimeout('IMUtility.pushRegionGadgetLoadedEvent();', 100);
    }
};

// wait for the details content to have loaded, then publish an event
IMUtility.pushDetailsContentLoadedEvent = function checkOperatorInfo() {
    if ($('.OperatorInfo').size() > 0) {
        $w.event.publish('details.content.ready');
    } else {
        setTimeout(checkOperatorInfo, 100);
    }
};


// sometimes the changes we do to the DOM are lost, e.g. after user changes the number of nights or number of adults... we need to re-publish the events when this happens
IMUtility.pushRegionGadgetChangedEvent = function() {
    if ($('.tabs-group').size() > 0) {
        $w.event.publish('region.refinetools.built');
    }
    if (($('.prices-grid td.date').size() > 0) && ($('.prices-grid td.date.hidden-xs').size() == 0)) {
        // console.log('region.gadget.built');
        $w.event.publish('region.gadget.built');

        var regionGadgetHasRunOnce = false;

        // detect when last row loaded
        $('.im-grid .accom tbody>tr:last-child .name').IMElementExists(function() {

            if(!regionGadgetHasRunOnce) {
                console.log('region.gadget has not run once.');
            }
            regionGadgetHasRunOnce = true;  // so it won't run again

            // console.log('region.gadget.loaded');
            $w.event.publish('region.gadget.loaded');

        });


    }
    setTimeout('IMUtility.pushRegionGadgetChangedEvent();', 100);
};

// wait for the booking gadget to have loaded, then publish an event
IMUtility.pushBookGadgetLoadedEvent = function() {
    if ($('.booking-gadget .cartItems').size() > 0) {
        $w.event.publish('book.gadget.ready');
    } else {
        setTimeout('IMUtility.pushBookGadgetLoadedEvent();', 100);
    }
};

// sometimes the changes we do to the DOM are lost, e.g. after user adds or removes cart items in the booking gadget... we need to re-publish the events when this happens
IMUtility.pushBookGadgetChangedEvent = function() {
    if (($('.booking-gadget .personalDetails').size() > 0) && !$('.personalDetails').hasClass('imUtilityStyled')) {
        $('.personalDetails').addClass('imUtilityStyled');
        $w.event.publish('book.gadget.ready');
    }
    setTimeout('IMUtility.pushBookGadgetChangedEvent();', 100);
};

// utility function
IMUtility.redirect = function(url_file) {
    document.location.href = url_file;
};





function text2HTML(input) {
    input = input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\//g, '/');
    input = input.replace(/\r/g, '').replace(/\n( )*?(\n)*?( )*?$/, '').replace(/\n( )*?\n/g, '</p><p>').replace(/\n/g, '<br />');
    input = '<p>'+input+'</p>';

    return input;
}





(function ($) {

    /**
     * @function
     * @property {object} $ plugin which runs handler function once specified element is inserted into the DOM
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

}($));
