$w(function() {

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
        defaultSort: 'name', // or location
        period: 1, // number of days to display
        defaultDaysFromToday: 1, // tomorrows date
        itemDetailPageURL: './details-gadget.html',
        showAllAccom: true, // show all, even if unavailable for time period
        showList: false, // hide details tab
        // disabledTypes: ['carhire','events','tours','packages'],
        showLocationFilter: false,
        showRefineTools: false,
        vcID: 188
    });
});
