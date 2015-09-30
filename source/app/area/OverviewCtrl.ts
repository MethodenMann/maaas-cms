/// <reference path='../_all.ts' />


module maaas {

  export class OverviewCtrl {

    public static $inject = [
      '$scope',
      '$location'
    ];

    areas: IArea[] = [{ "id": 1, "name": "test", "background_image_id": "XYZ123" }, { "id": 2, "name": "Wolf", "background_image_id": "987ABC" }, { "id": 3, "name": "Wolf", "background_image_id": "987ABC" },
      { "id": 4, "name": "Wolf", "background_image_id": "987ABC" }, { "id": 5, "name": "Wolf", "background_image_id": "987ABC" }, { "id": 6, "name": "AMeise", "background_image_id": "987ABC" },
      { "id": 7, "name": "Zebrea", "background_image_id": "987ABC" }];
    constructor(
      @Inject('$scope') private $scope,
      @Inject('$location') private $location
      ) {

      $scope.vm = this;
    }


  }
}
