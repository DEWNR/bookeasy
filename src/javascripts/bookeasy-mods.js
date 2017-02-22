var resizeTimer;
var windowWidth = $(window).width();
var isMobile = false;
var isAccom = false;
var selectedDays = 1;

$(document).on('gadget.script.loaded', function() {

    // watch gadget.js 'grid.rendered', do this when fired.
    $w.event.subscribe('grid.rendered', function() {

        // should only be in here while viewing details-gadget

        // check if mobile device
        isMobile = windowWidth < 767 ? true : false;

        // check if type is accomodation
        if($('html').hasClass('is-accom')) {
            isAccom = true;
        }

        // get days selected
        selectedDays = getDaysSelected();

        // change things up if lots of days selected
        if(selectedDays > 5) {
            $('html').addClass('manyCols');
        } else {
            $('html').removeClass('manyCols');
        }

        // detect when last row loaded
        $('.im-grid tbody>tr:last-child .OperatorInfo').IMElementExists(function() {

            if(isMobile) {

                var $dateHeaders = $('.im-grid thead td.date').clone();

                // loop over each product row and modify
                $('.im-grid tr.odd, .im-grid tr.even').each(function() {
                    var $product = $(this);
                    var priceTable = '<td><table class="price_table">';

                    // create price table
                    $product.find('td.price').each(function(index) {
                        priceTable += '<tr><th>' + $dateHeaders[index].innerHTML + '</th><td class="price_table__price">' + $(this).html() + '</td></tr>';
                    });

                    priceTable += '</td></table>'

                    // move thumbnail image
                    $product.find('div.thumb').prependTo($product).wrap('<td />');

                    // add price table
                    $product.append(priceTable);

                    // wrap each td in a row
                    $product.find('td').wrap('<tr class="product__row" />');

                    // insert new product table
                    $product.wrapInner('<td><table class="product"></td>')

                    // remove quantity (not needed for accomodation)
                    $('td.quantity').remove();

                    // remove quantity (not needed for accomodation)
                    $('td.total').parent().addClass('product__row--total');

                    // add specials
                    $product.find('.product__row--total').after('<tr class="product__row  product__row--specials"><td></td></tr>');
                    $product.find('.product__row--specials td').append($product.find('div.specials'));

                });

                // remove header content
                $('thead','.im-grid').remove();

                // remove price columns
                $('td.price').remove();

            }

            // load hi-res images
            insertImages();

        });


    });

});





function getDaysSelected() {
    var sReturn = 1;

    if (typeof variable === 'undefined') {
        sReturn = $('thead>tr>td.date').length;
    }

    return sReturn
}





function insertImages(gadget) {
    var thumbCount = 0;

    // loop over thumbnails
    $('img', '.thumb').each(function(){
        var $thumbnail = $(this);
        var imagePath = $thumbnail.attr('rel');
        var productTitle = $thumbnail.parent().prev().text();

        $thumbnail.attr('src', imagePath).wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + productTitle + '"></a>');
    });

    // $('.im-grid tbody tr').each(function() {
    //
    //     if ($(this).find('td.name div.thumb').size()) {
    //
    //         // Move thumb to its own column & add fancybox
    //         $thumbImage = $(this).find('.thumb > img');
    //         imagePath = $thumbImage.attr('rel');
    //
    //         thumbCount = thumbCount + 1;
    //
    //         $thumbImage.attr('src', imagePath).wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + $(this).find('a:not([class])').text() + '"></a>');
    //
    //
    //     } else if ($(this).find('div.thumb').size()) {
    //
    //         // Move thumb to its own column & add fancybox
    //         $thumbImage = $(this).find('.thumb > img');
    //         imagePath = $thumbImage.attr('rel').replace('thumbs/461', 'images');
    //
    //         thumbCount = thumbCount + 1;
    //
    //         $(this).find('div.thumb').append('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + $(this).find('a.name').text() + '"><img src="' + imagePath + '" /></a>');
    //         $(this).find('div.thumb > img').hide();
    //
    //     } else {
    //         $(this).addClass('no-image');
    //     }
    //
    // });
    //
    // if (thumbCount == 0) {
    //     // remove header thumb
    //     $('.im-grid thead tr td.thumb').remove();
    //     $('.im-grid tbody tr div.thumb').remove();
    // }
}





// done resizing event
// $(window).on('resize', function(e) {
//
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(function() {
//
//     // resizing as stopped, do things!
//     windowWidth = $(window).width();
//
//   }, 250);
//
// });
