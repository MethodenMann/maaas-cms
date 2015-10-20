import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';
import {IArea} from '../areas/iarea';

export class UpdateView {
  public static selector = 'mas-challenge-update-view';
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

    this.Challenge.find(this.$stateParams.challengeId).then((data) => {
      this.challenge = data;
      console.log('CH', this.challenge);
    });


    this.Challenge.find(this.$stateParams.challengeId).then((d) => {
      console.log('LUEG', d);
    });

  }

  save() {
    console.log('update', this.challenge);
    this.Challenge.update(this.challenge.id, { challenge: this.challenge });
  }
}
