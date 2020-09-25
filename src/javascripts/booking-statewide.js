/**
 * This code uses the json data generated by [Parks DLV BookEasy data] in the CMS.
 * This will initialise the BE region-gadget and create buttons beneath the
 * location-selector.
 **/

// BE['gadget']['region']['text']['viewMap'] = 'Map';
// BE['gadget']['search']['text']['adults']['label'] = 'Adults';
// var t0 = window.performance.now();  // get precise time to compare against later

if (!bookingsDisabled) {  //if undefined
    var bookingsDisabled = false;       // define it
}

var isRegionGadgetPage = false;
var dataExists = false;
var productsData;
var aAllLocations;
var aFilteredLocations = []; // contains an array of locations to show in region gadget
var urlHash;
var hideProductTypes = [];
var bShowRegionGadget = 1;
var windowURL = window.location.href;
var dataURL = '/feed.rss?listname=npsa-cl-products-data';
var initialIs;


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

        if (bookingsDisabled == true) {

            // productsData is an object NOT an array
            for (var parkName in productsData) {
                if ( productsData.hasOwnProperty(parkName) ) {

                    var item = productsData[parkName]['Things to book'];

                    //delete all BE items
                    delete item['Camping / Accommodation'];
                    delete item['Diving'];
                    delete item['Snorkelling'];
                    delete item['Diving Other Sites'];
                    delete item['Vehicle Entry Fee'];
                    delete item['Tours'];
                    delete item['Tennis Courts'];
                    delete item['Facilities'];

                    // console.log( $.isEmptyObject(item) );

                    //if object is now empty, delete it
                    if ( $.isEmptyObject(item) ) {
                        delete item;
                    }
                }
            }
            console.log(productsData);
        }




        // corrects park names when they differ from BE location names
        if (typeof productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'] != 'undefined') {
            // create new object
            var newObject = ['Nullarbor National Park Wilderness Protection Area'];
            // clone old object into new object
            productsData[ newObject ] = productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'];
            // delete old object
            delete productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'];
        }

        if (typeof productsData['Munga-Thirri–Simpson Desert Conservation Park and Regional Reserve'] != 'undefined') {
             // create new object renaming em-dash to dash
            var newObject = ['Munga-Thirri-Simpson Desert Conservation Park and Regional Reserve'];
            // clone old object into new object
            productsData[ newObject ] = productsData['Munga-Thirri–Simpson Desert Conservation Park and Regional Reserve'];
            // delete old object
            delete productsData['Munga-Thirri–Simpson Desert Conservation Park and Regional Reserve'];
        }

        // if (typeof productsData['Flinders Chase National Park and Ravine Des Casoars Wilderness Protection Area'] != 'undefined') {
        //     // create new object renaming em-dash to dash
        //    var newObject = ['Flinders Chase National Park'];
        //    // clone old object into new object
        //    productsData[ newObject ] = productsData['Flinders Chase National Park and Ravine Des Casoars Wilderness Protection Area'];
        //    // delete old object
        //    delete productsData['Flinders Chase National Park and Ravine Des Casoars Wilderness Protection Area'];
        // }


        aAllLocations = Object.keys(productsData).sort();
        urlHash = location.hash.replace(/^#/, '').trim();
        hideProductTypes = ['tours','carhire','events','packages'];

        urlHash = decodeURI(urlHash);
        urlHash = urlHash.replace(/%2C/g, ',');
        urlHash = urlHash.replace(/–/g, ' ');

        initialIs = true;
        // console.log('initial urlHash: ' + urlHash);
        if(window.ga && ga.create) {
            ga('send', 'event', 'Booking statewide', 'initial filter', urlHash);
        }

        urlHash = urlHash.split('?')[0];  //ignore question mark and all characters after

        // fix for Nullarbor
        if(urlHash === 'Nullarbor National Park, Wilderness Protection Area and Regional Reserve') {
            urlHash = 'Nullarbor National Park Wilderness Protection Area';
        }
        // else // fix for Simpson Desert, possibly not needed?
        // if (urlHash === 'Munga-Thirri–Simpson Desert Conservation Park and Regional Reserve') {
        //     urlHash = 'Munga-Thirri-Simpson Desert Conservation Park and Regional Reserve';
        // }


        $(function() {

            // redirect to booking page if no hash and details in url
            if (window.location.href.indexOf('details') > -1 && urlHash == '') {
                IMUtility.redirect('http://www.parks.sa.gov.au/booking/');
            } else if (window.location.href.indexOf('details') > -1 ) {
                bShowRegionGadget = 0;
            }

            if (bShowRegionGadget) {
                initRegionGadget();     // initialise region gadget
            }


            // autocomplete funciton to search for parks
            $('#location-selector__input').autocomplete({
                lookup: aAllLocations, // list to display
                onSelect: function(suggestion) {
                    window.location.hash = urlHash = $(this).val(); // update urlHash
                    $('.location-selector__clear').show();
                    $('.location-selector__input').addClass('filled');
                },
                minChars: 0,
                autoSelectFirst: true,
                appendTo: $('.location-selector'),
                maxHeight: 294,
                onSearchStart: function () {
                    $('#location-selector .autocomplete-suggestions').slideDown(300);
                }
            });

            if ($('.location-selector__input').val() !== '') {
                $('.location-selector__clear').show();
                $('.location-selector__input').addClass('filled');
            } else {
                $('.location-selector__clear').hide();
                $('.location-selector__input').removeClass('filled');
            }

            // clear the input field and show all
            $('.location-selector__clear').click(function(e) {
                e.preventDefault();
                window.location.hash = urlHash = "";
                $('.location-selector__input').val('');
                $('.location-selector__input').removeClass('filled');
                $(this).hide();
            });

            $('.location-selector__input').click(function(e) {
                e.preventDefault();
                $(this).val('');
            });


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

    if (urlHash !== '-All-') {
        $('.location-selector__input').val(urlHash);
    }

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

            if (val === true) {

                if (key == 'Camping / Accommodation') {
                    hasAccomodation = true;
                }

                //we don't need to display camping button if we are already looking at camping
                //also don't display 'School Bookings' anymore as there is now a generic school booking form.
                //BUT do display 'School Bookings' for Belair National Park.
                if ( (key !== 'Camping / Accommodation' && key !== 'School Bookings') || (key !== 'Camping / Accommodation' && urlHash == 'Belair National Park')) {
                    // console.log('key: ', key);

                    var page = '';

                    // fix typos e.g. Innes Vehicle Entry. /booking/vehicle-entry-fees
                    if (key == 'Vehicle Entry Fee') {
                        key = 'Vehicle Entry Fees';
                    }

                    // convert page name to kebab case
                    page = (key.replace(/ /g , '-')).toLowerCase();

                    // alter URL for Commercial Tour Operator Bookings
                    if ( key.toLowerCase().search(/commercial tour operator bookings/) != -1 ) {
                        page = 'cto-bookings';
                    }

                    //rename Park of the Month event button
                    if (key == 'Park of the Month event') {
                        page = 'potm-event';
                    }

                    // assemble URLs
                    if (urlHash == 'Cleland Wildlife Park') {
                        bookingURL = 'http://www.clelandwildlifepark.sa.gov.au/plan-your-visit/buy-tickets';
                    } else if (urlHash == 'Naracoorte Caves National Park') {
                        bookingURL = '//www.naracoortecaves.sa.gov.au/plan-your-visit/buy-tickets';
                    } else if (urlHash == 'Cape Borda Lightstation') {
                        bookingURL = 'https://environmentsa.rezdy.com/412198/cape-borda-lightstation-self-guided-tour';
                    } else {
                        bookingURL = productsData[urlHash].url + '/' + page;
                    }
                    // console.log(bookingURL);

                    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                        bookingURL += '.html';
                    }

                    $('.button-list').append($('<a href="'+ bookingURL + '"><span>' +key+ '</span></a>').addClass('button-list__button '+key).attr('data', key));
                    $('.'+key).click(  function(){ typeShow('tours'); }  );
                }

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

    //last minute location rename
    if (aFilteredLocations == 'Bool Lagoon Game Reserve and Hacks Lagoon Conservation Park') {
        aFilteredLocations = ['Bool Lagoon Game Reserve'];
    } else
    if (aFilteredLocations == 'Cape Gantheaume Conservation Park and Wilderness Protection Area') {
        aFilteredLocations = ['Cape Gantheaume Conservation Park and Wilderness P'];
    } else
    if (aFilteredLocations == 'Danggali Conservation Park and Wilderness Protection Area') {
        aFilteredLocations = ['Danggali Conservation Park and Wilderness Protecti'];
    } else
    if (aFilteredLocations == 'The Dutchmans Stern Conservation Park') {
        aFilteredLocations = ['Dutchmans Stern Conservation Park'];
    } else
    if (aFilteredLocations == 'Flinders Chase National Park and Ravine Des Casoars Wilderness Protection Area') {
        aFilteredLocations = ['Flinders Chase National Park'];
    } else
    if (aFilteredLocations == 'Loch Luna and Moorook Game Reserves') {
        aFilteredLocations = ['Loch Luna and Moorook Game Reserve'];
    }

    // console.log('be aFilteredLocations: ', aFilteredLocations);

    cleanGoogleMaps();

    if (initialIs == false) {
        // console.log('url hash: ' + urlHash);
        if(window.ga && ga.create) {
            ga('send', 'event', 'Booking statewide', 'filter chosen', urlHash );
        }
        initialIs = true;
    } else {
        // console.log('change initial to false');
        initialIs = false;
    }


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
        // BE.gadget.region.text.bookNow = "Book Now From ";
        BE.gadget.region.text.refineByName = "Find by site name "

        BE.gadget.region('#bookeasy__region-gadget', {
            accomOnlyMode: true, // only display accommodation
            collapseRefineTools: true,
            customMapIcons: {
                'accom': {
                    // BookEasy doesn't support SVG icon for IE
                    icon: '//www.parks.sa.gov.au/files/templates/00000000-0000-0000-0000-000000000000/219e8335-7a56-482d-9f78-7b3f16068846/npsa-marker-general.png',
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
            showCentsInPrices: true,  // showRefineTools: true,
            showList: false, // hide details tab
            disabledTypes: hideProductTypes,
            showLocationFilter: false, //doesn't actually hide the filter, just the options.
            // showFacilitiesFilter: true,
            // showRefineTools: false,  //defaultSort wont' work if false!
            showRoomDetails: true,          // REQUIRED TO DISPLAY FULL DESCRIPTIONS (Business Details)
            showRoomDetailsInline: true,    // REQUIRED TO DISPLAY FULL DESCRIPTIONS (Business Details)
            descriptionHover: true,         // REQUIRED TO DISPLAY FULL DESCRIPTIONS (Business Details)
            showHoverInline: true,          // REQUIRED TO DISPLAY FULL DESCRIPTIONS (Business Details)
            collapseRefineTools:false,  //
            googleMapsKey: 'AIzaSyAmYsDEmwvwVbQJ9WbSp_iJ4JOkBB-PKn8', // uses DEW 'JavaScript API key' key
            vcID: 188
        });

    } else {
        // empty container

        if (bookingsDisabled == true) {

            $('#bookeasy__region-gadget').html('<h3>Our bookings system is currently unavailable. Please check back later. <br>Sorry for the inconvenience.</h3>');

        } else {

            $('#bookeasy__region-gadget').html('<p>Camping and accommodation is not available in this park.</p>');
            if (urlHash) {
                if (urlHash.indexOf('Piccaninnie') !== -1) {
                    $('.booking__early-text').html('');
                    var $newDiv = $( '<div class="booking__early-text"><p>You will need to enter an indemnity form receipt number at the time of booking. Diving and snorkelling equipment and wetsuits are not provided, you will need to either bring your own equipment/wetsuits or hire it.</p><p>Fees apply to these self-guided activities.</p><p>Please fill out a <a class="link" style="text-decoration: underline;" href="//www.parks.sa.gov.au/Find_a_Park/Browse_by_region/Limestone_Coast/piccaninnie-ponds-conservation-park/booking/diving/diving-indemnity-form" target="_blank">diving indemnity form</a> or a <a class="link" style="text-decoration: underline;" href="//www.parks.sa.gov.au/Find_a_Park/Browse_by_region/Limestone_Coast/piccaninnie-ponds-conservation-park/booking/snorkelling/snorkelling-indemnity-form" target="_blank">snorkelling indemnity form</a> for each person diving/snorkelling prior to making the booking.</p><p>Camping and accommodation is not available in this park.</p></div>' );
                    $('.location-selector').after($newDiv);
                    $('#bookeasy__region-gadget').html('');
                } else if (urlHash.indexOf('Brookfield') !== -1) {
                    $('.booking__early-text').html('');
                    var $newDiv = $( '<div class="booking__early-text"><p>The Science camp is only available for groups undertaking DEW approved science, education or volunteer activities.</p></div>' );
                    $('.location-selector').after($newDiv);
                    $('#bookeasy__region-gadget').html('');
                } else if (urlHash.indexOf('Simpson Desert') !== -1) {
                    var texthtml = '<div class="booking__early-text"><p>It is mandatory to <a href="https://www.parks.sa.gov.au/book-and-pay/parks-passes/park-passes-online">buy a Desert Park Pass</a> to enter and camp in this park. A Desert Parks Pass gets you unlimited vehicle entry and camping to this park, for 12 months.</p></div>';
                    $('.booking__early-text').html('');
                    var $newDiv = $( texthtml );
                    $('.location-selector').after($newDiv);
                    $('#bookeasy__region-gadget').html('');
                } else if (urlHash.indexOf('Naracoorte Caves') !== -1) {
                    var texthtml = '<div class="booking__early-text"><p>Entry, tours, camping and accommodation are available for this park and can be bought via the button below.</p></div>';
                    $('.booking__early-text').html('');
                    var $newDiv = $( texthtml );
                    $('.location-selector').after($newDiv);
                    $('#bookeasy__region-gadget').html('');
                }
            }


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



