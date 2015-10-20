import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from '../../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../../media/imedium';


export class Multiplechoice {
  public static selector = 'mas-quiz-multiplce-choice';
  public static templateUrl = './app/quiz/types/multiple-choice.html';
  private quizConfig:any;
  private static options = {
    bindToController: {
      quizConfig: '='
    }
  };

  constructor(@Inject('$scope') protected $scope,
              @Inject('Medium') protected Medium) {
    this.quizConfig.answers = [];

    $scope.$on('image-management.injectImage', (e, data:IMediumUploadBroadcast) => {
      console.log("BC", e, data);
      this.handleImageDisplay(data.uploadId, data.medium);
    });
  }

  getUnusedAnwerIndex() {
    var i = -1;
    var used:boolean;
    do {
      i++;
      used = false;
      this.quizConfig.answers.forEach(a => {
        if (a.idx == i) {
          used = true;
        }
      });
    } while (used);
    return i;
  }

  removeAnswer(index) {
    console.log(index);
    if (this.quizConfig.correctAnswer) {
      if (this.quizConfig.answers[index].idx == this.quizConfig.correctAnswer) {
        this.quizConfig.correctAnswer = undefined;
      }
    }
    this.quizConfig.answers.splice(index, 1);
  }

  correctAnswerChanged(index) {
    console.log("changed", index);
    this.quizConfig.correctAnswer = index;
  }

  addAnswer() {
    this.quizConfig.answers.push(
        {
          text: "",
          idx: this.getUnusedAnwerIndex()
        }
    )
  }
}
