import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from "../../common/image-management/imedium-upload-broadcast";
import {IMedium} from "../../media/imedium";



export class TrueFalseQuestion {
  public static selector = 'mas-challenges-true-false-question';
  public static templateUrl = './app/challenges/kind-configs/true-false-question.html';


  private question:any;
  private data:any;
  private index:number;
  private static options = {
    bindToController: {
      question: '=',
      data: '=',
      index: '='
    }
  };

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$timeout') protected $timeout
  ) {

    $scope.$on('image-management.injectImage', (e, data:IMediumUploadBroadcast) => {
      this.handleImageDisplay(data.uploadId, data.mediumId);
    });

    $scope.$on('challenge.saved', (e, challenge) => {
      this.handleMediumableUpdate(challenge.id);
    });
  }


  handleMediumableUpdate(challengeId){
    if (this.question.imageId){
      var mediumableUpdateData = {
        id: this.question.imageId,
        mediumableId: challengeId,
        mediumableType: 'challenge'
      };
      this.$scope.$broadcast("image-management.mediumableUpdate", mediumableUpdateData)
    }
  }


  handleImageDisplay(uploadId:string, mediumId) {
    if (uploadId.indexOf('_' > -1) && uploadId.split('_')[1] == this.index) {
      this.question.imageId = mediumId;
    }
  }
}
