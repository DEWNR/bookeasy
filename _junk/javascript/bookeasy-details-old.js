/**
 * This code is largely outdated and includes features that are no longer
 * required. It is recommended that the gadget initialisation be moved into the
 * HTML for easier customisation, while the remaining code can be split into
 * Mustache templates (which could be embedded into HTML) and data processing
 * components.
 **/


// Initialise the global variables
var readCookie, screenSize; // Variables set within vivify.js
var operatorIDs, operatorPageType, operatorTitles, acceptBookings, unsupportedBrowser; // Variables set within the Seamless template
var detailsGadgetOptions, selectedOperatorID, bookingDate; // Global variables for the gadget
var bookeasyData = {};

// Create a string for the JSONP request
var operatorIDString = operatorIDs.join();

// Set the the bookeasy operator type based on the operator page type
var bookeasyType;
switch (operatorPageType) {
  case 'tours': bookeasyType = 'tours'; break;
  default: bookeasyType = 'accom';
};

// Get today's date
bookingDate = new Date();

// Set the gadget options
detailsGadgetOptions = {
  vcID:188,
  defaultDate: bookingDate,
  descriptionHover:false,
  period: 1,
  showQuantity: false,
  thumbsInGrid:false,
  type: bookeasyType
};

// Get the selected operator ID
getSelectedOperatorID();

// Load all the details
loadBookEasyDetails();

