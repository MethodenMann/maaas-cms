import {Inject} from '../../utils/di';

export class Multiplechoice {
  public static selector = 'mas-quiz-multiplce-choice';
  public static templateUrl = './app/quiz/types/multiple-choice.html';
  private quizConfig: any;
  private static options = {
    bindToController: {
      quizConfig: '='
    }
  };

  constructor() {
    this.quizConfig.answers = [];
  }

  getUnusedAnwerIndex() {
    var i = -1;
    var used: boolean;
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
    if (this.quizConfig.correctAnswer){
      if (this.quizConfig.answers[index].idx == this.quizConfig.correctAnswer){
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
