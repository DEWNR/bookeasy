var resizeTimer;
var windowWidth = $(window).width();
var isMobile = false;
var isAccom = false;
var selectedDays = 1;

$(document).on('gadget.script.loaded', function() {


    // initialise region gadget watchers
    IMUtility.pushRegionGadgetLoadedEvent();
    IMUtility.pushRegionGadgetChangedEvent();

    // check if mobile device
    isMobile = windowWidth < 767 ? true : false;

    // check if type is accomodation
    if($('html').hasClass('is-accom')) {
        isAccom = true;
    }





    // style tabs once refine tools are built
    $w.event.subscribe('region.refinetools.built', function() {

        if (($('.tabs-group').size() > 0) && ($('.gadget__region-tabs').size() > 0)) {
            $('.gadget__region-tabs').remove();
        }

        $('.tabs-group').addClass('gadget__region-tabs').removeClass('tabs-group');

    });





    // region.gadget.built is fired when using the region-gadget
    $w.event.subscribe('region.gadget.built', function() {

        // detect when last row loaded
        $('.im-grid .accom tbody>tr:last-child .name').IMElementExists(function() {
            var oMaps = getMapData();

            $('.prices-grid td.date').addClass('hidden-xs'); // used in bookeasy-utility to determin if loaded

            // get days selected and add/remove class
            selectedDays = getDaysSelected();

            if(isMobile) {
                updateProductRows('region');
            }

            // add maps
            $('td.property').each(function(){
                var $property = $(this);
                var sOberatorID = $(this).parent().attr('id').replace('Operator', '');
                console.log(oMaps[sOberatorID]);
                // read oMaps and find a match for current operator
                if (typeof oMaps[sOberatorID] !== 'undefined' && oMaps[sOberatorID].length) {
                    $property.append('<a class="map-link" href="http://environment.sa.gov.au' + oMaps[sOberatorID] + '" download="filename">View map <span>(pdf)</span></a>');
                }
            })

            // load hi-res images
            insertImages('region');

        });

    });





    // grid.rendered is fired when using the details-gadget
    $w.event.subscribe('grid.rendered', function() {

        // get days selected and add/remove class
        selectedDays = getDaysSelected();

        // detect when last row loaded
        $('.im-grid tbody>tr:last-child .OperatorInfo').IMElementExists(function() {
            var oMaps = getMapData;

            if(isMobile) {
                updateProductRows('details');
            }

            // load hi-res images
            insertImages('details');

        });

    });


});





function updateProductRows(gadget) {
    var $dateHeaders = $('.im-grid thead td.date').clone();
    var sSelector = '.im-grid tr.odd, .im-grid tr.even';

    if(gadget === 'region') {
        sSelector = '.im-grid .accom tr.odd, .im-grid .accom tr.even';
    }

    // loop over each product row and modify
    $(sSelector).each(function() {
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

        if(gadget === 'region') {
            $('.inline-header').remove();
        }

        // insert new product table
        $product.wrapInner('<td><table class="product" width="100%"></td>');

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





function getDaysSelected() {
    var sReturn = 1;

    if (typeof variable === 'undefined') {
        sReturn = $('thead>tr>td.date', '.accom').length;
    }

    // change things up if lots of days selected
    if(sReturn > 5) {
        $('html').addClass('manyCols');
    } else {
        $('html').removeClass('manyCols');
    }

    return sReturn
}





function getMapData() {
    var oReturn = [];

    $.each(campgroundData, function(key, value) {

        if ( key.indexOf(',') != -1 ){

            var aIDs = key.split(',');

            $.each(aIDs, function(i) {
                oReturn[aIDs[i]] = value;
            });

        } else {
            oReturn[key] = value;
        }

    });

    return oReturn;
}





function insertImages(gadget) {
    var thumbCount = 0;

    // loop over thumbnails
    $('img', '.thumb').each(function(){
        var $thumbnail = $(this);
        var imagePath = $thumbnail.attr('rel');
        var productTitle = '';


        if(gadget == 'details') {
            productTitle = $thumbnail.parent().prev().text();
            $thumbnail.attr('src', imagePath).wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + productTitle + '"></a>');
        } else {
            imagePath = imagePath.replace('thumbs/461', 'images');
            productTitle = $thumbnail.parent().siblings('.name').text();
            $thumbnail.wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + productTitle + '"></a>');
        }

    });

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
