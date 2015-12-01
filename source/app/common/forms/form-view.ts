import {Inject} from '../../utils/di';

export abstract class FormView {
  constructor(protected $scope) {
  }

  protected isFormValid():Boolean {
    return this.$scope.form.$valid;
  }

  protected focusFirstInputWithError() {
    $('input.ng-invalid').first().focus();
  }


  protected watchFunc;
  protected regististerDebouncewWatch($timeout, objName, func) {
    this.watchFunc = func;

    this.$scope.$watch(objName,
      (newVal, oldVal) => {
        this.watchDebounce($timeout, newVal, oldVal);
      }, true);

  }

  private timeout;
  private watchDebounce($timeout, newVal, oldVal) {
    if (newVal !== oldVal) {
      if (this.timeout) {
        $timeout.cancel(this.timeout);
      }
      this.timeout = $timeout(() => this.watchFunc(), 500);
    }
  }
}
