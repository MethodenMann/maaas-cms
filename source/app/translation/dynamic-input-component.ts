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
    'input': 'app/translation/dynamic-input-component/simple-input-field.html',
    'richtext': 'app/translation/dynamic-input-component/tinymce-input-field.html',
    'quiz-multiple-choice': 'app/translation/dynamic-input-component/quiz-multiple-choice.html',
    'quiz-true-false': 'app/translation/dynamic-input-component/quiz-true-false.html',
    'quiz-assign': 'app/translation/dynamic-input-component/quiz-assign.html'
  };

  private templateName:string;
  private inputType:string;
  private tinymceConfig:any;
  private bindTo:any;

  constructor(
    @Inject('$scope') protected $scope
  ) {
    this.templateName = this.typeToTemplate[this.inputType];

    this.tinymceConfig = {
      menu: {},
      toolbar: 'undo redo | bold italic | link image',
      image_dimensions: false,
      height: 400
    };
  }
}