function loadBookEasyDetails() {
  // Check that the required variables have been set
  if (typeof operatorIDs == 'undefined' || typeof operatorPageType == 'undefined') {
    return
  } else if (!operatorIDs.length) {
    return
  };

  // Add the CSS so the checkout lightbox is displayed correctly
  if ($('html').hasClass('backgroundsize') && readCookie("responsive") != "false" && screenSize == "small") {
    $(document).ready(function() {
      // Add the delegate to hide/show the rest of the content
      $( "body" ).bind(
        "DOMNodeInserted",
        function( objEvent ){
          var target = objEvent.target;
          if ($(target).attr('id') == 'wdOverlayContent') {
            $('#container').hide();
            $('body').css('background-color', 'white');
          }
        }
      )
      $( "body" ).bind(
        "DOMNodeRemoved",
        function( objEvent ){
          var target = objEvent.target;
          if ($(target).attr('id') == 'wdOverlayContent') {
            $('#container').show();
            $('body').css('background-color', '');
          }
        }
      )
    });
  }

  if (selectedOperatorID) {
    detailsGadgetOptions['productID'] = selectedOperatorID;
  }

  if ((operatorPageType == 'camping' || operatorPageType == 'tours') && !$('html').hasClass('touch')) {
    detailsGadgetOptions['descriptionHover'] = true;
  }


  // Initialise the widget
  if (detailsGadgetOptions['productID'] && acceptBookings && !unsupportedBrowser) {
    $w(function() {
      BE.gadget.details("#operatorDetails", detailsGadgetOptions);
    })
  } else if (unsupportedBrowser) {
    $("#operatorDetails").html('<div class=" closure-announcement full"><h2>Error</h2><p>Unfortunately the browser you are using is too old to run our booking system. Please <a href="mailto:DEWNR.OnlineBookings@sa.gov.au">email us</a> to make your booking, or <a href="http://whatbrowser.org/">choose a different browser</a>.</p></div>');
  }

  // Request the operator information
  $.ajax({
    url: "//sjp.impartmedia.com/be/getOperatorsInformation?q=188&operators="+operatorIDString,
    cache: true,
    dataType: 'jsonp',
    jsonpCallback: 'jQueryOperatorsInformation'
  })
  .done(function(data) {
    bookeasyData.Operators = data.Operators;
    if (bookeasyData.Operators.length > 0) {
      loadOperatorDetails(selectedOperatorID);
    }
  })

  // Request the room details, if applicable
  if (operatorPageType == 'accommodation' || operatorPageType == 'camping') {
    $('.room, .campground').html('<em>Loading more information&hellip;</em>');
    $.ajax({
      url: "//sjp.impartmedia.com/be/getAccomRoomsDetails?q=188&operators="+operatorIDString,
      cache: true,
      dataType: 'jsonp',
      jsonpCallback: 'jQueryAccomRoomsDetails'
    })
    .always(function() {
      // Reset the loading message and hide the container
      $('.room, .campground').html('')
      if (operatorPageType == 'camping') {
        $('.room, .campground').hide();
      }
    })
    .done(function(data) {
      bookeasyData.Accommodation = data;

      // Combine the array elements, if necessary
      bookeasyData.Accommodation = groupByOperator(bookeasyData.Accommodation, "Rooms", "RoomID");

      // Set the room details, if applicable
      for (var operator in bookeasyData.Accommodation) {
        var currentOperatorID = bookeasyData.Accommodation[operator].OperatorId;
        for (var room in bookeasyData.Accommodation[operator].Rooms) {
          if (operatorPageType == 'accommodation') {
            if (bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('RoomID')){
              var innerHTML = '';
              if (bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('Description')) {
                innerHTML += text2HTML(bookeasyData.Accommodation[operator].Rooms[room].Description);
              }
              if (bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('RoomConfig') && bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('NoPersons')) {
                innerHTML += bookeasyData.Accommodation[operator].Rooms[room].RoomConfig+", sleeps "+bookeasyData.Accommodation[operator].Rooms[room].NoPersons+".";
              }
              /* The following block has been temporarily disabled as BookEasy isn't returning the correct value for "MinNights". */
              /*if (bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('MinNights')) {
                if (bookeasyData.Accommodation[operator].Rooms[room].MinNights < 2) {
                  innerHTML += "No minimum stay applies.";
                } else {
                  innerHTML += "A minimum stay of "+bookeasyData.Accommodation[operator].Rooms[room].MinNights+" applies.";
                }
              }*/
              $('.room.id'+bookeasyData.Accommodation[operator].Rooms[room].RoomID).html(innerHTML);
            }
          } else if (operatorPageType == 'camping') {
            // Set the room details, if applicable
            if (bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('RoomID')){
              if (bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('Description') && bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('Name')){
                if (bookeasyData.Accommodation[operator].Rooms[room].Description != '') {
                  var innerHTML = "<h3>"+bookeasyData.Accommodation[operator].Rooms[room].Name+"</h3>";
                  // Load the picture, if it exists
                  if (bookeasyData.Accommodation[operator].Rooms[room].hasOwnProperty('Pictures')) {
                    if (bookeasyData.Accommodation[operator].Rooms[room].Pictures.length) {
                      innerHTML += '<img class="campsite" alt="'+bookeasyData.Accommodation[operator].Rooms[room].Name+'" src="'+bookeasyData.Accommodation[operator].Rooms[room].Pictures[0]+'" />';
                    }
                  }
                  innerHTML += '<div class="campsite">'+text2HTML(bookeasyData.Accommodation[operator].Rooms[room].Description);
                  if (acceptBookings) {  // Only append the "book now" link if the acceptBookings variable is true
                    innerHTML += '<p><a href="#bookings" onclick="resetGadget('+currentOperatorID+')">Book now</a>.</p>';
                  }
                  innerHTML += '</div><hr />';
                  $('.campground.id'+currentOperatorID).append(innerHTML);
                }
              }
            }
          }
        }
        if ($('.campground.id'+currentOperatorID).html() != '' && operatorPageType == 'camping') {
          $('.campground.id'+currentOperatorID).before('<p><a class="concertina id'+currentOperatorID+'" href="#"><a class="id'+currentOperatorID+'" href="#">Campground details</a></p>');
          $('.campground.id'+currentOperatorID).prepend('<hr />');
          setMenuToggle('.campground.id'+currentOperatorID, 'a.id'+currentOperatorID);
        }
      }
    })
  } else if (operatorPageType == 'tours') {
    $('.tour').html('<em>Loading more information&hellip;</em>');
    $.ajax({
      url: "//sjp.impartmedia.com/be/getToursOperatorTourDetails?q=188&operators="+operatorIDString,
      cache: true,
      dataType: 'jsonp',
      jsonpCallback: 'jQueryToursOperatorToursDetails'
    })
    .always(function() {
      // Reset the loading message and hide the container
      $('.tour').html('').hide();
    })
    .done(function(data) {
      bookeasyData.Tours = data.Operators;

      // Set the room details, if applicable
      for (var operator in bookeasyData.Tours) {
        var currentOperatorID = bookeasyData.Tours[operator].OperatorId;
        for (var tour in bookeasyData.Tours[operator].Tours) {
          if (bookeasyData.Tours[operator].Tours[tour].hasOwnProperty('TourId')){
            if (bookeasyData.Tours[operator].Tours[tour].hasOwnProperty('Description') && bookeasyData.Tours[operator].Tours[tour].hasOwnProperty('Name')){
              if (bookeasyData.Tours[operator].Tours[tour].Description != '') {
                var innerHTML = "<h3>"+bookeasyData.Tours[operator].Tours[tour].Name+"</h3>";
                innerHTML += text2HTML(bookeasyData.Tours[operator].Tours[tour].Description)+'<hr />';
                $('.tour.id'+currentOperatorID).append(innerHTML);
              }
            }
          }
        }
        if ($('.tour.id'+currentOperatorID).html() != '') {
          $('.tour.id'+currentOperatorID).before('<p><a class="concertina id'+currentOperatorID+'" href="#"><a class="id'+currentOperatorID+'" href="#">Details</a></p>');
          $('.tour.id'+currentOperatorID).prepend('<hr />');
          setMenuToggle('.tour.id'+currentOperatorID, 'a.id'+currentOperatorID);
        }
      }
    })
  }
}

