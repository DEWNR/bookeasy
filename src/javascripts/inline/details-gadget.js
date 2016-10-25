if (bookeasyType == null) {
    var bookeasyType = 'accom'
}

if (operatorID == null) {
    var operatorID = '73176'
}

$(function() {

    getOperatorData(operatorID);

    // load details gadget
    BE.gadget.details('#bookeasy__details-gadget', {
        defaultDate: new Date(),
        descriptionHover: true,
        period: 1,
        productID: operatorID,
        showHoverInline: true,
        showQuantity: false,
        thumbsInGrid: true,
        type: bookeasyType,
        vcID: 188
    });

    $('.be-fancybox').fancybox();

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

            console.log(data[0]);

            backURL = '/#' + data[0].Location;

            if(data[0].IsTourManager == true) {

                // add location title
                $('#content').prepend('<h1>' + data[0].Location + '</h1>');

            } else {
                // add location title
                $('#content').prepend('<h1>' + data[0].Location + '</h1><p class="">' + data[0].TradingName + '</p>');
            }

            // add back button
            $('#bookeasy__details-gadget').before('<div class="button-list"><a class="button-list__button button-list__button--back" href="' + backURL + '">Back</a></div>');

            // insert t&c information
            $('#bookeasy__conditions').html('<h3>Terms and conditions</h3>' + text2HTML(data[0].CancellationPolicy));

        }

    })

}
