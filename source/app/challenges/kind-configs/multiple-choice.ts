import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from '../../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../../media/imedium';


export class Multiplechoice {
  public static selector = 'mas-challenges-multiple-choice';
  public static templateUrl = './app/challenges/kind-configs/multiple-choice.html';

  private data:any;

  private static options = {
    bindToController: {
      data: '='
    }
  };

  constructor(@Inject('$scope') protected $scope,
              @Inject('Medium') protected Medium) {
    if (!this.data.answers) {
      this.data.answers = [];
    }

    if (this.data.type === undefined) {
      this.data.type = 'text';
    }
  }

  getUnusedAnswerIndex() {
    var i = -1;
    var used:boolean;
    do {
      i++;
      used = false;
      this.data.answers.forEach(a => {
        if (a.idx === i) {
          used = true;
        }
      });
    } while (used);
    return i;
  }

  removeAnswer(index) {
    if (this.data.correctAnswer) {
      if (this.data.answers[index].idx === this.data.correctAnswer) {
        this.data.correctAnswer = undefined;
      }
    }
    this.data.answers.splice(index, 1);
  }

  addAnswer() {
    this.data.answers.push(
      {
        text: '',
        idx: this.getUnusedAnswerIndex()
      }
    );
  }
}
