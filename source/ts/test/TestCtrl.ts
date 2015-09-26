/// <reference path='../_all.ts' />

module maaas {
  'use strict';

  export class TestCtrl {

    public static $inject = [
      '$scope',
      '$location',
      'LoginService'
    ];

    constructor(
      private $scope,
      private $location: ng.ILocationService

      ) {
      $scope.somestring = 'test1sd';
      $scope.vm = this;
    }


  }

  Bar.app.controller("TestCtrl", TestCtrl);

}
