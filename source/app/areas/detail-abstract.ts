import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {FormView} from '../common/forms/form-view';

export abstract class DetailAbstract extends FormView {
  protected area: IArea;

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area,
    @Inject('$state') protected $state
    ) {
    super($scope);
    this.loadData();
  }

  protected loadData(): void {}
  abstract saveHook(): void;


  protected save() {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    if (this.isFormValid()) {
      this.saveHook();
    } else {
      this.$scope.$broadcast('mas.saveprogess', 'rejected');
      this.focusFirstInputWithError();
    }
  }
}
