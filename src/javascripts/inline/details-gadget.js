$(function() {

    var bookeasyType = 'accom';
    var operatorID = '73176'

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

});





function getOperatorData(id) {

    $.ajax({
        url: '//sjp.impartmedia.com/be/getOperatorsDetailsShort?q=188&operators=' + id,
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
