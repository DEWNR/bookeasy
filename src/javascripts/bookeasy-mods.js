IMUtility.detailsGadgetGridRendered = false;

$(document).on('gadget.script.loaded', function() {

    $w.event.subscribe('grid.rendered', function() {

        // Do not run this event handler more than once
        if (IMUtility.detailsGadgetGridRendered) return true;
        IMUtility.detailsGadgetGridRendered = true;


        $('.im-grid table tbody tr:first-child td.name a.more').IMElementExists(function() {
            // Wait for room details link insertion before moving the row data
            insertImages('details');

        });

    });


    IMUtility.pushRegionGadgetLoadedEvent();
    IMUtility.pushRegionGadgetChangedEvent();

    $w.event.subscribe('region.refinetools.built', function() {

        if (($('.tabs-group').size() > 0) && ($('.gadget__region-tabs').size() > 0)) {
            $('.gadget__region-tabs').remove();
        }

        $('.tabs-group').addClass('gadget__region-tabs').removeClass('tabs-group');
    });

    $w.event.subscribe('region.gadget.built', function() {
        $('.prices-grid td.date').addClass('hidden-xs');

        insertImages('region');
    });

});





function insertImages(gadget) {
    var thumbCount = 0;

    $('.im-grid tbody tr').each(function() {

        if ($(this).find('td.name div.thumb').size()) {

            // Move thumb to its own column & add fancybox
            $thumbImage = $(this).find('.thumb > img');
            imagePath = $thumbImage.attr('rel');

            thumbCount = thumbCount + 1;

            $thumbImage.attr('src', imagePath).wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + $(this).find('a:not([class])').text() + '"></a>');


        } else if ($(this).find('div.thumb').size()) {

            // Move thumb to its own column & add fancybox
            $thumbImage = $(this).find('.thumb > img');
            imagePath = $thumbImage.attr('rel').replace('thumbs/461', 'images');

            thumbCount = thumbCount + 1;

            $(this).find('div.thumb').append('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + $(this).find('a.name').text() + '"><img src="' + imagePath + '" /></a>');
            $(this).find('div.thumb > img').hide();

        } else {
            $(this).addClass('no-image');
        }

    });

    if (thumbCount == 0) {
        // remove header thumb

        $('.im-grid thead tr td.thumb').remove();
    }
}
