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
    this.LoadData();
  }
  abstract Save(): void;

  protected LoadData(): void { }

  protected IsFormValid(): Boolean {
    return this.$scope.areaform.$valid;
  }

  private IsValidAndSubmitted(inputName: string) {
    if (this.$scope.areaform[inputName]) {
      return this.$scope.areaform[inputName].$invalid && this.$scope.areaform.$submitted;
    }
    return false;
  }
  
  protected FocusFirstInputWithError() {
    $('input.ng-invalid').first().focus();
  }
}
