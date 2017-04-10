/**
 * This code uses the json data generated by [Parks DLV BookEasy data] in the CMS.
 * This will initialise the BE region-gadget and create buttons beneath the
 * location-selector.
 **/

if (typeof productsData !== 'undefined') {

    if (typeof productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'] != 'undefined') {
        //create new object
        var newObject = ['Nullarbor National Park Wilderness Protection Area'];
        //clone old object into new object
        productsData[ newObject ] = productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'];
        //delete old object
        delete productsData['Nullarbor National Park, Wilderness Protection Area and Regional Reserve'];
    }

    var aAllLocations = Object.keys(productsData).sort();
    var aFilteredLocations = []; // contains an array of locations to show in region gadget
    var urlHash = location.hash.replace(/^#/, '').trim();
    var hideProductTypes = ['tours','carhire','events','packages'];
    var bShowRegionGadget = 1;

    urlHash = urlHash.replace(/%20/g, ' ');

    // fix for Nullarbor
    if(urlHash === 'Nullarbor National Park, Wilderness Protection Area and Regional Reserve') {
        urlHash = 'Nullarbor National Park Wilderness Protection Area';
    }


    $(function() {

        // redirect to booking page if no hash and details in url
        if (window.location.href.indexOf('details') > -1 && urlHash == '') {
            IMUtility.redirect('http://www.environment.sa.gov.au/parks/booking/')
        } else if (window.location.href.indexOf('details') > -1 ) {
            bShowRegionGadget = 0;
        }

        if (bShowRegionGadget) {
            initRegionGadget(); // initialise region gadget
        }


        // change location to display
        $('.location-selector__select').on('change', function() {
            // set location hash to selected location
            window.location.hash = urlHash = $(this).val();
        });


        $('.be-fancybox').fancybox();

    });


    $(window).bind('hashchange', function() {

        aFilteredLocations = getFilteredLocations(); // get currently selected location
        bookeasy(); // re-load bookeasy gadget

    });


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

        var bookingDate = new Date();
        var detailPageURL = './booking/details';

        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            detailPageURL = './details-gadget.html';
        }

        hasAccomodation = displayProductsData();

        bookingDate.setDate(bookingDate.getDate() + 1);

        // only load gadget for those with camping / accomodation
        if (hasAccomodation) {
            BE.gadget.region('#bookeasy__region-gadget', {
                accomOnlyMode: true, // only display accommodation
                adults: 1,
                collapseRefineTools: true,
                customMapIcons: {
                    'accom': {
                        icon: '//www.environment.sa.gov.au/assets/images/svg/npsa-marker-general.svg',
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
                showRefineTools: false,
                vcID: 188
            });
        } else {
            // empty container
            $('#bookeasy__region-gadget').html('<p>Camping and accommodation is not available in this park.</p>');
            if (urlHash && (urlHash.indexOf('Piccaninnie') !== -1)) {
                $('#bookeasy__region-gadget').html('<p>Your will need to enter an indemnity form receipt number at the time of booking. Please fill out an <a class="link" style="text-decoration: underline;" href="//www.environment.sa.gov.au/parks/Find_a_Park/Browse_by_region/Limestone_Coast/piccaninnie-ponds-conservation-park/booking/snorkelling/snorkelling-indemnity-form" target="_blank">indemnity form</a> for each person diving/snorkelling prior to making the booking.</p><p>Camping and accommodation is not available in this park.</p>');
            }
        }

    }

    function cleanGoogleMaps(callback) {

        $('.gm-style .gm-style-mtc label,.gm-style .gm-style-mtc div').remove();
        $('.gm-style-pbc').remove();
        $('LINK[href*="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700"]').remove();

        $('script[type*=javascript]').filter(function() {
            if (window.google !== undefined && google.maps !== undefined) {
                delete google.maps;
                $('script').each(function () {
                    if (this.src.indexOf('googleapis.com/maps') >= 0
                        || this.src.indexOf('maps.gstatic.com') >= 0
                        || this.src.indexOf('earthbuilder.googleapis.com') >= 0) {

                        $(this).remove();
                    }
                });
            }
        });

        callback();
    }

} else {
    console.log('Missing data!');
}
