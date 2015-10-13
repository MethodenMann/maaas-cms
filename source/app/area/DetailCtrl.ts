import {Inject} from '../utils/di';
import {IArea} from './IArea';

export class DetailCtrl {
  private area: IArea;
  private backgroundImageMetaData: any;
  private stickerImageMetaData: any;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area
    ) {

    Area.find($stateParams.areaId).then((data) => {
      this.area = data;
    });
  }

  private areaform;

  isValidAndSubmitted(inputName: string) {
    if (this.$scope.areaform[inputName]) {
      return this.$scope.areaform[inputName].$invalid && this.$scope.areaform.$submitted;
    }
    return false;
  }

  saveArea() {
    if (this.$scope.areaform.$valid) {
      this.Area.update(this.area.id, { area: this.area });
      alert('Gespeichert'); //TODO: anders machen
    } else {
      $('input.ng-invalid').first().focus();
    }
  }
}
