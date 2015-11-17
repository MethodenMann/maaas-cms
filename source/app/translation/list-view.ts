import {Inject} from '../utils/di';
import {Translatable} from './translatable';

export class ListView {
  private static selector = 'mas-translation-list-view';
  private static templateUrl = './app/translation/list-view.html';

  private mainLanguage:string = 'de';
  private currentLanguage:string = 'en';
  private locales = ['en', 'it', 'fr'];

  private currentModelIndex:number = 0;

  private modelConfigs:Array<{name:string, modelType:any}>;

  private translatables:Array<Translatable> = [];

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Area') private Area,
    @Inject('Content') private Content,
    @Inject('Challenge') private Challenge
    ) {

    this.modelConfigs = [];
    this.modelConfigs.push({name: 'area', modelType: Area});
    this.modelConfigs.push({name: 'content', modelType: Content});
    this.modelConfigs.push({name: 'challenge', modelType: Challenge});

    for (let modelConfig of this.modelConfigs) {
      // this needs to be called in a self executing function, otherwise
      // the modelConfig variable gets overridden for other promises
      ((modelConfig) => {
        modelConfig.modelType.findAll({locale: this.mainLanguage, translations: 'yes'}).then((models) => {
          for (let model of models) {
            this.translatables.push(new Translatable(modelConfig, model));
          }
        });
      })(modelConfig);
    }
  }

  getTranslatable() {
    return this.translatables[this.currentModelIndex];
  }

  loadPreviousModel() {
    this.currentModelIndex = Math.max(0, --this.currentModelIndex);
  }

  loadNextModel() {
    this.currentModelIndex = Math.min(this.translatables.length - 1, ++this.currentModelIndex);
  }

  save() {
    var payload = {};
    var translatable = this.getTranslatable();
    payload[translatable.modelConfig.name] = translatable.model;
    payload['locale'] = this.mainLanguage;
    translatable.modelConfig.modelType.update(translatable.model.id, payload);
  }

  getTranslationProgressForModel(model:any) {

  }
}
