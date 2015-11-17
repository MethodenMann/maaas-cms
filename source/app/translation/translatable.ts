export class Translatable {
  private locales = ['en', 'it', 'fr'];
  public fieldConfig:any;

  constructor(public modelConfig:any, public model:any) {
    this.fieldConfig = this.fieldConfigs[modelConfig.name](model);
  }

  prepareModel() {
    this.modelPreparators[this.modelConfig.name](this.model);
  }

  private fieldConfigs = {
    'area': () => {
      return [
        {name: 'name', prefix: 'areas_details_name', inputType: 'input'},
        {name: 'gotoText', prefix: 'areas_details_gototext', inputType: 'input'}
      ];
    },
    'content': () => {
      return [
        {name: 'title', prefix: 'areas_details_name', inputType: 'input'},
        {name: 'description', prefix: 'areas_details_name', inputType: 'input'},
        {name: 'data', prefix: 'areas_details_gototext', inputType: 'richtext'}
      ];
    },
    'challenge': (currentModel:any) => {
      return [
        {name: 'name', prefix: 'challenges_details_name', inputType: 'input'},
        {name: 'data', prefix: 'areas_details_gototext', inputType: `quiz-${currentModel.kind}`}
      ];
    }
  };

  private quizPreparators = {
    'multiple-choice': (data) => {
      var clone = jQuery.extend(true, {}, data);
      for (let answer of clone.answers) {
        answer.text = '';
      }
      return clone;
    },

    'true-false': (data) => {
      var clone = jQuery.extend(true, {}, data);
      for (let question of clone.questions) {
        question.text = '';
      }
      return clone;
    }
  };

  private modelPreparators = {
    'area': () => {}, 'content': () => {},
    'challenge': (currentModel:any) => {
      var preparator = this.quizPreparators[currentModel.kind];
      for (let locale of this.locales) {
        if (jQuery.isEmptyObject(currentModel.translations[locale].data)) {
          currentModel.translations[locale].data = preparator(currentModel.data);
        }
      }
    }
  };
}
