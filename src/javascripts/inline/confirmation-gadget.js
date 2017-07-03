$(function() {

    // load confirmation gadget
    // BE.gadget.confirm('#bookeasy__confirmation-gadget', {
    //     thankYouText: 'Thank you for your booking, a booking summary will be emailed to you',
    //     pdfLinkText: 'Download your booking summary PDF now'
    // });

    $(document).ready(function() {

        function showrereference() {
            var referenceID = $('#bookeasy__confirmation-gadget  a').attr('href').split('=').reverse()[0];
            console.log(referenceID)
        }

        setTimeout(showrereference, 1000)
    });

 });
