(function() {

	'use strict';

	angular
		.module('app.home', [])
		.config(config);

	/** @ngInject */
	function config($stateProvider) {

		$stateProvider.state('app.home', {
			url: '/home',
			views: {
				'content@app': {
					templateUrl: 'app/home/home.html',
					controller: 'HomeController'
				}
			}
		});
	}
})();