function loadOperatorDetails(selectedOperatorID) {
  var selectedOperatorIndex = null;
  // Make sure a useful value is set for selectedOperatorID

  if (!selectedOperatorID) {
    selectedOperatorID = operatorIDs;
  }

  // Get the index of the selected operator in the BookEasy data
  for (var operator in bookeasyData.Operators) {
    if (bookeasyData.Operators[operator].OperatorID == selectedOperatorID) {
        selectedOperatorIndex = operator;
    }
  }

  // If the selectedOperatorIndex has been set, add the info to the page
  if (selectedOperatorIndex) {
     // Set the directions, if applicable
    if (typeof bookeasyData.Operators[selectedOperatorIndex].Directions != 'undefined') {
      var innerHTML = bookeasyData.Operators[selectedOperatorIndex].Directions.trim();
      if (innerHTML && innerHTML != ' ') {
        innerHTML = "<h2>Directions</h2>"+text2HTML(innerHTML);
        $("#operatorDirections").html(innerHTML);
      } else {
        $("#operatorDirections").empty();
      }
    } else {
      $("#operatorDirections").empty();
    }
    // Set the Ts & Cs, if applicable. If multiple operators are defined, the first is used.
    if (typeof bookeasyData.Operators[selectedOperatorIndex].Cancellation != 'undefined') {
      var innerHTML = bookeasyData.Operators[selectedOperatorIndex].Cancellation.trim();
      if (innerHTML && innerHTML != ' ') {
        innerHTML = "<h2>Terms and Conditions</h2>"+text2HTML(innerHTML);
        $("#operatorConditions").html(innerHTML);
      } else {
        $("#operatorConditions").empty();
      }
    } else {
      $("#operatorConditions").empty();
    }
  } else {
    // Clear the conditions and directions if no information is available
    $("#operatorDirections").empty();
    $("#operatorConditions").empty();
  }
  // If there are multiple operators for this page, add tabs to the details gadget
  if (bookeasyData.Operators.length > 1) {
    var innerHTML = '';

    for (var i = 0, arrayLength = operatorIDs.length; i < arrayLength; i++) {
      var currentOperatorID = operatorIDs[i];
      var operatorTitle = "";

      // Get the manually configured tab title
      if (typeof operatorTitles != "undefined") {
        if (operatorTitles.hasOwnProperty(currentOperatorID)) {
          operatorTitle = operatorTitles[currentOperatorID];
        }
      }

      // If the title wasn't set by the previous block, get the name from the BookEasy data
      if (operatorTitle === "") {
        for (var operator in bookeasyData.Operators) {
          if (bookeasyData.Operators[operator].OperatorID == currentOperatorID) {
            operatorTitle = bookeasyData.Operators[operator].TradingName;

            // Remove "campground" from the name of campgrounds
            if (operatorPageType == 'camping') {
              operatorTitle = operatorTitle.replace(' Campground', '');
            }
          }
        }
      }

      // Add a tab only if the title has been set
      if (operatorTitle !== "") {
        if (currentOperatorID == selectedOperatorID) {
          innerHTML += '<span>'+operatorTitle+'</span>';
        } else {
          innerHTML += '<a href="#/'+bookeasyType+'/'+currentOperatorID+'" onclick="resetGadget('+currentOperatorID+')">'+operatorTitle+'</a>';
        }
      }
    }
    innerHTML = '<div class="tabs-group">'+innerHTML+'</div>';
    $('div.BE.details-gadget').prepend(innerHTML);
  }
}

