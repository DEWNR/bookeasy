$(function() {
    var locationFilter = ['Deep Creek Conservation Park', ''];
    var bookingDate = new Date();

    locationFilter.pop(); // Remove the last item from the array as it is empty
    bookingDate.setDate(bookingDate.getDate() + 1);

    BE.gadget.region('#bookeasy__region-gadget', {
        adults: 1,
        accomOnlyMode: true,
        collapseRefineTools: true,
        customMapIcons: {
            'accom': {
                icon: '//www.environment.sa.gov.au/files/templates/00000000-0000-0000-0000-000000000000/c16a6c2a-2cdc-4f08-96b9-f1c11eb6f349/npsa-marker-general.png',
                pinpoint: [13,45],
                size: [26,45]
            }
        },
        defaultDate: bookingDate,
        defaultSort: 'name',
        enableRegionSearch: false,
        forceAccomType: '',
        ignoreSearchCookie: true,
        itemDetailPageURL: './details-gadget.html',
        limitLocations: locationFilter,
        period: 1,
        showAllAccom: true,
        showList: false,
        showLocationFilter: false,
        vcID: 188
    });
});
