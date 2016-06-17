// region gadget modification setup
jQuery(document).on('gadget.script.loaded', function() {

    IMUtility.pushRegionGadgetLoadedEvent();
    IMUtility.pushRegionGadgetChangedEvent();

    $w.event.subscribe('region.refinetools.built', function() {

        if ((jQuery('.tabs-group').size() > 0) && (jQuery('.gadget__region-tabs').size() > 0)) {
            jQuery('.gadget__region-tabs').remove();
        }

        jQuery('.tabs-group').addClass('gadget__region-tabs').removeClass('tabs-group');

    });


    $w.event.subscribe('region.gadget.built', function() {

        jQuery('.prices-grid td.date').addClass('region-gadget--built');

    });

});

// show pdf map link for appropriate campsite
jQuery(document).on('gadget.script.loaded', function() {
    $w.event.subscribe('region.gadget.built', function() {

        jQuery('.im-grid tr.odd, .im-grid tr.even').each(function() {
            jQuery(this).find('td.property').append('<div class="clear"></div>');

            sOberatorID = jQuery(this).attr('id').replace('Operator', '');

            // read campgroundData and find a match for current operator
            if (campgroundData[sOberatorID].length) {
                jQuery(this).find('td.property').append('<a href="' + campgroundData[sOberatorID] + '" target="_blank">View campground map</a>');
            }

        });


    });

});
