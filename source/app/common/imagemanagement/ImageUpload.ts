import {Inject} from '../../utils/di';

export class ImageUploadDirective {
  private static selector = 'image-upload';
  private static template = '<div id="uploadbutton" class="fileUpload btn btn-outline btn-success"> {{ \'imageupload_button\' | translate }} </div>';
  private static replace = true;

  private static options = {
    bindToController: {
      imageMetaData: '='
    }
  };

  private imageMetaData: any;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Medium') private Medium
  ) {

  }

  private handleSuccessfulUpload(data) {
    this.Medium.create({medium: {publicId: data.result.public_id, url: data.result.url}})
    .then((data) => {
      this.$scope.$emit('imageUploaded', data);
      this.imageMetaData = data;
      this.$scope.$apply();
    });
  }

  private static link($scope, element: JQuery, attributes) {
    var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', {
      cloud_name: 'nmsg'
    });

    element.find('#uploadbutton').append(imageTag);

    imageTag.bind('cloudinarydone', (e, data) => {
      $scope.ctrl.handleSuccessfulUpload(data);
    });
  }
}
