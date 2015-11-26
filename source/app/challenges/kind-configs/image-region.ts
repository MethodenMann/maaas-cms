import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from '../../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../../media/imedium';
import {IMediumableUpdateBroadcast} from '../../common/image-management/Imediumable-update-broadcast';


export class ImageRegion {
  public static selector = 'mas-challenges-image-region';
  public static templateUrl = './app/challenges/kind-configs/image-region.html';
  private data:any;

  private static options = {
    bindToController: {
      data: '='
    }
  };

  constructor(@Inject('$scope') protected $scope,
              @Inject('Medium') protected Medium) {

    $scope.$on('image-management.injectImage', (e, data:IMediumUploadBroadcast) => {
      this.handleImageDisplay(data.uploadId, data.mediumId);
    });

    $scope.$on('challenge.saved', (e, challenge) => {
        this.saveImageRelation(challenge.id, this.data.imageId );
        this.saveImageRelation(challenge.id, this.data.imageSolvedId );
    });
  }

  saveImageRelation(challengeId, imageId) {
    if (imageId) {
      var relationData: IMediumableUpdateBroadcast = {
        id: imageId,
        mediumableId: challengeId,
        mediumableType: 'challenge'
      };
      this.$scope.$broadcast('image-management.mediumableUpdate', relationData);
    }
  }

  handleImageDisplay(uploadId:string, mediumId) {
      this.data[uploadId] = mediumId;
  }


}
