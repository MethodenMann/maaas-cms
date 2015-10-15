import {Inject} from '../utils/di';
import {IContent} from './IContent';
import {IMediumUploadBroadcast} from '../common/imagemanagement/imedium-upload-broadcast';

declare var tinyMCE: any;

export class ContentDetailComponent {
  private static selector = 'mas-content-detail-component';
  private static templateUrl = './app/contents/content-detail-component.html';

  private content: IContent;
  private imageList: any[] = [];
  private backgroundImageId: String;
  private ids: String[] = [];

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Content') private Content,
    @Inject('Medium') private Medium,
    @Inject('$stateParams') private $stateParams
  ) {

    // TODO fetch media differently
    Medium.findAll().then((data) => {
      Content.find($stateParams.id).then((data) => {
        this.content = data;

        tinyMCE.editors[0].setContent(this.content.data);

        var list = [];
        this.content.media.forEach(medium => {
          var url = $.cloudinary.url(medium.publicId, {
            format: 'jpg', width: 100, height: 100, crop: 'thumb'
          });
          list.push({title: 'a', value: url, medium: medium});
        });
        this.imageList = list;
      });
    });

    $scope.$on('imageUploaded', (e, data: IMediumUploadBroadcast) => {
      var medium = data.medium;
      medium.mediumableId = this.content.id;
      medium.mediumableType = 'Content';
      Medium.update(medium.id, {medium: medium});
      var url = $.cloudinary.url(medium.publicId, {
        format: 'jpg', width: 100, height: 100, crop: 'thumb'
      });
      this.imageList.push({title: this.imageList.length, value: url, medium: medium});
    });
  }

  save() {
    this.content.data = tinyMCE.editors[0].getContent();
    this.Content.update(this.content.id, {content: this.content});
  }
}