function groupByOperator(array, property, sortProperty) {
  var currentOperatorData = {}, currentOperatorID, operatorData = {}, newArray = [];

  // Loop through the array
  for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
    currentOperatorData = array[i];
    // Check that the current item has an operator ID
    if (!currentOperatorData.hasOwnProperty("OperatorId")) {
      continue;
    }
    currentOperatorID = currentOperatorData.OperatorId;
    // Add the operator ID to the list of properties, if it doesn't already exist, and initiate the sub-property
    if (!operatorData.hasOwnProperty(currentOperatorID)) {
      operatorData[currentOperatorID] = {"OperatorId":currentOperatorID};
      operatorData[currentOperatorID][property] = [];
    }
    // Combine the existing properties with the new ones
    operatorData[currentOperatorID][property] = operatorData[currentOperatorID][property].concat(currentOperatorData[property]);
  }

  // Convert the data to an array and order by name
  for (var operator in operatorData) {
    if (operatorData.hasOwnProperty(operator)) {
      currentOperatorData = operatorData[operator];
      currentOperatorData[property].sort(function(a,b) {return (a[sortProperty] > b[sortProperty]) ? 1 : ((b[sortProperty] > a[sortProperty]) ? -1 : 0);} );
      newArray.push(currentOperatorData)
    }
  }
  return newArray;
}

function getSelectedOperatorID() {
  selectedOperatorID = window.location.hash.match(/\/[a-zA-Z]{5}\/(\d{5})/);
  if (selectedOperatorID) {
    selectedOperatorID = parseInt(selectedOperatorID[1]); // If there is a match, use the second item as the ID (the first item includes the whole hash) and convert it to an integer
  } else if (operatorIDs.length >= 1) {
    selectedOperatorID = operatorIDs[0];
  } else {
    return;
  }
}

function resetGadget(selectedOperatorID) {
  if (!unsupportedBrowser) {  // Make sure the script only runs in supported browsers
    if (!selectedOperatorID) {
      getSelectedOperatorID();
    } else {
      window.location.hash = '/'+bookeasyType+'/'+selectedOperatorID;
    }
    if (detailsGadgetOptions['productID'] != selectedOperatorID) {
      detailsGadgetOptions['productID'] = selectedOperatorID;
      $("#operatorDetails").empty();
      BE.gadget.details("#operatorDetails", detailsGadgetOptions);
      loadOperatorDetails(selectedOperatorID);
    }
  }
}

function text2HTML(input) {
  input = input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\//g, '/');
  input = input.replace(/\r/g, '').replace(/\n( )*?(\n)*?( )*?$/, '').replace(/\n( )*?\n/g, '</p><p>').replace(/\n/g, '<br />');
  input = '<p>'+input+'</p>';
  return input;
}
