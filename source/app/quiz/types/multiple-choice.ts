import {Inject} from '../../utils/di';

export class Multiplechoice {
  public static selector = 'mas-quiz-multiplce-choice';
  public static templateUrl = './app/quiz/types/multiple-choice.html';
  private quizConfig:any;
  private static options = {
    bindToController: {
      quizConfig: '='
    }
  };

  constructor() {
     this.quizConfig.name = "BLALBLABLA";
   }

}
