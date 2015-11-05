import {Inject} from '../utils/di';
import {IContent} from './IContent';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';
import {FormView} from '../common/forms/form-view';

export abstract class AbstractDetailView extends FormView {
  private static selector = 'mas-content-detail-view';
  private static templateUrl = './app/contents/abstract-detail-view.html';

  protected content: IContent = <IContent>{};
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

    this.constructorHook();
  }

  protected constructorHook() {}

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

  abstract saveHook(): void;

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
