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
      // TODO We have to use rootScope here, because the ImageLoad directive
      //      which listenes to the event and usually is on the same level as the
      //      ImageUpload directive will not hear the event unless it comes from
      //      a parent scope.
      // We need two broadcast, because we need to handle two different things
      // that might occur separately:
      // imageUpload needs to be used for the case where a new image was
      // uploaded. This event is useful for a component where a new model
      // is created that has references to media, such as the area creation view.
      // injectImage is needs to be used for the case where an image is already
      // stored in the DB and only needs to be displayed again, such as the
      // area update view.
      this.$rootScope.$broadcast('image-management.imageUploaded', data);
      this.$rootScope.$broadcast('image-management.injectImage', data);
    });
  }

  private static link($scope, element: JQuery, attributes) {
    var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', {
      cloud_name: 'nmsg', folder: 'dev'
    }); //TODO: Change static dev folder to museum directory

    imageTag.bind('cloudinarydone', (e, data) => {
      $scope.ctrl.handleSuccessfulUpload(data);
    });

    element.find('#uploadbutton').append(imageTag);
  }
}
