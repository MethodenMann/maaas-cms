import {Inject} from '../../utils/di';

export class ImageLoadDirective {
  private static template = '';
  private static replace = true;
  private static selector = 'image-load';

  private static options = {
    bindToController: {
      imageMetaData: '=',
      width: '@',
      height: '@'
    }
  };

  private imageMetaData: any;
  private width: String;
  private height: String;
  private element: JQuery;

  constructor(
    @Inject('$scope') private $scope
    ) {
    $scope.$watch('ctrl.imageMetaData.publicId', () => {
      this.loadImage();
    });
  }

  private loadImage() {
    var thumbnailTag = angular.element('<div></div>');
    // this.element.html('');
    this.element.append(thumbnailTag);

    if (this.imageMetaData && this.imageMetaData.publicId && this.imageMetaData.publicId !== '') {
      thumbnailTag.append($.cloudinary.image(this.imageMetaData.publicId, {
        format: 'jpg', width: this.width, height: this.height,
        crop: 'thumb'
      }));
    }
  }

  private static link($scope, element: JQuery, attributes) {
    $scope.ctrl.element = element;
  }
}
