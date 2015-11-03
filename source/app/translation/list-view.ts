import {Inject} from '../utils/di';

export class ListView {
  private static selector = 'mas-translation-list-view';
  private static templateUrl = './app/translation/list-view.html';

  private fields:Array<any> = [];
  private values:{string?:Array<any>};
  private mainLanguage:string = 'en';
  private currentLanguage:string = 'de';
  // private locales = ['de', 'it', 'fr'];
  private locales = ['de', 'it'];

  private currentModelIndex:number = 0;
  // private currentModel:any;
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

      this.currentModelType.findAll({locale: this.mainLanguage, translations: "yes"}).then((models) => {
        // it is very important that these fields get defined only when the contents
        // are loaded!!
        this.fields.push({name: 'name', prefix: 'areas_details_name', inputType: 'input'});
        this.fields.push({name: 'data', prefix: 'areas_details_gototext', inputType: 'quiz-multiple-choice'});

        this.allModels = models;
        this.values = {};
        this.values[this.mainLanguage] = {};
        for(let locale of this.locales) {
          this.values[locale] = {};
        }
        this.loadStuff();
      })
  }

  save() {
    for (let locale of this.locales) {
      var payload = {locale: locale};
      payload[this.currentModelName] = this.values[locale];
      this.currentModelType.update(this.allModels[this.currentModelIndex].id, payload);
    }
  }

  loadPreviousModel() {
    this.currentModelIndex--;
    if (this.currentModelIndex < 0) {
      this.currentModelIndex = 0;
    }
    this.loadModel();
  }

  loadNextModel() {
    this.currentModelIndex++;
    if (this.currentModelIndex >= this.allModels.length) {
      this.currentModelIndex = this.allModels.length - 1;
    }
    this.loadModel();
  }

  loadModel() {
    this.loadStuff();
  }

  loadFromModelsIntoValues(locale:string, fieldName:string, model:any) {
    this.values[locale][fieldName] = model[fieldName];
  }

  loadStuff() {
    for (let i = 0; i < this.fields.length; i++) {
      var fieldName = this.fields[i].name;
      this.loadFromModelsIntoValues(this.mainLanguage, fieldName, this.allModels[this.currentModelIndex]);
      for(let locale of this.locales) {
        this.loadFromModelsIntoValues(locale, fieldName, this.allModels[this.currentModelIndex].translations[locale]);
      }
    }
  }
}
