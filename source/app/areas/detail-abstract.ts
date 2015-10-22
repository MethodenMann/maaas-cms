import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';
import {FormView} from '../common/forms/form-view';

export abstract class DetailAbstract extends FormView {
  protected area: IArea;

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area,
    @Inject('$state') protected $state
    ) {
    super($scope);

    this.loadData();

    $scope.$on('image-management.injectImage', (e, data: IMediumUploadBroadcast) => {
      this.persistImageId(data.uploadId, data.mediumId);
    });

    this.constructorHook();
  }

  protected constructorHook() {}

  protected persistImageId(uploadId:string, mediumId) {
    if (uploadId == 'backgroundImage') {
      this.area.backgroundImageId = mediumId;
    } else if (uploadId == 'stickerImage') {
      this.area.stickerImageId = mediumId;
    }
  }

  protected saveImageRelation(medium:IMedium, id?:number) {
    var mediumableUpdateData = {
      id: medium.id,
      mediumableId: id || this.area.id,
      mediumableType: 'Area'
    };
    this.$scope.$broadcast("image-management.mediumableUpdate", mediumableUpdateData)
  }


  abstract save(): void;

  protected loadData(): void { }
}
