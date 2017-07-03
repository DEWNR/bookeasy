

// this script REQUIRES imutility.js
// please ensure you include imutility.js before this script, like so:
// <jdoc:include type="impartScript" name="{shared}/v3/js/imutility.js" compress="true" />


// convert the details gadget into bootstrap format, to allow for better styling, and automatic responsiveness
jQuery(document).on('gadget.script.loaded', function() {
	jQuery('head').append('<style> @media (max-width: 767px) { #details-gadget .details-gadget.BE .priceGrid table thead { display:none; } </style>');
	jQuery('head').append('<style> @media (max-width: 767px) { #details-gadget .details-gadget.BE .priceGrid table tbody tr td { width:100% !important; display:block; text-align:center; } </style>');
	jQuery('head').append('<style> @media (max-width: 767px) { #details-gadget .details-gadget.BE .priceGrid table tbody tr .thumb { width:100% !important; text-align:center !important; } </style>');
});
