(function() {

	'use strict';

	angular
		.module('app.components')
		.controller('ComponentsController', ComponentsController);

	/* @ngInject */
	function ComponentsController(toastr) {

		var vm = this;

		/* ANGULAR CHARTS
		=============================== */
		vm.lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  		vm.lineSeries = ['Series A', 'Series B'];
  		vm.lineColors = ['#2ecc71', '#9b59b6'];
  		vm.lineData = [
  		  	[65, 59, 80, 81, 56, 55, 40],
  		  	[28, 48, 40, 19, 86, 27, 90]
  		];
  		vm.lineOnClick = function (points, evt) {
  		  	 toastr.info(points, evt);
  		};

  		vm.radarLabels =['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  		vm.radarColors = ['#3498db', '#f1c40f'];
  		vm.radarData = [
    		[65, 59, 90, 81, 56, 55, 40],
    		[28, 48, 40, 19, 96, 27, 100]
  		];
	}
})();
