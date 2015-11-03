import {Inject} from '../utils/di';

export class ListView {
  private static selector = 'mas-translation-list-view';
  private static templateUrl = './app/translation/list-view.html';

  private fields:Array<any> = [];
  private mainLanguage:string = 'en';
  private currentLanguage:string = 'de';
  private locales = ['de', 'it'];

  private currentModelIndex:number = 0;
  private currentModelType:any;
  private currentModelName:string;
  private allModels:Array<any>

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
      })
  }

  save() {
    for (let locale of this.locales) {
      var payload = {locale: locale};
      payload[this.currentModelName] = this.allModels[this.currentModelIndex].translations[locale];
      this.currentModelType.update(this.allModels[this.currentModelIndex].id, payload);
    }
  }
}
