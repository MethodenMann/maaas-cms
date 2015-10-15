import {Inject} from '../utils/di';
import {IArea} from './IArea';

export abstract class DetailAbstract {
  protected area: IArea;
  protected areaform: any;

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area
    ) {
    this.loadData();
  }
  abstract save(): void;

  protected loadData(): void { }

  protected isFormValid(): Boolean {
    return this.$scope.areaform.$valid;
  }

  private isValidAndSubmitted(inputName: string) {
    if (this.$scope.areaform[inputName]) {
      return this.$scope.areaform[inputName].$invalid && this.$scope.areaform.$submitted;
    }
    return false;
  }

  protected focusFirstInputWithError() {
    $('input.ng-invalid').first().focus();
  }
}
