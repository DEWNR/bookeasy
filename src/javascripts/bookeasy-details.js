var bAllowBookings = true;
var bookeasyData = {};
var bookeasyType = 'accom'; // defaults to accomodation
var bookingDate = new Date(); // get today's date
var operatorIDs = productID = [67320]; // set operatorIDs to display
var operatorIDString = operatorIDs.join(); // create a string for the JSONP request
var operatorPageType = 'accomodation'; // type of operator

if (operatorPageType == 'tours') {
    bookeasyType = 'tours';
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
