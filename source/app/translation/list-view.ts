import {Inject} from '../utils/di';

export class ListView {
  private static selector = 'mas-translation-list-view';
  private static templateUrl = './app/translation/list-view.html';

  private fields:Array<any> = [];
  private mainLanguage:string = 'en';
  private currentLanguage:string = 'de';
  private locales = ['de', 'it'];

  private currentModel:any;
  private allModels:Array<any>

  private currentModelType:any;
  private currentModelName:string;
  private currentModelIndex:number;

  private fieldConfigs = {
    'area': [
      {name: 'name', prefix: 'areas_details_name', inputType: 'input'},
      {name: 'gotoText', prefix: 'areas_details_gototext', inputType: 'input'}
    ],
    'content': [
      {name: 'title', prefix: 'areas_details_name', inputType: 'input'},
      {name: 'description', prefix: 'areas_details_name', inputType: 'input'},
      {name: 'data', prefix: 'areas_details_gototext', inputType: 'richtext'}
    ],
    'challenge': [
      {name: 'name', prefix: 'areas_details_name', inputType: 'input'},
      {name: 'data', prefix: 'areas_details_gototext', inputType: 'quiz-multiple-choice'}
    ]
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
  }

  save() {
    var payload = {};
    payload[this.currentModelName] = this.currentModel;
    this.currentModelType.update(this.currentModel.id, payload);

    // for (let locale of this.locales) {
    //   var payload = {locale: locale};
    //   payload[this.currentModelName] = this.currentModel.translations[locale];
    // }
  }

  selectedModelChanged() {
    this.currentModelType = this.selectedModel.modelType;
    this.currentModelName = this.selectedModel.value;
    this.fields = this.fieldConfigs[this.selectedModel.value];

    this.currentModelType.findAll({locale: this.mainLanguage, translations: "yes"}).then((models) => {
      this.allModels = models;
      this.currentModelIndex = 0;
      this.currentModel = this.allModels[this.currentModelIndex];
    })
  }
}
