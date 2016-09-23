(function() {
	'use strict';

	angular
		.module('app.core')
		.config(config);

	/** @ngInject */
	function config() {

		// toastr configuration
		toastr.options.timeOut = 4000;
		toastr.options.positionClass = 'toast-top-right';
		toastr.options.preventDuplicates = true;
	}

})();
