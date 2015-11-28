import {Inject} from '../utils/di';
export class DynamicInputComponent {
  private static selector = 'mas-dynamic-input-component';
  private static template = '<div ng-include="ctrl.templateName"></div>';

  private static options = {
    bindToController: {
      bindTo: '=',
      inputType: '@'
    },
    transclude: true
  };

  private templateName:string;
  private inputType:string;
  private tinymceConfig:any;
  private bindTo:any;

  constructor(
    @Inject('$scope') protected $scope
  ) {
    this.templateName = `app/translation/dynamic-input-component/${this.inputType}.html`;

    this.tinymceConfig = {
      menu: {},
      toolbar: 'undo redo | bold italic | link image',
      image_dimensions: false,
      height: 400
    };
  }
}
