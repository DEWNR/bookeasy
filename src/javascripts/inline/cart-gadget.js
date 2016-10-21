$(function() {

    // load card gadget
    BE.gadget.cart('#bookeasy__cart-gadget', {
        autoCollapse: true,
        bookingURL: './checkout.html',
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
