$(function() {
    // override cart text labels
    BE.gadget.cart.text.labels.tours.date = 'Date';  //for VE popup
    BE.gadget.cart.text.labels.accom.date = 'Arrival';  //for Accom popup
    BE.gadget.cart.text.labels.accom.out = 'Departure';

    // load card gadget
    BE.gadget.cart('#bookeasy__cart-gadget', {
        autoCollapse: true,
        bookingURL: 'https://payments.environment.sa.gov.au',
        overlaySettings: {
            height: false,
            innerBackground: '#fff',
            overlayColour: '#000',
            overlayOpacity: 0.75,
            useBlockout: true,
            width: 1000,
            zIndexLowest: 1000000
        },
        vcID: '188',
    });

});
