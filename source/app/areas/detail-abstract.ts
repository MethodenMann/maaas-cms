import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';

export abstract class DetailAbstract {
  protected area: IArea;
  protected areaform: any;

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area,
    @Inject('Medium') protected Medium
    ) {
    this.loadData();

    $scope.$on('image-management.injectImage', (e, data: IMediumUploadBroadcast) => {
      this.handleImageDisplay(data.uploadId, data.medium);
    });
  }

  protected handleImageDisplay(uploadId:string, medium:IMedium) {
    if (uploadId == 'backgroundImage') {
      this.area.backgroundImageId = medium.id;
    } else if (uploadId == 'stickerImage') {
      this.area.stickerImageId = medium.id;
    }
  }

  protected saveImageRelation(medium:IMedium, id?:number) {
    var medium = medium;
    medium.mediumableId = id || this.area.id;
    medium.mediumableType = 'Area';
    this.Medium.update(medium.id, {medium: medium});
  }

  abstract save(): void;

  protected loadData(): void { }

  protected isFormValid(): Boolean {
    return this.$scope.areaform.$valid;
  }

  private isValidAndSubmitted(inputName: string) {
    if (this.$scope.areaform[inputName]) {
      return this.$scope.areaform[inputName].$invalid && this.$scope.areaform.$submitted;
    }
    return false;
  }

  protected focusFirstInputWithError() {
    $('input.ng-invalid').first().focus();
  }
}
