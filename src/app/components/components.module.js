(function() {

	'use strict';

	angular
		.module('app.components', [])
		.config(config);

	/** @ngInject */
    function config($stateProvider) {

        $stateProvider

        .state('app.components', {
            url: '/components',
            views: {
                'content@app': {
                    templateUrl: 'app/components/components.html',
                    controller: 'ComponentsController as vm'
                }
            }
        });
    }
})();
