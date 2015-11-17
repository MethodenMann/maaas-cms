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
  private filteredTranslatables:Array<Translatable> = [];

  private currentTranslationProgress = 0;

  private selectedMode:string;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('$q') private $q,
    @Inject('Area') private Area,
    @Inject('Content') private Content,
    @Inject('Challenge') private Challenge
    ) {

    this.modelConfigs = [];
    this.modelConfigs.push({name: 'area', modelType: Area});
    this.modelConfigs.push({name: 'content', modelType: Content});
    this.modelConfigs.push({name: 'challenge', modelType: Challenge});

    var promises = [];

    for (let modelConfig of this.modelConfigs) {
      // this needs to be called in a self executing function, otherwise
      // the modelConfig variable gets overridden for other promises
      ((modelConfig) => {
        var promise = modelConfig.modelType.findAll({locale: this.mainLanguage, translations: 'yes'}).then((models) => {
          for (let model of models) {
            this.translatables.push(new Translatable(modelConfig, model));
          }
        });
        promises.push(promise);
      })(modelConfig);
    }

    $q.all(promises).then(() => {
      this.updateTranslationProgress();
    })
  }

  getTranslatable() {
    return this.translatables[this.currentModelIndex];
  }

  loadPreviousModel() {
    this.save();
    this.currentModelIndex = Math.max(0, --this.currentModelIndex);
  }

  loadNextModel() {
    this.save();
    this.currentModelIndex = Math.min(this.translatables.length - 1, ++this.currentModelIndex);
  }

  save() {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    var payload = {};
    var translatable = this.getTranslatable();
    payload[translatable.modelConfig.name] = translatable.model;
    payload['locale'] = this.mainLanguage;
    translatable.modelConfig.modelType.update(translatable.model.id, payload).then(() => {
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });
    this.updateTranslationProgress();
  }

  updateTranslationProgress() {
    var allTotal = 0;
    for (let translatable of this.translatables) {
      var [total, perLocale] = translatable.getTranslationProgress();
      allTotal += total;
    }
    this.currentTranslationProgress = (allTotal / this.translatables.length);
  }

  getProgressBarStyle() {
    var n = this.currentTranslationProgress * 100;
    return {width: `${n}%`}
  }
}
