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

  private typeToTemplate = {
    'input': 'app/translation/simple-input-field.html',
    'richtext': 'app/translation/tinymce-input-field.html'
  }

  private templateName:string;
  private inputType:string;
  private tinymceConfig:any;

  constructor(
    @Inject('$scope') protected $scope
  ) {
    this.templateName = this.typeToTemplate[this.inputType];

    this.tinymceConfig = {
      menu: {},
      toolbar: 'undo redo | bold italic | link image',
      image_dimensions: false,
      height: 400
    }
  }

}
