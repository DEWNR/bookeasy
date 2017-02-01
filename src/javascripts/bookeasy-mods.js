console.log('MODS');
    var detailsFirstRun = true;
    var toolbar_date = '';
    var toolbar_period = 0;
    var toolbar_adults = 0;
    var toolbar_children = 0;
    var toolbar_infants = 0;

IMUtility.detailsGadgetGridRendered = false;

$(document).on('gadget.script.loaded', function() {

    // IMUtility.pushDetailsGadgetLoadedEvent();  //test
    // IMUtility.pushDetailsGadgetChangedEvent();  //test

    $w.event.subscribe('grid.rendered', function() {

        // Do not run this event handler more than once
        if (IMUtility.detailsGadgetGridRendered) return true;
        IMUtility.detailsGadgetGridRendered = true;


        $('.im-grid table tbody>tr:first-child td.name').IMElementExists(function() {  // a.more
            // Wait for room details link insertion before moving the row data
            insertImages('details');

        });

        console.log('gadget.script.loaded wwww');
        detailsFirstRun = true;
        toolbar_date = '';
        toolbar_period = 0;
        toolbar_adults = 0;
        toolbar_children = 0;
        toolbar_infants = 0;
        firstRunCheck();  //run tests on page for mobile and columns setup

    });


    IMUtility.pushRegionGadgetLoadedEvent();
    IMUtility.pushRegionGadgetChangedEvent();

    $w.event.subscribe('region.refinetools.built', function() {

        if (($('.tabs-group').size() > 0) && ($('.gadget__region-tabs').size() > 0)) {
            $('.gadget__region-tabs').remove();
        }

        $('.tabs-group').addClass('gadget__region-tabs').removeClass('tabs-group');
    });

    $w.event.subscribe('region.gadget.built', function() {
        $('.prices-grid td.date').addClass('hidden-xs');

        insertImages('region');



        // read campgroundData and organise into oMaps
        var oMaps = [];

        $.each(campgroundData, function(key, value) {

            if ( key.indexOf(',') != -1 ){
                
                var aIDs = key.split(',');

                $.each(aIDs, function(i) {
                    oMaps[aIDs[i]] = value;
                    // console.log( 'aID: '+aIDs[i] );
                });

            }
            else {
                oMaps[key] = value;
            }
        });



        // show pdf map link for appropriate campsite
        jQuery('.im-grid tr.odd, .im-grid tr.even').each(function() {

            jQuery(this).find('td.property').append('<div class="clear"></div>');

            sOberatorID = jQuery(this).attr('id').replace('Operator', '');


            // read oMaps and find a match for current operator
            if (typeof oMaps[sOberatorID] !== 'undefined' && oMaps[sOberatorID].length) {
                jQuery(this).find('td.property').append('<a class="map-link" href="http://environment.sa.gov.au' + oMaps[sOberatorID] + '" download="filename">View map <span>(pdf)</span></a>');
            }


            // setup fancybox
            thumbImage = jQuery(this).find('.thumb img');
            imagePath = thumbImage.attr('rel').replace('thumbs/461', 'images');

            thumbImage.wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + jQuery(this).find('.name').text() + '"></a>')

        });

        // detect mobile view classes
          // breakpoint-maximum breakpoint-large breakpoint-medium
        if ( $( window ).width() < 767 ) {
            $('html').addClass('mobile');
            createPricetable();
        } else {
            $('html').removeClass('mobile');
        }
        
        if ( $('thead>tr>td.date').length > 5 ) {
            if ( !$('html').hasClass('manyCols') )
            $('html').addClass('manyCols');
        } else {
            if ( $('html').hasClass('manyCols') )
            $('html').removeClass('manyCols');
        }

    });

});



