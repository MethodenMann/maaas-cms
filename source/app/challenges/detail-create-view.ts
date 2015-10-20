import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';
import {IArea} from '../areas/iarea';

export class CreateView {
  public static selector = 'mas-challenge-create-view';
  public static templateUrl = './app/challenges/detail-view.html';

  public area: IArea;
  private challenge: IChallenge = <IChallenge>{};

  constructor(
    @Inject('$location') private $location,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge
    ) {
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });

    this.challenge.data = {};
    this.challenge.area_id = this.$stateParams.areaId;
    this.challenge.kind = 'multiple-choice';


  }

  save() {
    console.log('save', this.challenge);
    this.Challenge.create({ challenge: this.challenge });
  }
}
