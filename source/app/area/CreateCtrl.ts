import {Inject} from '../utils/di';
import {IArea} from './IArea';

export class CreateCtrl {
  private area: IArea;
  private backgroundImageMetaData: any;
  private stickerImageMetaData: any;

  constructor(
    @Inject('$stateParams') private $stateParams,
    @Inject('$scope') private $scope,
    @Inject('Area') private Area
    ) {
  }

  saveArea() {
    // TODO: this logic is copied from DetailCtrl and should be extracted into
    //       a super class
    if (this.$scope.areaform.$valid) {
      this.area.backgroundImageId = this.backgroundImageMetaData.publicId;
      this.area.stickerImageId = this.stickerImageMetaData.publicId;
      this.Area.create({area: this.area});
      alert('Gespeichert'); //TODO: anders machen
    } else {
      $('input.ng-invalid').first().focus();
    }
  }
}
