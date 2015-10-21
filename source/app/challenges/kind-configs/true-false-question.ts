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
    @Inject('Medium') protected Medium
  ) {
    $scope.$on('image-management.injectImage', (e, data:IMediumUploadBroadcast) => {
      this.handleImageDisplay(data.uploadId, data.medium);
    });


    this.Medium.find(this.question.imageId).then((data) => {
      var bcData: IMediumUploadBroadcast = {uploadId: "question_"+ this.index, medium: data};
      this.$scope.$broadcast('image-management.injectImage', bcData);
    });
  }

  protected handleImageDisplay(uploadId:string, medium:IMedium) {
      if (uploadId.indexOf('_' > -1) && uploadId.split('_')[1] == this.index){
        this.question.imageId = medium.id;
      }
  }
}
