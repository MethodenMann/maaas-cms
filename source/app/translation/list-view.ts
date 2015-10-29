import {Inject} from '../utils/di';
import {IArea} from '../areas/iarea';

export class ListView {
  private static selector = 'mas-translation-list-view';
  private static templateUrl = './app/translation/list-view.html';

  private fields:Array<any> = [];
  private values:{string?:Array<any>};
  private mainLanguage:string = 'de';
  private currentLanguage:string = 'en';
  private locales = ['en', 'de', 'it', 'fr'];

  private currentModelIndex:number = 0;
  // private currentModel:any;
  private currentModelType:any;
  private allModels:Array<any>

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Area') private Area
    ) {
      this.fields.push({name: 'name', prefix: 'areas_details_name', inputType: 'input'});
      this.fields.push({name: 'gotoText', prefix: 'areas_details_gototext', inputType: 'input'})

      this.currentModelType = this.Area;

      this.currentModelType.findAll({locale: this.mainLanguage}).then((areas) => {
        this.allModels = areas;
        this.values = {};
        this.values[this.mainLanguage] = {};
        this.loadStuff();
      })
  }

  save() {
    for (let locale of this.locales) {
      this.currentModelType.update(this.allModels[this.currentModelIndex].id, {area: this.values[locale], locale: locale});
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

  loadStuff() {
    for (let i = 0; i < this.fields.length; i++) {
      var fieldName = this.fields[i].name;
      this.values[this.mainLanguage][fieldName] = this.allModels[this.currentModelIndex][fieldName];
    }
  }
}
