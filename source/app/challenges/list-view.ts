import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';

export class ListView {
  public static selector = 'mas-quiz-list-view';
  public static templateUrl = './app/challenges/list-view.html';
  private area;
  private challenges: IChallenge[] = [];

  constructor(
    @Inject('$location') private $location,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge

    ) {
    Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });

    Challenge.findAll().then((data) => {
      this.challenges = data;
    });
  }
}
