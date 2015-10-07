import {Inject} from '../utils/di';
import {IArea} from './IArea';

export class DetailCtrl {
  private area: IArea;

  constructor(
    @Inject('$scope') private $scope: angular.IScope,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area
    ) {

    Area.find($stateParams.areaId).then((data) => {
      this.area = data;
    });

    $scope.$on('imageUploaded', (event, mass) => {
      this.area[mass.id] = mass.cloudId;
      $scope.$apply(); // ? :-/
    });
  }

  saveArea() {
    this.Area.update(this.area.id, {area: this.area});
  }
}
