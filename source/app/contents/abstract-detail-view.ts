import {Inject} from '../utils/di';
import {IContent} from './IContent';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';

export class AbstractDetailView {
  private static selector = 'mas-content-detail-view';
  private static templateUrl = './app/contents/abstract-detail-view.html';

  protected content: IContent = {};
  protected imageList: any[] = [];
  protected backgroundImageId: String;
  protected ids: String[] = [];
  protected area: any = {name: 'abc'};
  protected tinymceConfig: any;

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('Content') protected Content,
    @Inject('Medium') protected Medium,
    @Inject('$stateParams') protected $stateParams,
    @Inject('$state') protected $state,
    @Inject('$q') protected $q
  ) {
    this.tinymceConfig = {
      selector: 'textarea',
      menu: {},
      toolbar: 'undo redo | bold italic | link image',
      plugins: 'image',
      image_dimensions: false,
      height: 400,
      image_list: (success) => {
        success(this.imageList);
      }
    };

    this.constructorHook();
  }

  protected constructorHook() {}

  protected addToImageList(medium:IMedium) {
    var url = $.cloudinary.url(medium.publicId, {
      format: 'jpg', width: 100, height: 100, crop: 'thumb'
    });
    this.imageList.push({title: this.imageList.length, value: url, medium: medium});
  }
}
