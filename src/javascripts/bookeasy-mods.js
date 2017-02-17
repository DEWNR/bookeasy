var resizeTimer;
var windowWidth = $(window).width();
var isMobile = false;
var isAccom = false;
var selectedDays = 1;

$(document).on('gadget.script.loaded', function() {

    // watch gadget.js 'grid.rendered', do this when fired.
    $w.event.subscribe('grid.rendered', function() {

        // should only be in here while viewing details-gadget

        // 1. check if mobile device
        isMobile = windowWidth < 767 ? true : false;

        // 2. check if accomodation
        if($('html').hasClass('is-accom')) {
            isAccom = true;
        }

        // 3. get days selected
        selectedDays = getDaysSelected();

        if(isMobile) {
            //
        }

        console.log('isMobile ' + isMobile);
        console.log('isAccom ' + isAccom);
        console.log('selectedDays ' + selectedDays);

        // loop over each grid row
        $('.im-grid table tbody .name').IMElementExists(function() {

            // load hi-res image

        });

        // 4. apply classes for screen size/product type

        // 5. Add listeners to watch select box changes

            // 5.a set global variable to days selected

            // 5.b init custom gridview markup (based on 1, 2, 4.a)

            // 5.c on change re-draw gridview markup


    });

});





function getDaysSelected() {
    var sReturn = 1;

    if (typeof variable === 'undefined') {
        sReturn = $('thead>tr>td.date').length;
    }

    return sReturn
}





// done resizing event
// $(window).on('resize', function(e) {
//
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(function() {
//
//     // resizing as stopped, do things!
//     windowWidth = $(window).width();
//
//   }, 250);
//
// });
