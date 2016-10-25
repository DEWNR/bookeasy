IMUtility.detailsGadgetGridRendered = false;

jQuery(document).on('gadget.script.loaded', function() {
    $w.event.subscribe('grid.rendered', function() {

        // Do not run this event handler more than once
        if (IMUtility.detailsGadgetGridRendered) return true;
        IMUtility.detailsGadgetGridRendered = true;


        jQuery('.im-grid table tbody tr:first-child td.name a.more').IMElementExists(function() {
            // Wait for room details link insertion before moving the row data
            insertImages();

        });

    });

});





function insertImages() {
    var thumbCount = 0;

    jQuery('.im-grid tbody tr').each(function() {

        if (jQuery(this).find('td.name div.thumb').size()) {

            // Move thumb to its own column & add fancybox
            $thumbImage = jQuery(this).find('.thumb > img');
            imagePath = $thumbImage.attr('rel');
            thumbCount = thumbCount + 1;

            $thumbImage.attr('src', imagePath).wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + jQuery(this).find('a:not([class])').text() + '"></a>');

            // jQuery(this).find('td.thumb').append(jQuery(this).find('div.thumb'));

        }

    });

    if (thumbCount == 0) {
        // remove header thumb

        jQuery('.im-grid thead tr td.thumb').remove();
    }
}
