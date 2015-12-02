import {Inject} from '../utils/di';
import {IContent} from './IContent';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';
import {FormView} from '../common/forms/form-view';
import {IArea} from '../areas/iarea';

export abstract class DetailAbstract extends FormView {
  private static selector = 'mas-content-detail-view';
  private static templateUrl = './app/contents/detail-view.html';

  protected content:IContent = <IContent>{};
  protected imageList:any[] = [];
  protected backgroundImageId:String;
  protected ids:String[] = [];
  protected area:IArea;
  protected tinymceConfig:any;

  constructor(@Inject('$scope') protected $scope,
              @Inject('Content') protected Content,
              @Inject('Medium') protected Medium,
              @Inject('Area') protected Area,
              @Inject('PreviewService') protected PreviewService,
              @Inject('$stateParams') protected $stateParams,
              @Inject('$state') protected $state,
              @Inject('$timeout') protected $timeout,
              @Inject('$q') protected $q) {
    super($scope);
    this.tinymceConfig = {
      selector: 'textarea',
      menu: {},
      toolbar: 'styleselect | undo redo | bold italic | link image',
      plugins: 'image paste',
      image_dimensions: false,
      height: 400,
      style_formats: [
        {title: 'H1', block: 'h1'},
        {title: 'H2', block: 'h2'},
        {title: 'H3', block: 'h3'}
      ],
      image_list: (success) => {
        success(this.imageList);
      }
    };

    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });

    this.constructorHook();

    this.regististerDebouncewWatch($timeout, 'ctrl.content', this.publishPreview);
  }

  protected constructorHook() {
  }


  private publishPreview() {
    this.PreviewService.publishPreview('content', this.content);
  }

  protected getCloudinaryUrl(medium) {
    return $.cloudinary.url(medium.publicId, {
      format: 'jpg', height: 100, crop: 'thumb'
    });
  }

  protected addToImageList(mediumId) {
    this.Medium.find(mediumId).then(medium => {
      var url = this.getCloudinaryUrl(medium);
      this.imageList.push({title: this.imageList.length, value: url, medium: medium});
    });
  }

  abstract saveHook():void;

  protected save() {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    if (this.isFormValid()) {
      this.saveHook();
    } else {
      this.$scope.$broadcast('mas.saveprogess', 'rejected');
      this.focusFirstInputWithError();
    }
  }
}
