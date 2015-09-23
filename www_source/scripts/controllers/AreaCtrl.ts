/// <reference path='../_all.ts' />

module maaas {
	'use strict';

	export class AreaCtrl {
		//private areas: Area[];

		// $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
		public static $inject = [
			'$scope',
			'$location',
			'TestService'
		];

		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: IAreaScope,
			private $location: ng.ILocationService,
			private testservice : ITestService
		) {
			$scope.somestring = 'test1';
			$scope.vm = this;
		}

		changeString(value: string) {
				this.testservice.put(+value);
		    this.$scope.somestring = this.testservice.get().toString();
		}
	}

}
