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

        // show pdf map link for appropriate campsite
        jQuery('.im-grid tr.odd, .im-grid tr.even').each(function() {

            jQuery(this).find('td.property').append('<div class="clear"></div>');

            sOberatorID = jQuery(this).attr('id').replace('Operator', '');

            // read campgroundData and find a match for current operator
            if (campgroundData[sOberatorID].length) {
                jQuery(this).find('td.property').append('<a class="map-link" href="' + campgroundData[sOberatorID] + '" target="_blank">View campground map</a>');
            }

            // setup fancybox
            thumbImage = jQuery(this).find('.thumb img');
            imagePath = thumbImage.attr('rel').replace('thumbs/461', 'images');

            thumbImage.wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + jQuery(this).find('.name').text() + '"></a>')

        });

    });

});


jQuery(document).on('gadget.script.loaded', function() {

    IMUtility.pushDetailsGadgetLoadedEvent();
    IMUtility.pushDetailsContentLoadedEvent();

    $w.event.subscribe('details.gadget.ready', function() {

        jQuery('.im-grid tr.odd, .im-grid tr.even').each(function() {
            // setup fancybox
            thumbImage = jQuery(this).find('.thumb img');
            imagePath = thumbImage.attr('rel');

            thumbImage.attr('src', imagePath);



            thumbImage.wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + jQuery(this).find('a:not([class])').text() + '"></a>')
        });

    });


    $w.event.subscribe('details.content.ready', function() {

        // format OperatorInfo
        jQuery('.im-grid tr.odd, .im-grid tr.even').each(function() {
            operatorInfo = jQuery(this).find('.OperatorInfo');

            // remove unwanted elements
            jQuery(this).find('.RoomConfig, .MaxGuests, .OperatorItemHeading, .OperatorInfoMore').remove();

            jQuery(this).find('a:not([class])').wrap('<h3>');

            operatorInfo.prepend(jQuery(this).find('h3'));

            // find in array
            currentName = operatorInfo.find('a:not([class])').text();

            // check if it can find the currentName
            if(typeof aRoomData !== 'undefined' && typeof aRoomData[currentName] !== 'undefined') {

                // replace description
                jQuery(this).find('.Description').html('<p>' + aRoomData[currentName].replace(/\n/g, '<br />') + '</p>');

            }


        });

        jQuery('.priceGrid').addClass('loaded');


    });

});
