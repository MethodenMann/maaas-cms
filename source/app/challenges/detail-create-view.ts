import {Inject} from '../utils/di';
import {IArea} from '../areas/iarea';
import {FormView} from '../common/forms/form-view';
import {IChallenge} from "./ichallenge";

export class CreateView extends FormView {
  public static selector = 'mas-challenge-create-view';
  public static templateUrl = './app/challenges/detail-view.html';

  public area: IArea;
  private challenge: IChallenge = <IChallenge>{};

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$location') private $location,
    @Inject('$stateParams') private $stateParams,
    @Inject('$state') private $state,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge
  ) {
    super($scope);
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });

    this.challenge.data = {};
    this.challenge.areaId = this.$stateParams.areaId;
    this.challenge.kind = 'true-false';
  }


  save() {
    if (this.isFormValid()) {
      this.Challenge.create({ challenge: this.challenge }).then((challenge:IChallenge) => {
        alert('Erstellt'); //TODO: make sexy
        this.$scope.$broadcast('challenge.saved', challenge);
        this.$state.go("cms.areas.detail.challenges.update", {challengeId: challenge.id});
      });

    } else {
      this.focusFirstInputWithError();
    }
  }
}
