import {Inject} from '../../utils/di';

interface iTrueFalseConfig{
  questions: any;
  trueAnswerText: string;
  falseAnswerText: string;
}


export class TrueFalse {
  public static selector = 'mas-challenges-true-false';
  public static templateUrl = './app/challenges/kind-configs/true-false.html';


  private data:iTrueFalseConfig;

  private static options = {
    bindToController: {
      data: '='
    }
  };

  constructor() {
    this.initializeConfig();
  }

  initializeConfig()  {
    if (this.data.questions === undefined){
      this.data.questions = []
    }

    if (this.data.trueAnswerText === undefined){
      this.data.trueAnswerText = 'Ja';
    }

    if (this.data.falseAnswerText === undefined){
      this.data.falseAnswerText = 'Nein';
    }
  }

  addQuestion(){
    this.data.questions.push({})
  }
}
