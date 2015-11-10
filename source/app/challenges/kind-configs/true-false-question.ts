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
  }

  removeQuestion() {
    this.$scope.$emit('true-false.removeQuestion', this.index);
  }


}
