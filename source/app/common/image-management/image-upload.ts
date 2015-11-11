import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from './imedium-upload-broadcast';
import {IMediumableUpdateBroadcast} from './Imediumable-update-broadcast';
import {IMedium} from '../../media/imedium';


export class ImageUploadDirective {
  private static selector = 'image-upload';
  private static template = `<btn id="uploadbutton" class="fileUpload btn mas-image-upload-btn">
                                    <i class="fa fa-image"/>
                                    {{ \'imageupload_button\' | translate }} </btn>`;
  private static replace = true;

  private static options = {
    bindToController: {
      uploadId: '@',
      mediumId: '='
    }
  };

  private uploadId: string;
  private mediumId: number;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('$rootScope') private $rootScope,
    @Inject('Medium') private Medium,
    @Inject('Auth') private Auth,
    @Inject('Museum') private Museum
  ) {

    this.$scope.$on('image-management.mediumableUpdate', (e, data) => {
      this.handleMediumAbleUpdate(data);
    });
  }

  private handleMediumAbleUpdate(data: IMediumableUpdateBroadcast) {
    this.Medium.update(data.id, {medium: data});
  }

  private handleSuccessfulUpload(data) {
    var upload: IMedium = {
      publicId: data.result.public_id,
      url: data.result.url
    };
    this.Medium.create({medium: upload})
    .then((medium) => {
      var data: IMediumUploadBroadcast = {uploadId: this.uploadId, mediumId: medium.id};
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
      this.$rootScope.$broadcast('image-management.imageUploaded', data); //TODO: brauchts das?
      this.$rootScope.$broadcast('image-management.injectImage', data);
      this.mediumId = medium.id;
    });
  }

  private static link($scope, element: JQuery, attributes) {
    var museumId = $scope.ctrl.Auth._currentUser.museum_id;

    $scope.ctrl.Museum.find(museumId).then((museum) => { //TODO: Own Service for this  authentication
       var museumFolder = museum.name.replace(/[^A-Z0-9]/ig, "").toLowerCase();

      console.log('museumFolder',museumFolder );
      var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', {
        cloud_name: 'nmsg', folder: museumFolder
      }); //TODO: Change static dev folder to museum directory

      imageTag.bind('cloudinarydone', (e, data) => {
        $scope.ctrl.handleSuccessfulUpload(data);
      });

      element.find('#uploadbutton').append(imageTag);
    })


  }
}
