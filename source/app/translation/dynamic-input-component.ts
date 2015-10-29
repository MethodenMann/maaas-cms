import {Inject} from '../utils/di';
export class DynamicInputComponent {
  private static selector = 'mas-dynamic-input-component';
  private static template = '<div ng-include="ctrl.templateName"></div>';

  private static options = {
    bindToController: {
      bindTo: '=',
      inputType: '@',
      original: '='
    },
    transclude: true
  };

  private typeToTemplate = {
    'input': 'app/translation/simple-input-field.html',
    'richtext': 'app/translation/tinymce-input-field.html',
    'quiz-multiple-choice': 'app/translation/quiz-multiple-choice.html'
  }

  private quizPreparators = {
    'quiz-multiple-choice': function(data) {
      var clone = jQuery.extend(true, {}, data);
      for (let answer of clone.answers) {
        answer.text = '';
      }
      return clone;
    }
  }

  private templateName:string;
  private inputType:string;
  private tinymceConfig:any;
  private original:any;
  private bindTo:any;

  constructor(
    @Inject('$scope') protected $scope
  ) {
    this.templateName = this.typeToTemplate[this.inputType];

    if (this.original) {
      if (this.inputType.indexOf('quiz-') === 0) {
        this.bindTo = this.quizPreparators[this.inputType](this.original);
      }
    }

    this.tinymceConfig = {
      menu: {},
      toolbar: 'undo redo | bold italic | link image',
      image_dimensions: false,
      height: 400
    }
  }
}
