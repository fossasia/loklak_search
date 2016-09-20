(function() {

	'use strict';

	angular
		.module('loklak')
		.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('app', {
				abstract: true,
				views: {
					'main@': {
						templateUrl: 'app/core/layouts/default.html'
					},
					'topbar@app': {
						templateUrl: 'app/navigation/topbar/topbar.html',
						controller: 'TopbarController'
					},
					'sidebar@app': {
						templateUrl: 'app/navigation/sidebar/sidebar.html',
						controller: 'SidebarController'
					}
				}
			});
	}

})();
