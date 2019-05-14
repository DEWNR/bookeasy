console.log('bookeasy-mods');

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


    // initialise region gadget watchers // may be required when filters change?
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




    /**
     * Subscribe to built in gadget events
     */
    $w.event.subscribe('region.gadget.loaded', function() {
        console.log(' region.gadget.loaded');
    });

    // style tabs once refine tools are built
    $w.event.subscribe('region.refinetools.built', function() {
        console.log('region.refinetools.built');

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

        console.log('details.content.ready');

        // if Kangaroo Island Tour Pass display concession input
        if ( operatorID == '97738' ) {
            $('.search-gadget div.concessions').css({'display': 'inline-block', 'width': '80px'});
        }

        // remove option to select 0 adults
        if (operatorID != '72030') {  //except for snorkelling which has concessions
            $('.adults select option[value="0"]').attr('disabled', 'disabled').hide();
        }

        // rename 'Date' to 'Start date' for parks passes page
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


    // is fired when details-gadget grid.rendered
    $w.event.subscribe('grid.rendered', function() {

        console.log('grid.rendered');

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


    // Cart Gadget Events
    $w.event.subscribe('cart.save.complete', function(any) {
        console.log('cart.save.complete');
        console.log('any: ', any);
        setTimeout('pushCartItemsLoadedEvent();', 300);
    });
    // $w.event.subscribe('cart.display.loading.end', function() {
    //     console.log('cart.display.loading.end');
    // });
    // $w.event.subscribe('cart.add.click', function() {
    //     console.log('cart.add.click');
    // });
    // $w.event.subscribe('cart.remove.click', function() {
    //     console.log('cart.remove.click');
    // });

    // Item Gadget Events
    // $w.event.subscribe('item.book.click', function(item) {
    //     console.log('item.book.click');
    //     console.log(item);
    // });
    // $w.event.subscribe('details.begin', function() {
    //     console.log('details.begin');
    // });
    $w.event.subscribe('details.init.start', function() {
        console.warn('details.init.start');
        balanceNoConcessionsOrAdults();
    });
    // $w.event.subscribe('details.getdata.start', function() {
    //     console.log('details.getdata.start');
    // });



    $w.event.subscribe('region.view.change', function() {
        console.log(' region.view.change');
    });
    $w.event.subscribe('region-search-locations-loaded', function() {
        console.log('region-search-locations-loaded');
    });
    $w.event.subscribe('region.loading.end', function() {
        console.log('region.loading.end');
    });
    $w.event.subscribe('region.loading.start', function() {
        console.log('region.loading.start');
    });


    // region.gadget.built is fired when using the region-gadget
    $w.event.subscribe('region.gadget.built', function() {

        // console.log('region.gadget.built');

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

            //console.log('region.gadget.finished');

        });

    });


});


function isConcessionsHidden() {  //tests if the concession input is hidden
    var hidden = true;
    if ( $('.concessions').length ) {
        hidden = false;
    } else if ( $('.concessions').is(":hidden") ) {
        hidden = false;
    }
    return hidden;
}






































function balanceNoConcessionsOrAdults() {
    console.log('balanceNoConcessionsOrAdults');
    //only run if no concessions
    var be_cookie_data = JSON.parse( readCookie('TUOQQQSQVSPTOqaWQfPyveRwVpSzPTTr') );
    console.log(be_cookie_data.adults);
    if ( isConcessionsHidden() ) {
        var adultsval = 2;
        if ( (be_cookie_data.adults > 0) && (!isNaN(be_cookie_data.adults)) ) {
            adultsval = be_cookie_data.adults;
        }
        be_cookie_data.adults = adultsval;
        $(".adults .input select").val(adultsval).trigger('change'); //set current to 1
        console.warn("adults value changed.");
        eraseCookie('TUOQQQSQVSPTOqaWQfPyveRwVpSzPTTr');
        createCookie('TUOQQQSQVSPTOqaWQfPyveRwVpSzPTTr', be_cookie_data, 1);
    }


    var adultsinput = '';
    var concessionsinput = '';
    $(".adults .input select").change(function () {
        concessionsinput = $(".concessions .input select").val();
        console.log('concessionsinput: ', concessionsinput);
        if ($(this).val() == '0') {
            if (concessionsinput == '0') {
                $(".concessions .input select").val('1').trigger('change'); //set current to 1
                console.error("0 disabled for concessionsinput.");
            }
            $('.concessions .input select option[value="0"]').attr('disabled', 'disabled').hide(); //hide 0
        }
        else if (concessionsinput != '0') {
            $('.concessions .input select option[value="0"]').removeAttr('disabled').show(); //show 0
            console.error("0 enabled for concessionsinput.");
        }
    });
    $(".concessions .input select").change(function () {
        window.sessionStorage.setItem("BE_concessions", $(this).val()); //store number of concessions
        adultsinput = $(".adults .input select").val();
        console.log('adultsinput: ', adultsinput);
        if ($(this).val() == '0') {
            if (adultsinput == '0') {
                $(".adults .input select").val('1').trigger('change'); //set current to 1
                console.error("0 disabled for concessionsinput.");
            }
            $('.adults .input select option[value="0"]').attr('disabled', 'disabled').hide(); //hide 0
        }
        else if (adultsinput != '0') {
            $('.adults .input select option[value="0"]').removeAttr('disabled').show(); //show 0
            console.error("0 enabled for adultsinput.");
        }
    });
}





function updateProductRows(gadget) {


    var $dateHeaders = $('.im-grid thead td.date').clone();
    var sSelector = '.im-grid tr.odd, .im-grid tr.even';

    if(gadget === 'region') {
        sSelector = '.im-grid .accom tr.odd, .im-grid .accom tr.even';
    }

    // loop over each product row and modify
    $(sSelector).each(function() {
        var $product = $(this);
        // var priceTable = '<td><table class="price_table">';

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



function getAccomRatesGridData() {
    console.log('run get API data');
    //      here we fetch from BE api only if we don't have a local storage cache
    //      to keep API requests lower

    // read from local storage cache if it exists
    var JSONcache = JSON.parse( localStorage.getItem('cacheAccomRatesGridData') );

    // if no local storage cache then fetch
    if (JSONcache === null ) {

        // setup fetch
        var apiurl = 'https://webapi.bookeasy.com.au/api/getAccomRatesGrid';
        var parameters = '?q=188'
            + '&enforceBookingConditions=false'
            + '&enforceEntirePeriod=false'
            + '&ExternalSearch=false'
            + '&includeInactiveOperators=false';

        getDataFromAPI(apiurl + parameters, function(data) {
            console.log('callback has run: ', data);
            accomRatesGridData = data;
        } );

    } else {
        //store data in local storage
        console.log('found localstorage.');
        console.log( JSONcache );
        return JSONcache;
    }
  }



function getDataFromAPI(fullApiUri, callback) {

    var requestHeader = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    };

    // do fetch
    fetch(fullApiUri, requestHeader)
        .then(function(response) {
            return response.json();
        })
        .then(function(dataFromAPI) {
            console.log('fetched data: ', dataFromAPI);
            // after fetch write response to local storage cache
            var cache_asString = JSON.stringify(dataFromAPI);
            localStorage.setItem('cacheAccomRatesGridData', cache_asString);
            console.log('wrote cache to localstorage: ', dataFromAPI);
            // write data to react state
            callback(dataFromAPI);
        });

}

// const test = anerror => {
//     console.log('a test error', anerror);
// }


// Cookie functions from https://www.quirksmode.org/js/cookies.html
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}