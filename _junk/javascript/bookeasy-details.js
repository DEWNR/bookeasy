var bAllowBookings = true;
var bookeasyData = {};
var bookeasyType = 'accom'; // defaults to accomodation
var bookingDate = new Date(); // get today's date
var operatorIDs = [65726]; // set operatorIDs to display
var operatorIDString = productID = operatorIDs.join(); // create a string for the JSONP request
var operatorPageType = 'tours'; // type of operator
var aUrlHash = location.hash.replace(/^#/, '').trim().split('/');
var aRoomData = [];


if(aUrlHash.length == 3) {
    operatorIDs = productID = [Number(aUrlHash[2])];
    operatorIDString = operatorIDs.join();
    bookeasyType = aUrlHash[1];
}

if (operatorPageType == 'tours') {
    bookeasyType = 'tours';
    productID = '65726';
}

if (operatorPageType == 'events') {
    bookeasyType = 'events';
    productID = '65726';
}

$(function() {

    aRoomData = getRoomData();
    getOperatorData();

    // load details gadget
    BE.gadget.details('#bookeasy__details-gadget', {
        defaultDate: bookingDate,
        descriptionHover: true,
        period: 1,
        productID: productID,
        showHoverInline: true,
        showQuantity: false,
        thumbsInGrid: true,
        type: bookeasyType,
        showAllAccom: true,
        showAllTours: true,
        showAllEvents: true,
        noObservers: 0,
        vcID: 188
    });

});


function getOperatorData() {

    $.ajax({
        url: '//sjp.impartmedia.com/be/getOperatorsDetailsShort?q=188&operators=' + operatorIDString,
        cache: true,
        dataType: 'jsonp',
        jsonpCallback: 'jQueryOperatorsInformation'
    })
    .done(function(data) {

        if (data.length) {

            // insert t&c information
            var cancellationPolicy = data[0].CancellationPolicy;

            if(aUrlHash.length == 3) {
                $('#content h1').append(' - ' + data[0].Location);
            }

            $('#content h1').after('<div class="button-list"><a class="button-list__button button-list__button--back" href="#">Back</a>')

            $('.button-list__button--back').on('click', function(event){
                window.history.back();

                event.preventDefault();
            });

            $('#bookeasy__conditions').html('<h3>Terms and conditions</h3>' + text2HTML(cancellationPolicy));
        }

    })

}


function getRoomData() {

    aTemp = [];

    $.ajax({
        url: '//sjp.impartmedia.com/be/getAccomRoomsDetails?q=188&operators=' + operatorIDString,
        cache: true,
        dataType: 'jsonp',
        jsonpCallback: 'jQueryRoomInformation'
    })
    .done(function(data) {

        if (data.length) {

            // loop over data, replace
            aRooms = data[0].Rooms;

            for (i = 0; i < aRooms.length; i++) {

                aTemp[aRooms[i].Name.trim()] = aRooms[i].Description;

            }

        }

    })

    return aTemp;

}


function text2HTML(input) {

    input = input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\//g, '/');
    input = input.replace(/\r/g, '').replace(/\n( )*?(\n)*?( )*?$/, '').replace(/\n( )*?\n/g, '</p><p>').replace(/\n/g, '<br />');
    input = '<p>'+input+'</p>';

    return input;

}


$w(function() {
  BE.gadget.cart("#toolbar-cart", {
    vcID:"188",
    bookingURL:"https://www.environment.sa.gov.au/parks/checkout",
    autoCollapse:true
  });
});