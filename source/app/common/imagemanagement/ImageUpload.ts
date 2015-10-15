import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from './imedium-upload-broadcast';
import {IMedium} from '../../media/imedium';

export class ImageUploadDirective {
  private static selector = 'image-upload';
  private static template = '<div id="uploadbutton" class="fileUpload btn btn-outline btn-success"> {{ \'imageupload_button\' | translate }} </div>';
  private static replace = true;

  private static options = {
    bindToController: {
      uploadId: '@'
    }
  };

  private uploadId: string;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('$rootScope') private $rootScope,
    @Inject('Medium') private Medium
  ) {}

  private handleSuccessfulUpload(data) {
    var upload: IMedium = {
      publicId: data.result.public_id,
      url: data.result.url
    };
    this.Medium.create({medium: upload})
    .then((medium) => {
      var data: IMediumUploadBroadcast = {uploadId: this.uploadId, medium: medium};
      // TODO we have to use rootScope here, because the ImageLoad directive
      //      which listenes to the event and usually is on the same level as the
      //      ImageUpload directive will not hear the event unless it comes from
      //      a parent scope.
      this.$rootScope.$broadcast('imageUploaded', data);
    });
  }

  private static link($scope, element: JQuery, attributes) {
    var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', {
      cloud_name: 'nmsg'
    });

    imageTag.bind('cloudinarydone', (e, data) => {
      $scope.ctrl.handleSuccessfulUpload(data);
    });

    element.find('#uploadbutton').append(imageTag);
  }
}
