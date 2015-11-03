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

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge
    ) {

      this.currentModelType = this.Challenge;
      this.currentModelName = 'challenge';

      this.fields.push({name: 'name', prefix: 'areas_details_name', inputType: 'input'});
      this.fields.push({name: 'data', prefix: 'areas_details_gototext', inputType: 'quiz-multiple-choice'});

      this.currentModelType.findAll({locale: this.mainLanguage, translations: "yes"}).then((models) => {
        this.allModels = models;
        this.currentModelIndex = 0;
        this.currentModel = this.allModels[this.currentModelIndex];
      })
  }

  loadPreviousModel() {
    this.currentModelIndex = Math.max(0, --this.currentModelIndex);
    this.loadModel();
  }

  loadNextModel() {
    this.currentModelIndex = Math.min(0, ++this.currentModelIndex);
    this.loadModel();
  }

  loadModel() {
    this.currentModel = this.allModels[this.currentModelIndex];
  }

  save() {
    for (let locale of this.locales) {
      var payload = {locale: locale};
      payload[this.currentModelName] = this.currentModel.translations[locale];
      this.currentModelType.update(this.currentModel.id, payload);
    }
  }
}
