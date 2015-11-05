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
    this.constructorHook();
  }

  protected constructorHook() {}
  protected loadData(): void {}
  abstract save(): void;
}
