import {Inject} from '../utils/di';

export class ContentDetailComponent {
  private static selector = 'mas-content-detail-component';
  private static templateUrl = './app/content/content-detail-component.html';

  private content: any;
  private imageList: any[] = [];
  private backgroundImageId: String;
  private ids: String[] = [];

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Content') private Content,
    @Inject('$stateParams') private $stateParams
  ) {
    Content.find($stateParams.contentId).then((data) => {
      this.content = data;

      var list = []
      data.media.forEach(medium => {
        var url = $.cloudinary.url(medium.publicId, {
          format: 'jpg', width: 100, height: 100, crop: 'thumb'
        });
        list.push({title: "a", value: url, medium: medium});
      });
      this.imageList = list;
    });

    $scope.$on('imageUploaded', (e, medium) => {
      var url = $.cloudinary.url(medium.publicId, {
        format: 'jpg', width: 100, height: 100, crop: 'thumb'
      });
      this.imageList.push({title: this.imageList.length, value: url, medium: medium});
    });
  }

  save() {
    var mediumIds = [];
    this.imageList.forEach(image => {
      mediumIds.push(image.medium.id);
    });
    this.content.mediumIds = mediumIds;
    this.content.media = undefined;
    this.Content.update(this.content.id, {content: this.content});
  }
}
