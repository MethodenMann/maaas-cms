import {Inject} from '../../utils/di';

export class FormGroupComponent {
  private static selector = 'mas-form-group';
  private static templateUrl = './app/common/forms/form-group-component.html';

  private static options = {
    transclude: true,
    require: '^form',
    bindToController: {
      fieldName: '@',
      localizationPrefix: '@',
      hideLabel: '@',
      hideHelp: '@',
      hideError: '@'
    }
  };

  private form:any;
  private fieldName:string;
  private localizationPrefix:string;
  private hideLabel:boolean = false;
  private hideHelp:boolean = false;
  private hideError:boolean = false;

  constructor(@Inject('$scope') private $scope) {
  }

  isValidAndSubmitted() {
    if (this.form && this.form[this.fieldName]) {
      return this.form[this.fieldName].$invalid && this.form.$submitted;
    }
    return false;
  }

  localizedName():string {
    return this.localizationPrefix + '_label';
  }

  localizedHelp():string {
    return this.localizationPrefix + '_help';
  }

  localizedError():string {
    return this.localizationPrefix + '_error';
  }

  private static link($scope, element:JQuery, attributes, FormController, transcludeFn) {

    $scope.ctrl.form = FormController;


    element.find('input').attr('onblur', 'ctrl.publishPreview()');


  }




}
