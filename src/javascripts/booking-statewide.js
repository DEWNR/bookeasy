/**
 * This code uses the json data generated by [Parks DLV BookEasy data] in the CMS.
 * This will initialise the BE region-gadget and create buttons beneath the
 * location-selector.
 **/

// BE['gadget']['region']['text']['viewMap'] = 'Map';
// BE['gadget']['search']['text']['adults']['label'] = 'Adults';
// var t0 = window.performance.now();  // get precise time to compare against later
var isRegionGadgetPage = false;
var dataExists = false;
var productsData;
var aAllLocations;
var aFilteredLocations = []; // contains an array of locations to show in region gadget
var urlHash;
var hideProductTypes = [];
var bShowRegionGadget = 1;
var windowURL = window.location.href;
var dataURL = '//www.environment.sa.gov.au/feed.rss?listname=npsa-cl-products-data';


if ( windowURL.search(/localhost/i) >= 0 || windowURL.search(/127.0.0.1/i) >= 0 ) {
        console.log( 'using local data' );
        dataURL = '../data/parks-data.json';
}


$.getJSON(dataURL, function(json){
        productsData = json;
        dataCleanAndRun();
})
    .fail(function() {
        console.log( "npsa-cl-products-data JSON error" );
});



function dataCleanAndRun() {

    if ($('#bookeasy__region-gadget').length > 0) {
        isRegionGadgetPage = true;
    }
    if (typeof productsData !== 'undefined') {
        dataExists = true;
    }


    if (dataExists === true && isRegionGadgetPage === true) {

        // corrects park names when they differ from BE location names
        if (typeof productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'] != 'undefined') {
            // create new object
            var newObject = ['Nullarbor National Park Wilderness Protection Area'];
            // clone old object into new object
            productsData[ newObject ] = productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'];
            // delete old object
            delete productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'];
        }

        aAllLocations = Object.keys(productsData).sort();
        urlHash = location.hash.replace(/^#/, '').trim();
        hideProductTypes = ['tours','carhire','events','packages'];

        urlHash = urlHash.replace(/%20/g, ' ');

        // fix for Nullarbor
        if(urlHash === 'Nullarbor National Park, Wilderness Protection Area and Regional Reserve') {
            urlHash = 'Nullarbor National Park Wilderness Protection Area';
        }


        $(function() {

            // redirect to booking page if no hash and details in url
            if (window.location.href.indexOf('details') > -1 && urlHash == '') {
                IMUtility.redirect('http://www.environment.sa.gov.au/parks/booking/');
            } else if (window.location.href.indexOf('details') > -1 ) {
                bShowRegionGadget = 0;
            }

            if (bShowRegionGadget) {
                initRegionGadget();     // initialise region gadget
            }


            // change location to display
            $('.location-selector__select').on('change', function() {
                // set location hash to selected location
                window.location.hash = urlHash = $(this).val();
            });


            $('.be-fancybox').fancybox();

        });


        // watch for URL hash changes
        $(window).bind('hashchange', function() {

            aFilteredLocations = getFilteredLocations(); // get currently selected location
            bookeasy(); // re-load bookeasy gadget

        });


    } else {
        if (isRegionGadgetPage === true && dataExists === false) {
            console.log('The region-gadget id exists but data is missing!');
        }
    }

}



function initRegionGadget() {

    aFilteredLocations = getFilteredLocations(); // get currently selected location
    createLocationSelector(); // create location selector

    bookeasy(); // load bookeasy gadget

}



function getFilteredLocations() {

    var aReturn = aAllLocations; // defaults to show all locations

    // check if the hash has been set
    if (urlHash && (urlHash !== '-All-')) {
        aReturn = [urlHash]; // set aFilteredLocations
    }

    return aReturn;
}



function createLocationSelector() {

    $.each( aAllLocations, function(key, val) {
        $('.location-selector__select').append($('<option></option>').attr('value', val).attr('selected', urlHash == val ? true : false).text(val));
    });

}



function displayProductsData() {

    var hasAccomodation = false;

    if (!urlHash) {
        urlHash = '-All-';
    }

    $('.button-list').remove();
    $('.location-selector').after($('<div class="button-list"></div>'));


    //productsData[urlHash] is better than using eval to turn string into object name
    try {
        $.each(productsData[urlHash]["Things to book"], function(key, val) {
            if (key == 'Vehicle Entry Fee') {
                key = 'Vehicle Entry Fees'
            }

            //we don't need to display camping button if we are already looking at camping
            if (key !== 'Camping / Accommodation' && val === true) {
                //Check urls
                bookingURL = productsData[urlHash].url + '/' + (key.replace(/ /g , '-')).toLowerCase();

                if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                    bookingURL += '.html';
                }

                $('.button-list').append($('<a href="'+ bookingURL + '"><span>' +key+ '</span></a>').addClass('button-list__button '+key).attr('data', key));
                $('.'+key).click(  function(){ typeShow('tours'); }  );
            }

            if (key == 'Camping / Accommodation' && val === true) {
                hasAccomodation = true;
            }
        });

    } catch(error) {
        console.error('ERROR: Problem reading json data. '+error);
        return false;
    }

    return hasAccomodation;

}



