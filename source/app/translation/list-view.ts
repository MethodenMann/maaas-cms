import {Inject} from '../utils/di';

export class ListView {
  private static selector = 'mas-translation-list-view';
  private static templateUrl = './app/translation/list-view.html';

  private fields:Array<any> = [];
  private mainLanguage:string = 'de';
  private currentLanguage:string = 'en';
  private locales = ['en', 'it', 'fr'];

  private currentModel:any;
  private allModels:Array<any>

  private currentModelType:any;
  private currentModelName:string;
  private currentModelIndex:number;

  private fieldConfigs = {
    'area': () => { return [
      {name: 'name', prefix: 'areas_details_name', inputType: 'input'},
      {name: 'gotoText', prefix: 'areas_details_gototext', inputType: 'input'}
    ]},
    'content': () => { return [
      {name: 'title', prefix: 'areas_details_name', inputType: 'input'},
      {name: 'description', prefix: 'areas_details_name', inputType: 'input'},
      {name: 'data', prefix: 'areas_details_gototext', inputType: 'richtext'}
    ]},
    'challenge': (currentModel:any) => {
      return [
        {name: 'name', prefix: 'challenges_details_name', inputType: 'input'},
        {name: 'data', prefix: 'areas_details_gototext', inputType: `quiz-${currentModel.kind}`}
      ]
    }
  }

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
  }

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
  }

  private modelConfigs:Array<{value:string, modelType:any}>;
  private selectedModel:{value:string, modelType:any};

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Area') private Area,
    @Inject('Content') private Content,
    @Inject('Challenge') private Challenge
    ) {

    this.modelConfigs = [];
    this.modelConfigs.push({value: 'area', modelType: Area});
    this.modelConfigs.push({value: 'content', modelType: Content});
    this.modelConfigs.push({value: 'challenge', modelType: Challenge});
  }

  loadPreviousModel() {
    this.currentModelIndex = Math.max(0, --this.currentModelIndex);
    this.loadModel();
  }

  loadNextModel() {
    this.currentModelIndex = Math.min(this.allModels.length - 1, ++this.currentModelIndex);
    this.loadModel();
  }

  loadModel() {
    this.currentModel = this.allModels[this.currentModelIndex];
    this.prepareFieldsForCurrentModel();
    this.prepareModel();
  }

  save() {
    var payload = {};
    payload[this.currentModelName] = this.currentModel;
    payload['locale'] = this.mainLanguage;
    this.currentModelType.update(this.currentModel.id, payload);
  }

  prepareFieldsForCurrentModel() {
    this.fields = this.fieldConfigs[this.selectedModel.value](this.currentModel);
  }

  prepareModel() {
    this.modelPreparators[this.selectedModel.value](this.currentModel);
  }

  selectedModelChanged() {
    this.currentModelType = this.selectedModel.modelType;
    this.currentModelName = this.selectedModel.value;

    this.currentModelType.findAll({locale: this.mainLanguage, translations: "yes"}).then((models) => {
      this.allModels = models;
      this.currentModelIndex = 0;
      this.loadModel();
    })
  }
}
