import {Inject} from '../../utils/di';

interface ITrueFalseConfig {
  questions: any;
  trueAnswerText: string;
  falseAnswerText: string;
}


export class TrueFalse {
  public static selector = 'mas-challenges-true-false';
  public static templateUrl = './app/challenges/kind-configs/true-false.html';

  private data:ITrueFalseConfig;

  private static options = {
    bindToController: {
      data: '='
    }
  };

  constructor(
    @Inject('$scope') protected $scope
  ) {
    this.initializeConfig();

    $scope.$on('true-false.removeQuestion', (e, idx) => {
      this.removeQuestion(idx);
    });

  }

  initializeConfig()  {
    if (this.data.questions === undefined) {
      this.data.questions = [];
      this.addQuestion();
    }

    if (this.data.trueAnswerText === undefined) {
      this.data.trueAnswerText = 'Ja';
    }

    if (this.data.falseAnswerText === undefined) {
      this.data.falseAnswerText = 'Nein';
    }
  }

  removeQuestion(idx) {
    this.data.questions.splice(idx, 1);
  }

  addQuestion() {
    this.data.questions.push({});
  }
}
