// convert the details gadget into bootstrap format, to allow for better styling, and automatic responsiveness
jQuery(document).on('gadget.script.loaded', function() {
	jQuery('head').append('<style> @media (max-width: 767px) { #details-gadget .details-gadget.BE .priceGrid table thead { display:none; } </style>');
	jQuery('head').append('<style> @media (max-width: 767px) { #details-gadget .details-gadget.BE .priceGrid table tbody tr { display:block; padding:25px 0; } </style>');
	jQuery('head').append('<style> @media (max-width: 767px) { #details-gadget .details-gadget.BE .priceGrid table tbody tr td { width:100% !important; display:block; text-align:center; line-height:initial; } </style>');
	jQuery('head').append('<style> @media (max-width: 767px) { #details-gadget .details-gadget.BE .priceGrid table tbody tr .thumb { margin:0 auto !important; text-align:center !important; padding-bottom:0; } </style>');
});
