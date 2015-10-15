import {Inject} from '../utils/di';

export class ListView {
  public static selector = 'mas-quiz-list-view';
  public static templateUrl = './app/quiz/list-view.html';
  public area;


  constructor(
    @Inject('$location') private $location,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area
    ) {
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });
  }
}
