import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';
import {IArea} from '../areas/iarea';
import {FormView} from '../common/forms/form-view';

export class CreateView extends FormView {
  public static selector = 'mas-challenge-create-view';
  public static templateUrl = './app/challenges/detail-view.html';

  public area: IArea;
  private challenge: IChallenge = <IChallenge>{};

  constructor(
    @Inject('$scope') private $scope,
    @Inject('$location') private $location,
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge
    ) {
    super($scope);
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });

    this.challenge.data = {};
    this.challenge.areaId = this.$stateParams.areaId;
    this.challenge.kind = 'multiple-choice';


  }

  save() {
    if (this.isFormValid()) {
      this.Challenge.create({ challenge: this.challenge });
      alert('Erstellt'); //TODO: make sexy
    } else {
      this.focusFirstInputWithError();
    }
  }
}