function typeShow(productType) {

    hideProductTypes = ['accom','tours','carhire','events','packages'];

    var posInArray = $.inArray(productType, hideProductTypes);

    if ( posInArray > -1 ) {
        var splice = hideProductTypes.splice( 1, posInArray );  //remove 1 item, from positionInArray
    }

    bookeasy();
}



function bookeasy() {

    cleanGoogleMaps();

    $('.booking__early-text').html('');  //clean old messages

    var bookingDate = new Date();
    var detailPageURL = './booking/details';

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        detailPageURL = './details-gadget.html';
    }

    hasAccomodation = displayProductsData();

    bookingDate.setDate( bookingDate.getDate() );

    // only load gadget for those with camping / accomodation
    if (hasAccomodation) {
        BE.gadget.region('#bookeasy__region-gadget', {
            accomOnlyMode: true, // only display accommodation
            adults: 1,
            collapseRefineTools: true,
            customMapIcons: {
                'accom': {
                    // BookEasy doesn't support SVG icon for IE
                    icon: '//www.environment.sa.gov.au/files/templates/00000000-0000-0000-0000-000000000000/219e8335-7a56-482d-9f78-7b3f16068846/npsa-marker-general.png',
                    pinpoint: [13,45],
                    size: [26,45]
                }
            },
            defaultDate: bookingDate,
            defaultSort: 'name', // or location
            ignoreSearchCookie: false,
            itemDetailPageURL: detailPageURL,
            limitLocations: aFilteredLocations,
            period: 1, // number of days to display
            showAllAccom: true, // show all, even if unavailable for time period
            showList: false, // hide details tab
            disabledTypes: hideProductTypes,
            showLocationFilter: false,
            // showRefineTools: false,  //defaultSort wont' work if false!
            vcID: 188
        });
    } else {
        // empty container
        $('#bookeasy__region-gadget').html('<p>Camping and accommodation is not available in this park.</p>');
        if (urlHash && (urlHash.indexOf('Piccaninnie') !== -1)) {
            $('.booking__early-text').html('');
            var $newDiv = $( '<div class="booking__early-text"><p>You will need to enter an indemnity form receipt number at the time of booking. Diving and snorkelling equipment and wetsuits are not provided, you will need to either bring your own equipment/wetsuits or hire it.</p><p>Fees apply to these self-guided activities.</p><p>Please fill out a <a class="link" style="text-decoration: underline;" href="//www.environment.sa.gov.au/parks/Find_a_Park/Browse_by_region/Limestone_Coast/piccaninnie-ponds-conservation-park/booking/diving/diving-indemnity-form" target="_blank">diving indemnity form</a> or a <a class="link" style="text-decoration: underline;" href="//www.environment.sa.gov.au/parks/Find_a_Park/Browse_by_region/Limestone_Coast/piccaninnie-ponds-conservation-park/booking/snorkelling/snorkelling-indemnity-form" target="_blank">snorkelling indemnity form</a> for each person diving/snorkelling prior to making the booking.</p><p>Camping and accommodation is not available in this park.</p></div>' );
            $('.location-selector').after($newDiv);
            $('#bookeasy__region-gadget').html('');
        }
    }
    // var t1 = window.performance.now();
    // console.log( 'time taken for booking-statewide.js: ' + (t1 - t0) );
}



function cleanGoogleMaps(callback) {    // cleanGoogleMaps();

    $('HEAD STYLE:contains(".gm-style .gm-style-mtc label,.gm-style .gm-style-mtc div")').remove();
    $('HEAD STYLE:contains(".gm-style-pbc")').remove();
    $('LINK[href*="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700"]').remove();
    $('HEAD').find('script[src*="maps.google.com/maps"]').remove();
    if (typeof google !== 'undefined') {   //  == object
        if (typeof google.maps !== 'undefined') {
            delete google.maps;     //delete variable
        }
    }

    // console.log('clean done.');

    if (callback !== undefined) {
        callback();
    }

}



// setTimeout(function(){
//     console.log( typeof productsData );
//     console.log('does productsData exist yet?');
// }, 3000);
