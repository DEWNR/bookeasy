$(function() {

    var bookingDate = new Date();

    bookingDate.setDate(bookingDate.getDate() + 1);

    BE.gadget.region('#bookeasy__region-gadget', {
        accomOnlyMode: true, // only display accommodation
        adults: 1,
        collapseRefineTools: true,
        customMapIcons: {
            'accom': {
                icon: '//www.environment.sa.gov.au/files/templates/00000000-0000-0000-0000-000000000000/219e8335-7a56-482d-9f78-7b3f16068846/npsa-marker-general.png',
                pinpoint: [13,45],
                size: [26,45]
            }
        },
        defaultDate: bookingDate,
        defaultSort: 'name', // or location
        itemDetailPageURL: './details-gadget.html',
        period: 1, // number of days to display
        showAllAccom: true, // show all, even if unavailable for time period
        showList: false, // hide details tab
        // disabledTypes: ['carhire','events','tours','packages'],
        showLocationFilter: false,
        showRefineTools: false,
        vcID: 188
    });

    $('.be-fancybox').fancybox();

});
