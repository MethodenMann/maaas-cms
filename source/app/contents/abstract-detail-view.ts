import {Inject} from '../utils/di';
import {IContent} from './IContent';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

declare var tinyMCE: any;

export class AbstractDetailView {
  private static selector = 'mas-content-detail-view';
  private static templateUrl = './app/contents/abstract-detail-view.html';

  protected content: IContent = {};
  protected imageList: any[] = [];
  protected backgroundImageId: String;
  protected ids: String[] = [];
  protected area: any = {name: 'abc'};

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('Content') protected Content,
    @Inject('Medium') protected Medium,
    @Inject('$stateParams') protected $stateParams
  ) {
    $scope.$on('image-management.imageUploaded', (e, data: IMediumUploadBroadcast) => {
      var medium = data.medium;
      medium.mediumableId = this.content.id;
      medium.mediumableType = 'Content';
      Medium.update(medium.id, {medium: medium});
      var url = $.cloudinary.url(medium.publicId, {
        format: 'jpg', width: 100, height: 100, crop: 'thumb'
      });
      this.imageList.push({title: this.imageList.length, value: url, medium: medium});
    });

    this.constructorHook();
  }

  protected constructorHook() {}
}
