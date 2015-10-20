import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';
import {FormView} from '../common/forms/form-view';

export abstract class DetailAbstract extends FormView {
  protected area: IArea;
  protected areaform: any;

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area,
    @Inject('Medium') protected Medium,
    @Inject('$state') protected $state
    ) {
    super($scope);

    this.loadData();

    $scope.$on('image-management.injectImage', (e, data: IMediumUploadBroadcast) => {
      this.handleImageDisplay(data.uploadId, data.medium);
    });

    this.constructorHook();
  }

  protected constructorHook() {}

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
}
