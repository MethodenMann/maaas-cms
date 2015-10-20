import {Inject} from '../utils/di';
import {IContent} from './IContent';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

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
    @Inject('$stateParams') protected $stateParams
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
}
