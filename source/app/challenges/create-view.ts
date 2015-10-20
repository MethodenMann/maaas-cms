import {Inject} from '../utils/di';

export class CreateView {
  public static selector = 'mas-quiz-create-view';
  public static templateUrl = './app/challenges/create-view.html';

  public area;
  selectedtype: string;
  private quizConfig: any = {};

  constructor(
    @Inject('$location') private $location,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area
    ) {
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });

    this.selectedtype = "multiple-choice";

  }

  save(){
    console.log('save', this.selectedtype, this.quizConfig )
  }
}
