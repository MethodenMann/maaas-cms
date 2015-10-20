import {Inject} from '../../utils/di';

export abstract class FormView {
  constructor(protected $scope) {}

  protected isFormValid(): Boolean {
    return this.$scope.form.$valid;
  }

  protected focusFirstInputWithError() {
    $('input.ng-invalid').first().focus();
  }
}
