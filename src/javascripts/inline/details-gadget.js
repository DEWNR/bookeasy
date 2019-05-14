// Some variables are defined in the page template of "BookEasy booking page (advanced)" content type
// var dcTitle  -- no longer used
// var bookeasyType
// var operatorID
var bShowGadget = 1;
// details gadget defaults
var numberInfants = 45;
var numberConcessions = 45;

if(window.location.hash) {
    var aHash = window.location.hash.slice(1).split('/');
    var sType = aHash[1];
    var aValidTypes = ['accom','tours','events','carhire','packages'];

    if(aHash.length && $.inArray( sType, aValidTypes) !== -1) {

        var operatorIDregex = /^\d{5}$/;
        var xDays = 1;

        // check if operatorID is 5 digits
        if (operatorIDregex.test(aHash[2])) {

            bookeasyType = sType;
            operatorID = aHash[2];

        }

        if (bookeasyType == 'accom') {
            xDays = 3;
        }

    }

}

if(window.location.pathname.toLowerCase().match('piccaninnie')) {  // if piccaninnie
    numberInfants = 0;
    numberConcessions = 4;      // max number of concessions possible
}


if(typeof bookeasyType == 'undefined' || typeof operatorID == 'undefined') {
    bShowGadget = 0;
}


$(function() {

    if(bShowGadget) {

        getOperatorData(operatorID);

        // load details gadget
        BE.gadget.details('#bookeasy__details-gadget', {
            defaultDate: new Date(),
            descriptionHover: true,
            period: xDays,
            productID: operatorID,
            showHoverInline: true,
            showQuantity: false,
            thumbsInGrid: true,
            type: bookeasyType,
            showAllAccom: true,
            showAllTours: true,
            showAllEvents: true,
            noInfants: numberInfants,
            noConcessions: numberConcessions,

            vcID: 188
        });


        //add type as a class so we can apply styles
        if ( $('html').hasClass('is-'+bookeasyType) ) {
            $('html').removeClass('is-'+bookeasyType);
        }
        $('html').addClass('is-'+bookeasyType);
        // console.log('added bookeasyType class.');

    }

});





function getOperatorData(id) {

    $.ajax({
        url: '//sjp.impartmedia.com/be/getOperatorsDetailsShort?q=188&operators=' + id,
        cache: true,
        dataType: 'jsonp',
        jsonpCallback: 'jQueryOperatorsInformation'
    })
    .done(function(data) {

        var backURL = '#';

        if (data.length) {

            // console.log(data[0]);
            // This code needs refactoring
            if(data[0].Location == undefined) {
                console.log('BE Location not set');
                backLocation = 'Location';
            } else {
                backLocation = data[0].Location; //fall back
            }

            if (backLocation === 'Bool Lagoon Game Reserve') {
                backLocation = 'Bool Lagoon Game Reserve and Hacks Lagoon Conservation Park';
            }

            if (backLocation === 'Cape Gantheaume Conservation Park and Wilderness P') {
                backLocation = 'Cape Gantheaume Conservation Park and Wilderness Protection Area';
            }

            if (backLocation === 'Flinders Chase National Park') {
                backLocation = 'Flinders Chase National Park and Ravine Des Casoars Wilderness Protection Area';
            }

            backURL = '/booking#' + backLocation;
            // backURL = '/#' + backLocation;

            if(data[0].IsTourManager == true) {

                if(operatorID == '81657') {
                    // If Parks Passes page use appropriate title and back URL
                    // $('#bookeasy__details-gadget').before('<div class="location-header"><h1>' + dcTitle + '</h1></div>');
                    backURL = '/booking';
                } else {
                    // add location title
                    $('#bookeasy__details-gadget').before('<div class="location-header"><h1>' + backLocation + '</h1></div>');
                }


            } else {
                // add location title
                $('#bookeasy__details-gadget').before('<div class="location-header"><h1>' + backLocation + '</h1><h2 class="location-name">' + data[0].TradingName + '</h2></div>');
            }


            // if(data[0].Description.length > 0) {
            //     // insert description
            //     $('.location-header').append('<div class="location-description"><p>' + data[0].Description + '</p></div>');
            // }

            var importantnotice = '';

            // Display notice 1/2 start
            if ( operatorID === '90927') {  //if Para Wirra (POTM) then display this notice
                importantnotice = '<div style="width: 70%;" class="park-alerts__detail  park-alerts__detail--active"><button type="button" class="park-alerts__close js-click-close-notice"></button><h2 class="color--warning">Notice!</h2><p>Para Wirra Conservation Park is our Park of the Month for May. To celebrate we are offering FREE vehicle entry for the entire month of May. If you are visiting during May you do not need to purchase a vehicle entry permit to enter the park.<br><a href="https://www.parks.sa.gov.au/booking#Para%20Wirra%20Conservation%20Park">Back&nbsp;&gt;</a></p></div>'
                //importantnotice = '<p class="park-alerts__box">Para Wirra Conservation Park is our Park of the Month for May. To celebrate we are offering FREE vehicle entry for the entire month of May. If you are visiting during May you do not need to purchase a vehicle entry permit to enter the park.<p>';
            }
            // Display notice 1/2 end

            // add back button
            $('#bookeasy__details-gadget').before('<div class="button-list"><a class="button-list__button button-list__button--back" href="' + backURL + '">Back</a></div>' + importantnotice);

            // Display notice 2/2 start
            if ( operatorID === '90927') {  //if Para Wirra (POTM) enable close function
                console.log('here1');
                $('.js-click-close-notice').on('click', function(e) {
                    console.log('here1');
                    $(this).parent().removeClass('park-alerts__detail--active');

                    e.preventDefault();

                    return false;
                });
            }
            // Display notice 2/2 end

            // insert t&c information
            $('#bookeasy__conditions').html('<h3>Terms and conditions</h3>' + text2HTML(data[0].CancellationPolicy));

        } else {
            console.log('error requesting getOperatorsDetailsShort data')
        }

    });

}
