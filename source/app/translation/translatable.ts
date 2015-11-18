var locales = ['en', 'it', 'fr'];
var mainLocale = 'de';

var fieldConfigs = {
  'area': () => {
    return [
      {name: 'name', prefix: 'areas_details_name', inputType: 'simple-input-field'},
      {name: 'gotoText', prefix: 'areas_details_gototext', inputType: 'simple-input-field'}
    ];
  },
  'content': () => {
    return [
      {name: 'title', prefix: 'areas_details_name', inputType: 'simple-input-field'},
      {name: 'description', prefix: 'areas_details_name', inputType: 'simple-input-field'},
      {name: 'data', prefix: 'areas_details_gototext', inputType: 'tinymce-input-field'}
    ];
  },
  'challenge': (currentModel:any) => {
    return [
      {name: 'name', prefix: 'challenges_details_name', inputType: 'simple-input-field'},
      {name: 'data', prefix: 'translations_quiz_configuration_empty', inputType: `quiz-${currentModel.kind}`}
    ];
  },
  'museum': (currentModel:any) => {
    return [
      {name: 'name', prefix: 'museums_details_name', inputType: 'simple-input-field'},
      {name: 'description', prefix: 'museums_details_description', inputType: 'simple-input-field'}
    ];
  },
  'tour': (currentModel:any) => {
    return [
      {name: 'name', prefix: 'tours_details_name', inputType: 'simple-input-field'},
      {name: 'description', prefix: 'tours_details_description', inputType: 'simple-input-field'}
    ];
  }
};

var quizPreparators = {
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
  },

  'assign': (data) => {
    var clone = jQuery.extend(true, {}, data);
    // for (let question of clone.questions) {
    //   question.text = '';
    // }
    return clone;
  },

  'order': (data) => {
    var clone = jQuery.extend(true, {}, data);
    // for (let question of clone.questions) {
    //   question.text = '';
    // }
    return clone;
  },

  'image-region': (data) => {
    var clone = jQuery.extend(true, {}, data);
    // for (let question of clone.questions) {
    //   question.text = '';
    // }
    return clone;
  }
};

var modelPreparators = {
  'area': () => {}, 'content': () => {}, 'museum': () => {}, 'tour': () => {},
  'challenge': (currentModel:any) => {
    var preparator = quizPreparators[currentModel.kind];
    for (let locale of locales) {
      if (jQuery.isEmptyObject(currentModel.translations[locale].data)) {
        currentModel.translations[locale].data = preparator(currentModel.data);
      }
    }
  }
};

export class Translatable {
  public fieldConfig:any;

  constructor(public modelConfig:any, public model:any) {
    this.fieldConfig = fieldConfigs[modelConfig.name](model);
    this.prepareModel();
  }

  prepareModel() {
    modelPreparators[this.modelConfig.name](this.model);
  }

  getTranslationProgress() : [number, {}] {
    var translationsPerLocale = {};
    var total = 0;
    var progress = this.getTranslationProgressFor(this.model, this.fieldConfig);
    translationsPerLocale[mainLocale] = progress;
    total += progress;
    for (let locale of locales) {
      progress = this.getTranslationProgressFor(this.model.translations[locale], this.fieldConfig);
      translationsPerLocale[locale] = progress;
      total += progress;
    }
    return [total / (1 + locales.length), translationsPerLocale];
  }

  getTranslationProgressFor(model, fields) {
    var defined = 0;
    for (let field of fields) {
      if (model[field.name] !== undefined && model[field.name] !== null && model[field.name] !== '') {
        defined++;
      }
    }
    return defined / fields.length;
  }
}
