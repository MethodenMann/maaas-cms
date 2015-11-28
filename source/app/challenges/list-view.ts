import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';

export class ListView {
  public static selector = 'mas-challenges-list-view';
  public static templateUrl = './app/challenges/list-view.html';
  private area;
  private challenges:IChallenge[] = [];

  constructor(@Inject('$location') private $location,
              @Inject('$stateParams') private $stateParams,
              @Inject('Area') private Area,
              @Inject('Challenge') private Challenge) {

    Challenge.findAll().then((data) => {
      Area.find(this.$stateParams.areaId).then((data) => {
        this.area = data;
        this.challenges = this.area.challenges;
      });
    });
  }
}
