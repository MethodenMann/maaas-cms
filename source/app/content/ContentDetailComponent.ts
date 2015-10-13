import {Inject} from '../utils/di';

export class ContentDetailComponent {
  private static selector = 'mas-content-detail-component';
  private static templateUrl = './app/content/content-detail-component.html';

  private imageList: Object[] = [];
  private backgroundImageId: String;
  private ids: String[] = [];

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Content') private Content,
    @Inject('$stateParams') private $stateParams
  ) {
    Content.find($stateParams.contentId).then((data) => {
      var list = []
      data.media.forEach(medium => {
        var url = $.cloudinary.url(medium.publicId, {
          format: 'jpg', width: 100, height: 100, crop: 'thumb'
        });
        list.push({title: "a", value: url, imageMetaData: medium});
      });
      this.imageList = list;
    });

    $scope.$on('imageUploaded', (e, imageMetaData) => {
      var url = $.cloudinary.url(imageMetaData.publicId, {
        format: 'jpg', width: 100, height: 100, crop: 'thumb'
      });
      this.imageList.push({title: this.imageList.length, value: url, imageMetaData: imageMetaData});
    });

    // this.imageList.push({title: 'Bild', value: 'http://res.cloudinary.com/nmsg/image/upload/v1444722014/xvcvryjuwjseytucowxw.png', imageMetaData: {publicId: 'xvcvryjuwjseytucowxw'}});
    // this.imageList.push({title: 'Bild', value: 'http://res.cloudinary.com/nmsg/image/upload/v1444722014/xvcvryjuwjseytucowxw.png', imageMetaData: {publicId: 'xvcvryjuwjseytucowxw'}});
    // this.imageList.push({title: 'Bild', value: 'http://res.cloudinary.com/nmsg/image/upload/v1444722014/xvcvryjuwjseytucowxw.png', imageMetaData: {publicId: 'xvcvryjuwjseytucowxw'}});
  }
}
