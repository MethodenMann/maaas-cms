/// <reference path='../_all.ts' />

module maaas {
  'use strict';

  export class LoginCtrl {

    public static $inject = [
      '$scope',
      '$location',
      'LoginService'
    ];

    constructor(
      private $scope,
      private $location: ng.ILocationService,
      private loginService: LoginService
      ) {
      $scope.somestring = 'test1';
      $scope.vm = this;
    }

    changeString(value: string) {
      this.loginService.put(+value);
		    this.$scope.somestring = this.loginService.get().toString();
    }
  }
}
