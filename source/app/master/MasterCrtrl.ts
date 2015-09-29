/// <reference path='../_all.ts' />

module maaas {
  export class MasterCtrl {


    public static $inject = [
      '$scope',
      '$location'
    ];

    constructor(
      private $scope,
      private $location: ng.ILocationService
      ) {
      $scope.vm = this;
      console.log('test');
      $('#side-menu').metisMenu();
    }

  }
}


  //  $('#side-menu').metisMenu();
