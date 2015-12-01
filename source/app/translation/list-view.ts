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
    @Inject('Challenge') private Challenge,
    @Inject('Museum') private Museum,
    @Inject('Tour') private Tour
    ) {

    this.modelConfigs = [];
    this.modelConfigs.push({name: 'area', modelType: Area});
    this.modelConfigs.push({name: 'content', modelType: Content});
    this.modelConfigs.push({name: 'challenge', modelType: Challenge});
    // this.modelConfigs.push({name: 'museum', modelType: Museum});
    this.modelConfigs.push({name: 'tour', modelType: Tour});

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
    });

    $scope.$on('mas.request-translation-progress-update', () => {
      this.updateTranslationProgress();
    });
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
    return {width: `${n}%`};
  }

  getModeTemplate() {
    return `app/translation/${this.selectedMode}-mode-dummy.html`;
  }
}
