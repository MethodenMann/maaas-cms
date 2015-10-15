import {Inject} from '../../utils/di';

export class FormGroupComponent {
  private static selector = 'mas-form-group-component';
  private static templateUrl = './app/common/forms/form-group-component.html';

  private static options = {
    transclude: true,
    require: '^form',
    bindToController: {
      fieldName: '@',
      localizationPrefix: '@'
    }
  }

  private form: any;
  private fieldName: string;
  private localizationPrefix: string;

  constructor(
    @Inject('$scope') private $scope
  ) {
  }

  private isValidAndSubmitted() {
    if (this.form[this.fieldName]) {
      return this.form[this.fieldName].$invalid && this.form.$submitted;
    }
    return false;
  }

  private localizedName() : string {
    return this.localizationPrefix + '_label';
  }

  private localizedHelp() : string {
    return this.localizationPrefix + '_help';
  }

  private localizedError() : string {
    return this.localizationPrefix + '_error';
  }

  private static link($scope, element: JQuery, attributes, FormController) {
    $scope.ctrl.form = FormController;
  }
}
