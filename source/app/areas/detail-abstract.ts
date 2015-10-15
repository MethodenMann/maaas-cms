import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {IMediumUploadBroadcast} from '../common/imagemanagement/imedium-upload-broadcast';

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

    $scope.$on('imageUploaded', (e, data: IMediumUploadBroadcast) => {
      if (data.uploadId == 'backgroundImage') {
        this.area.backgroundImage = data.medium;
      } else if (data.uploadId == 'stickerImage') {
        this.area.stickerImage = data.medium;
      }
    });
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
