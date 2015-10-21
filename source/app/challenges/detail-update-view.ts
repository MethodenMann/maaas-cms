import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';
import {IArea} from '../areas/iarea';
import {FormView} from '../common/forms/form-view';

export class UpdateView extends FormView {
  public static selector = 'mas-challenge-update-view';
  public static templateUrl = './app/challenges/detail-view.html';

  public area: IArea;
  private challenge: IChallenge = <IChallenge>{};

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$location') private $location,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge
  ) {
    super($scope);
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });

    this.Challenge.find(this.$stateParams.challengeId).then((data) => {
      this.challenge = data;
    });
  }

  save() {
    if (this.isFormValid()) {
      this.Challenge.update(this.challenge.id, { challenge: this.challenge });
      alert('Gespeichert'); //TODO: make sexy
    } else {
      this.focusFirstInputWithError();
    }

  }
}
