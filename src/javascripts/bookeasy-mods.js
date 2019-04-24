var resizeTimer;
var windowWidth = $(window).width();
var isMobile = false;
var isAccom = false;
var selectedDays = 1;
var campgroundDataHost = '';
var campgroundData;

$(document).on('gadget.script.loaded', function() {

    // if running locally point to the remote campground data
    if ( !window.location.hostname.match('sa.gov.au') ) {
        campgroundDataHost = 'https://www.parks.sa.gov.au';
    }

    // get campground-data from RSS
    $.getScript(campgroundDataHost + '/feed.rss?listname=npsa-cl-campground-data', function(){

        if (campgroundData == null) {
            console.warn('campgroundData not loaded!');
        }

    });

    // setTimeout();
    // window.scrollTo(0, 1);  // potential fix for images still loading


    // initialise region gadget watchers
    IMUtility.pushRegionGadgetLoadedEvent();
    IMUtility.pushRegionGadgetChangedEvent();
    // initialise details gadget watchers
    IMUtility.pushDetailsContentLoadedEvent();

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

        // remove option to select 0 adults
        $('.adults select option[value=0]').attr('disabled', 'disabled').hide();

        // atleast 1 adult or 1 child should always be selected
        // this doesn't work because it doesn't trigger the listener
        // if ( $('.adults select').val() == 0 && $('.children select').val() == 0 ) {
        //     // $('.adults select').val('1');
        //     $('.adults select').get(0).selectedIndex = index_here;
        //     console.log('b4 change');
        //     $('.adults select').focus().change();
        //     console.log('after change');
        // }

    });





    // tasks to do on details gadgets
    $w.event.subscribe('details.content.ready', function() {

        // remove option to select 0 adults
        if (operatorID != '72030') {  //except for snorkelling which has concessions
            $('.adults select option[value="0"]').attr('disabled', 'disabled').hide();
        }

        //rename 'Date' to 'Start date' for parks passes page
        if (typeof operatorID) { // only if defined
            if (operatorID == '81657') { // only if parks passes
                $('.details-gadget .search-gadget .date .label span').html('Start Date');
            } else
            if (operatorID == '65339' || operatorID == '96528' || operatorID == '96529' || operatorID == '96530') { // remove concessions & infants if diving
                $('.details-gadget .search-gadget .infants, .details-gadget .search-gadget .concessions').attr('disabled', 'disabled').hide();
            } else
            if (operatorID == '72030' || operatorID == '91777') { // remove infants if snorkelling
                $('.details-gadget .search-gadget .infants').attr('disabled', 'disabled').hide();
            }
        }
    });


    // region.gadget.built is fired when using the region-gadget
    $w.event.subscribe('region.gadget.built', function() {

        var mapPDFsHaveLoaded = false;

        // detect when last row loaded
        $('.im-grid .accom tbody>tr:last-child .name').IMElementExists(function() {

            if(!mapPDFsHaveLoaded) { //only run if maps have not already been loaded
                var oMaps = getMapData();

                $('.prices-grid td.date').addClass('hidden-xs'); // used in bookeasy-utility to determine if loaded

                // get days selected and add/remove class
                selectedDays = getDaysSelected('region');

                // console.log(selectedDays);

                if(isMobile) {
                    updateProductRows('region');
                }

                // add maps
                $('.im-grid tr.odd, .im-grid tr.even').each(function(i){
                    var $property = $(this).find('td.property');
                    var sOberatorID = $(this).attr('id').replace('Operator', '');

                    // read oMaps and find a match for current operator
                    if (typeof oMaps[sOberatorID] !== 'undefined' && oMaps[sOberatorID].length) {
                        $property.append('<a class="map-link" href="http://www.parks.sa.gov.au' + oMaps[sOberatorID] + '" download="filename">View map <span>(pdf)</span></a>');
                    }

                });

                // if descriptions are displayed with (showRoomDetails: true) this cleans them up
                $('.description>span').each( function(){
                    var newstring = $(this).text().replace(/\.\.\./g, '');  // remove '...' string
                   $(this).text(newstring);
                })
                $('.description>.more').attr('disabled', 'disabled').hide(); // hide 'More' links


                // load hi-res images
                insertImages('region');
            }

            mapPDFsHaveLoaded = true;  // so it won't run again

        });

    });





    // is fired when details-gadget grid.rendered
    $w.event.subscribe('grid.rendered', function() {

        // get days selected and add/remove class
        selectedDays = getDaysSelected('details');

        // console.log(selectedDays);

        // detect when last row loaded
        $('.im-grid tbody>tr:last-child .OperatorInfo').IMElementExists(function() {
            var oMaps = getMapData;

            if(isMobile) {
                updateProductRows('details');
            }

            // load hi-res images
            insertImages('details');

            // replace text
            replaceRoomText(document.querySelector('.details-gadget'));

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

        // move heading after thumbnail
        $product.find('td.name div.thumb').eq(0).after( $product.find('td.name>a') );

        // create price table
        $product.find('td.price').each(function(index) {
            $product.find('td.price').eq(index).prepend('<span class="price__date">' + $dateHeaders[index].innerHTML + '</span>');
        });

        if(gadget === 'region') {
            $('.inline-header').remove();
        }

        // insert new product table
        $product.wrapInner('<td><table class="product" width="100%"></td>');

        // remove quantity (not needed for accomodation)
        $('td.total').parent().addClass('product__row--total');

        // add specials
        $product.find('.product__row--total').after('<tr class="product__row  product__row--specials"><td></td></tr>');
        $product.find('.product__row--specials td').append($product.find('div.specials'));
    });

    // remove header content
    $('thead','.im-grid').remove();


}





function getDaysSelected(gadgetType) {
    var sReturn = 1;

    if (gadgetType == 'details') {
        sReturn = $('thead>tr>td.date', '.priceGrid').length;
    }
    if (gadgetType == 'region') {
        sReturn = $('thead>tr>td.date', '.accom').length;
    }

    // if (typeof variable == 'undefined') {
    //     sReturn = $('thead>tr>td.date', '.accom').length;
    // }

    // console.log(gadgetType);

    // change things up if lots of days selected
    if(sReturn > 5) {
        $('html').addClass('manyCols');
    } else {
        $('html').removeClass('manyCols');
    }

    return sReturn;
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
            $thumbnail.attr('src', imagePath).wrap('<a class="be-fancybox" href="' + imagePath + '" data-fancybox="gallery" data-caption="' + productTitle + '"></a>');
        } else {
            imagePath = imagePath.replace('thumbs/461', 'images');
            productTitle = $thumbnail.parent().siblings('.name').text();
            $thumbnail.wrap('<a class="be-fancybox" href="' + imagePath + '" data-fancybox="gallery" data-caption="' + productTitle + '"></a>');
        }

    });

}


// some text replacements defined here
function replaceRoomText(node) {
  if (node.nodeType == 3) {
    node.data = node.data.replace(/Room Configuration:/g, 'Configuration:');
  }
  if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
    for (var i = 0; i < node.childNodes.length; i++) {
      replaceRoomText(node.childNodes[i]);
    }
  }
}

// wrap fancybox in IMElementExists function so it is initialised after the element exists.
$('.be-fancybox').IMElementExists(function() {

    $('[data-fancybox="gallery"]').fancybox({
        toolbar: false,
        hash: false,
        clickOutside: "close",
        clickContent: false,
        loop: true
    });

});




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
