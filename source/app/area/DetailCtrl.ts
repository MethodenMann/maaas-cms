/// <reference path='../_all.ts' />


module maaas {

  export class DetailCtrl {

    area: IArea = { 'id': 1, 'name': 'Test', 'background_image_id': 'XYZ123' };

    constructor(
      @Inject('$scope') private $scope,
      @Inject('$stateParams') private $stateParams
      ) {

      console.log($stateParams.areaId);
      $scope.vm = this;
    }


  }
}
