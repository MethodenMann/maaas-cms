import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from '../../common/image-management/imedium-upload-broadcast';
import {IMediumableUpdateBroadcast} from '../../common/image-management/Imediumable-update-broadcast';


export class TrueFalseQuestion {
  public static selector = 'mas-challenges-true-false-question';
  public static templateUrl = './app/challenges/kind-configs/true-false-question.html';


  private question:any;
  private index:number;

  private static options = {
    bindToController: {
      question: '=',
      data: '=',
      index: '='
    }
  };

  constructor(
    @Inject('$scope') protected $scope
  ) {

    $scope.$on('image-management.injectImage', (e, data:IMediumUploadBroadcast) => {
      this.handleImageDisplay(data.uploadId, data.mediumId);
    });

    $scope.$on('challenge.saved', (e, challenge) => {
      this.saveImageRelation(challenge.id);
    });
  }

  saveImageRelation(challengeId){
    if (this.question.imageId){
      var relationData: IMediumableUpdateBroadcast = {
        id: this.question.imageId,
        mediumableId: challengeId,
        mediumableType: 'challenge'
      };
      this.$scope.$broadcast("image-management.mediumableUpdate", relationData)
    }
  }

  handleImageDisplay(uploadId:string, mediumId) {
    if ((uploadId.indexOf('_') > -1) && (uploadId.split('_')[1] == this.index)) {
      this.question.imageId = mediumId;
    }
  }
}