function insertImages(gadget) {
    var thumbCount = 0;

    $('.im-grid tbody tr').each(function() {

        if ($(this).find('td.name div.thumb').size()) {

            // Move thumb to its own column & add fancybox
            $thumbImage = $(this).find('.thumb > img');
            imagePath = $thumbImage.attr('rel');

            thumbCount = thumbCount + 1;

            $thumbImage.attr('src', imagePath).wrap('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + $(this).find('a:not([class])').text() + '"></a>');


        } else if ($(this).find('div.thumb').size()) {

            // Move thumb to its own column & add fancybox
            $thumbImage = $(this).find('.thumb > img');
            imagePath = $thumbImage.attr('rel').replace('thumbs/461', 'images');

            thumbCount = thumbCount + 1;

            $(this).find('div.thumb').append('<a class="be-fancybox" href="' + imagePath + '" rel="gallery" title="' + $(this).find('a.name').text() + '"><img src="' + imagePath + '" /></a>');
            $(this).find('div.thumb > img').hide();

        } else {
            $(this).addClass('no-image');
        }

    });

    if (thumbCount == 0) {
        // remove header thumb

        $('.im-grid thead tr td.thumb').remove();
    }
}




// $(document).ready(function() {

//     setTimeout(
//         function() 
//         {
//             console.log('document ready (after 6 seconds).');
//             myTimer(); 
//         }, 6000);
    
// });



// waits for im-grid to be mostly rendered
function myTimer() {
    console.log('myTimer');

    setTimeout(
        function() 
        {
            if ( !$('.im-grid table tbody .name') ) {
                console.log('element NOT detected! waiting..');
                setTimeout();
            }
            // console.log('load listeners');
            // myListeners();
            
            return firstRunCheck();
            
        }, 250);

}


// function getInput(options, callback) {
//     allUserData.push(options);

//     // Make sure the callback is a function​
//     if (typeof callback === "function") {
//     // Call it, since we have confirmed it is callable​
//         callback(options);
//     }
// }


//wait for table to match "nights" select
function nightsTimeout() {
    console.log('nightsTimeout');

    setTimeout(function() {
        console.log('row length: '+ $('thead>tr>td.date').length);
        console.log('period: ' +toolbar_period);
        if ( $('thead>tr>td.date').length != toolbar_period ) {
            //console.log('nights dont match, waiting..');
            nightsTimeout();
        }
        else {
            //console.log('continue');
            return detailsPageTests();
        }
    }, 250);
}


function firstRunCheck() {
    console.log('firstRunCheck');

    if ( detailsFirstRun === false ) {
        nightsTimeout();
    } else {
        console.log('is first run');
        detailsFirstRun = false;
        toolbar_period = $('.period .input select').value;
        myListeners();
    }
    //console.log('herezz1');
    detailsPageTests();
}

function detailsPageTests() {
    console.log('detailsPageTests');

    if ( $( window ).width() < 767 ) {  //test mobile
        $('html').addClass('mobile');
        if ( $('html').hasClass('is-accom') ) { //only run for accom.
            createPricetable();
        }    
    } else {
        $('html').removeClass('mobile');
    }
    
    if ( $('thead>tr>td.date').length > 5 ) {  //test number of Columns
        if ( !$('html').hasClass('manyCols') ) {
            $('html').addClass('manyCols');
        }
    } else {
        if ( $('html').hasClass('manyCols') ) {
            $('html').removeClass('manyCols');
        }
    }
    //console.log('herezz2');
}


function myListeners() {
    console.log('myListeners');

    //watch Date input
    $('.date .input .pseudo').on('change', function() {
        toolbar_date = this.text();
        console.log( this.text() );
        myTimer();
    });

    //watch Nights input
    $('.period .input select').on('change', function() {
        toolbar_period = this.value;
        console.log( this.value );
        myTimer();
    });

    //watch Adults input
    $('.adults .input select').on('change', function() {
        toolbar_adults = this.value;
        console.log( this.value );
        myTimer();
    });

    //watch Children input
    $('.children .input select').on('change', function() {
        toolbar_children = this.value;
        console.log( this.value );
        myTimer();
    });

    //watch Infants input
    $('.infants .input select').on('change', function() {
        toolbar_infants = this.value;
        console.log( this.value );
        myTimer();
    });

}


function createPricetable() {
    console.log('createPricetable');

    //set variables
    var sTable = '#null';
    var sSpecific = '';
    //if running on region gadget
    if ( $('#bookeasy__region-gadget').length ) {
        sTable = '#bookeasy__region-gadget .region-gadget .im-grid table>tbody>tr';
        sSpecific = ' td.property';
        console.log('region-gadget');
    } else { //if running on details gadget
        sTable = '#bookeasy__details-gadget .details-gadget .im-grid table>tbody>tr';
        sSpecific = ' td.name';
        console.log('details-gadget');
    }
    var listLength = $('tbody>tr').length;
    var sSrc = '';
    var sDest = '';


    $(sTable + sSpecific).wrap('<td class="td__table"></td>').wrap('<table class="product"></table>');
    // $(sTable + ' tbody tr table.item__table').wrap('<td class="item__cell"></td>');
    $(sTable + sSpecific).attr('colspan', '2').wrap('<tr class="item__row"></tr>');
    

    $.each($(sTable), function(index) {
        // console.log( $(this).find('.product div.thumb') );
        //thumb
        sSrc = $(this).find('.product div.thumb');
        sDest = $(this).find('.product>.item__row');
        $(sSrc).insertBefore( $(sDest) ).wrap('<tr class="thumb__row"></tr>').wrap('<td class="thumb__cell" colspan=2></td>');

        //total
        sSrc = $(this).find('td.total');
        sDest = $(this).find('table.product');
        $(sSrc).appendTo( $(sDest) ).wrap('<tr class="total__row"></tr>');

        //prices
        sSrc = $(this).find('td.price');
        sDest = $(this).find('table.product');
        $(sSrc).appendTo( $(sDest) );        

        //specials
        sSrc = $(this).find('div.specials');
        sDest = $(this).find('table.product>tr.total__row');
        $(sSrc).prependTo( $(sDest) ).wrap('<td class="specials__cell"></td>');
    });


    //for each campground/product
    // for (i = 1; i < (listLength+1); i++) {
    //     //total
    //     sSrc = '#bookeasy__region-gadget .im-grid table tbody>tr:nth-of-type(' +i+ ') td.total';
    //     sDest = '.im-grid>div>table>tbody>tr:nth-of-type(' +i+ ') table.product';
    //     $(sSrc).appendTo( $(sDest) ).wrap('<tr class="total__row"></tr>');

    //     //prices
    //     sSrc = '#bookeasy__region-gadget .im-grid table tbody>tr:nth-of-type(' +i+ ') td.price';
    //     sDest = sTable + ' tbody>tr:nth-of-type(' +i+ ') table.product';
    //     $(sSrc).appendTo( $(sDest) );        

    //     //specials
    //     sSrc = '#bookeasy__region-gadget .im-grid table tbody>tr:nth-of-type(' +i+ ')>table div.specials';
    //     sDest = '.im-grid>div>table>tbody>tr:nth-of-type(' +i+ ') table.product>tr.total__row';
    //     $(sSrc).prependTo( $(sDest) ).wrap('<td class="specials__cell"></td>');
    // };

    //create product__row
    $(sTable + ' table.product>td').wrap('<tr class="product__row"></tr>');


    if ( $('#bookeasy__region-gadget').length ) {
        console.log('#bookeasy__region-gadget exists');
        //for each date
        $.each($('thead>tr>td.date'), function(index) {    
            //copy each date before price row
            $( 'thead>tr>td.date:nth-of-type(' +(index+3)+ ')' ).clone().addClass('dt').insertBefore('tr.product__row:nth-of-type(' +(index + 4)+ ')>td.price' );
        });
    } else {
        console.log('copy each date before price row');
        $.each($('thead>tr>td.date'), function(index) {    
            //copy each date before price row
            $( 'thead>tr>td.date:nth-of-type(' +(index+4)+ ')' ).clone().addClass('dt').insertBefore('tr.product__row:nth-of-type(' +(index + 4)+ ')>td.price' );
        });
    }
    $('.im-grid thead>tr').remove();
    if ( $('#bookeasy__region-gadget').length ) {
        console.log('remove');
        $('.im-grid tbody>tr.inline-header.no-image').remove();
    }

}
