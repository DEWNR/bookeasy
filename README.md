# Build tools
* run npm install
* gulp
* gulp production


# BookEasy



## BookEasy keys
*  env: 7e5893292834eb2b34cd1d9b11437df9
*  WIP: 4a65c97fcf2b568333551e22627eb45d
*  local: d5192d41822d0c987a0610af120d29bf
*  kiwt: 4ae239f9decb3716790c285af3a63221



## Browser support

The Impart Media Gadgets will not run in Internet Explorer 8 or below. Use conditional scripts (or user agent sniffing) to prevent it from trying to run in =< IE8. For example:

```html
<script>
  var unsupportedBrowser = false;
</script>
<!--[if lte IE 8]>
<script>
  var unsupportedBrowser = true;
</script>
<![endif]-->
<script src="//gadgets.impartmedia.com/gadgets.jsz?key=7e5893292834eb2b34cd1d9b11437df9"></script>
<script>
  var unsupportedBrowser;   // Declare the variable again so it's accessible in older versions of IE
  if (unsupportedBrowser) {
    // Display some sort of warning
  } else {
    // Initialise whatever gadgets you need
  };
</script>
```



## Cart gadget

**IMPORTANT:** do not include this code on the checkout page, as this will cause a conflict with the booking gadget.

```javascript
$w(function() {
  var options = {
    vcID: '188',        // Our BookEasy Visitor Centre ID
    bookingURL: 'https://www.environment.sa.gov.au/parks/checkout', // The page on which the booking gadget is hosted
    autoCollapse: true  // Display only an icon and the number of items in the cart
  };

  BE.gadget.cart('#toolbar-cart', options); // Initialise the gadget. The first parameter can be any valid CSS selector.
});
```

See [Impart Media Item Details and Cart Gadgets](https://gadgets.impartmedia.com/doc/03-details-and-cart-gadgets.html) for more information.



## Region gadget

```javascript
$w(function() {
  var locationFilter = ['Innes National Park']; // Limit the locations. Can include multiple locations so all the parks in a region can be shown
  var bookingDate = new Date();
  var options;

  bookingDate.setDate(bookingDate.getDate() + 1);   // Set the default booking date to tomorrow

  options = {
    vcID: 188,              // Our BookEasy Visitor Centre ID
    accomOnlyMode: true,    // Limit to accommodation results only. This is slightly buggy, so use in conjunction with disabledTypes
    collapseRefineTools: true,
    customMapIcons: {
      'accom': {
        icon:'//www.environment.sa.gov.au/files/templates/00000000-0000-0000-0000-000000000000/c16a6c2a-2cdc-4f08-96b9-f1c11eb6f349/npsa-marker-general.png',
        pinpoint: [13,45],
        size: [26,45]
      }
    },
    defaultDate: bookingDate,
    defaultSort: 'name',
    disabledTypes:['tours', 'events' ,'carhire', 'packages'],  // Use when displaying accommodation to prevent region gadget results being affected when tours are viewed in a different browser tab
    enableRegionSearch: false,  // Hide the regional search, as regions have not yet been configured in BookEasy
    forceAccomType: '',         // Optional. Use to limit accommodation types (eg show camping OR accommodation)
    ignoreSearchCookie: true,   // Prevent options selected on other pages from influencing search results
    limitLocations: locationFilter,
    period: 1,                  // Show one night by default, otherwise everything looks much dearer than it is
    showAllAccom: true,         // Show accommodation that's not available on the requested date
    showList: false,            // Hide extra information, as this is buggy on touchscreen devices
    showLocationFilter: false   // Optional. Hide the location filter. Remove this option when showing multiple locations
  };

  BE.gadget.region('#regionGadget', options);   // Initialise the gadget. The first parameter can be any valid CSS selector.
});
```

See [Impart Media Region Gadget](https://gadgets.impartmedia.com/doc/02-region-gadget.html) for more information.



## Item details gadget

The details gadget is the most heavily customised gadget. It is currently intialised by the bookeasy.details.js file, but this process is cumbersome, and updating gadget settings is difficult.

It is recommended that the details gadget initialisation code is moved into the HTML template for easier maintenance. Note that on some pages it is necessary to reinitialise the gadget, so this code should be included with the initialisation code. For example:

```javascript
$w(function() {
  var bookingDate = new Date();
  var options;

  if (operatorPageType !== 'tours') {
    bookingDate.setDate(bookingDate.getDate() + 1)  // Use tomorrow's date for everything but tours
  }

  options = {
    vcID: 188,                // Our BookEasy Visitor Centre ID
    defaultDate: bookingDate,
    period: 1,                // Show one night by default, otherwise everything looks much dearer than it is
    showHoverInline: true,    // Use "more" information inline, so it works on touch devices
    showQuantity: false,      // Quantity is not relevant to the products we sell. (It might be worth checking if this still applies to park entry)
    thumbsInGrid: false       // Don't show thumbnail images, as not all options have them
  };

  BE.gadget.details('#operatorDetails', options); // Initialise the gadget. The first parameter can be any valid CSS selector.
});
```

See [Impart Media Item Details and Cart Gadgets](https://gadgets.impartmedia.com/doc/03-details-and-cart-gadgets.html) for more information.



## Booking gadget

```javascript
$w(function() {
  var options = {
    vcID: 188,               // Our BookEasy Visitor Centre ID
    confirmationURL: null    // Display the confirmation on the same page as the booking gadget
  };

  BE.gadget.book('#booking', options);  // Initialise the gadget. The first parameter can be any valid CSS selector.
});
```

Note that the confirmation is displayed on the same page as the booking gadget. This makes it hard to track successful purchases with Google Analytics. Consider updating this so the confirmation is displayed on a separate page. See [Impart Media Booking Gadget](https://gadgets.impartmedia.com/doc/04-booking-gadget.html) and [Impart Media Confirmation Gadget](https://gadgets.impartmedia.com/doc/05-confirm-gadget.html) for more information.
