import {Inject} from '../../utils/di';
import {IMedium} from '../../media/imedium';
import {IMediumUploadBroadcast} from './imedium-upload-broadcast';

export class ImageLoadDirective {
  private static template = '';
  private static replace = true;
  private static selector = 'image-load';

  private static options = {
    bindToController: {
      uploadId: '@',
      publicId: '@',
      width: '@',
      height: '@'
    }
  };

  private width: string;
  private height: string;
  private element: JQuery;
  private thumbnailTag: JQuery;
  private uploadId: string;
  private publicId: string;
  private url: string;

  constructor(
    @Inject('$scope') private $scope
  ) {}

  private setup() {
    // TODO refactor if else logic into separate components?
    if (this.uploadId) {
      this.$scope
      .$on('image-management.injectImage', (e, data: IMediumUploadBroadcast) => {
        if (data.uploadId == this.uploadId) {
          this.loadImage(data.medium);
        }
      });
    } else if (this.publicId) {
      this.loadImage({publicId: this.publicId})
    } else {
      // lol wtf?
    }
  }

  private loadImage(medium: IMedium) {
    this.thumbnailTag.html('')
    this.thumbnailTag.append($.cloudinary.image(medium.publicId, {
      format: 'jpg', width: this.width, height: this.height,
      crop: 'thumb'
    }));
  }

  private static link($scope, element: JQuery, attributes) {
    $scope.ctrl.element = element;
    $scope.ctrl.thumbnailTag = angular.element('<div></div>');
    $scope.ctrl.element.append($scope.ctrl.thumbnailTag);
    $scope.ctrl.setup();
  }
}
