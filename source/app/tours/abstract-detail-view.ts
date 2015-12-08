import {Inject} from '../utils/di';
import {ITour} from './itour';
import {IArea} from '../areas/iarea';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';
import {FormView} from '../common/forms/form-view';

export abstract class AbstractDetailView extends FormView {
  private static selector = 'mas-tour-detail-view';
  private static templateUrl = 'app/tours/abstract-detail-view.html';

  private areas:Array<IArea> = [];
  private selectedArea:IArea;

  public isPopOverOpen = false;

  private configuredAreas:IArea[] = [];
  private unconfiguredAreas:IArea[] = [];

  private contentAreaDict:{ [id: string] : number; } = {};
  private challangeAreaDict:{ [id: string] : number; } = {};
  protected tour:ITour;

  constructor(@Inject('$scope') protected $scope,
              @Inject('Area') protected Area,
              @Inject('Content') protected Content,
              @Inject('Challenge') protected Challenge,
              @Inject('Tour') protected Tour,
              @Inject('Medium') protected Medium,
              @Inject('$stateParams') protected $stateParams,
              @Inject('$state') protected $state,
              @Inject('$q') protected $q,
              @Inject('AlertService') protected AlertService) {
    super($scope);
    Area.refreshAll();
    this.$q.all([Content.findAll(), Challenge.findAll(), this.loadData()]).then((values) => {
      this.initDictionaries(values[0], values[1]);
      this.Area.findAll().then((areas) => {
        this.areas = areas;
        this.loadConfiguredAreas();
      });
    });
  }

  protected loadData() {
  }

  abstract saveHook():void;

  protected save() {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    if (this.isFormValid()) {
      this.saveHook();
    } else {
      this.$scope.$broadcast('mas.saveprogess', 'rejected');
      this.focusFirstInputWithError();
    }
  }

  private initDictionaries(contents, challanges) {
    contents.forEach((content) => {
      this.contentAreaDict[content.id] = content.areaId;
    });
    challanges.forEach((challange) => {
      this.challangeAreaDict[challange.id] = challange.areaId;
    });

  }

  private loadConfiguredAreas() {
    var configuredAreaIds:number[] = [];

    this.tour.selectedContents.forEach((contentId) => {
      var areaId = this.contentAreaDict[contentId];
      if (configuredAreaIds.indexOf(areaId) === -1) {
        configuredAreaIds.push(this.contentAreaDict[contentId]);
      }
    });

    this.tour.selectedChallenges.forEach((challengeId) => {
      var areaId = this.challangeAreaDict[challengeId];
      if (configuredAreaIds.indexOf(areaId) === -1) {
        configuredAreaIds.push(areaId);
      }
    });

    this.areas.forEach((area) => {
      if (configuredAreaIds.indexOf(area.id) > -1) {
        this.configuredAreas.push(area);
      } else {
        this.unconfiguredAreas.push(area);
      }
    });

    this.selectFirstArea();
  }

  addArea(idx) {
    var area = this.unconfiguredAreas[idx];
    this.unconfiguredAreas.splice(idx, 1);
    this.configuredAreas.push(area);
    this.selectArea(area);
  }

  countSelectedContents(area:IArea) {
    var count = 0;
    area.contents.forEach((content) => {
      if (this.tour.selectedContents.indexOf(content.id) > -1) {
        count++;
      }
    });
    return count;
  }


  removeArea(area:IArea) {
    area.contents.forEach((content) => {
      var pos = this.tour.selectedContents.indexOf(content.id);
      if (pos > -1) {
        this.tour.selectedContents.splice(pos, 1);
      }
    });

    area.challenges.forEach((challange) => {
      var pos = this.tour.selectedChallenges.indexOf(challange.id);
      if (pos > -1) {
        this.tour.selectedChallenges.splice(pos, 1);
      }
    });


    var idx = this.configuredAreas.indexOf(area);
    this.configuredAreas.splice(idx, 1);
    this.unconfiguredAreas.push(area);

    this.selectFirstArea();

    this.isPopOverOpen = false;
  }

  selectArea(area:IArea) {
    this.selectedArea = area;
  }

  selectFirstArea() {
    this.selectedArea = this.configuredAreas[0];
  }

  handleCheckboxChecked(id:number, list:Array<number>, event) {
    var checked:boolean = event.target.checked;
    var idx = list.indexOf(id);

    if (checked) {
      if (idx < 0) {
        list.push(id);
      }
    } else {
      if (idx >= 0) {
        list.splice(idx, 1);
      }
    }
  }

  selectContent(id:number, event) {
    this.handleCheckboxChecked(id, this.tour.selectedContents, event);
  }

  selectChallenge(id:number, event) {
    this.handleCheckboxChecked(id, this.tour.selectedChallenges, event);
  }

  isSelected(id:number, list:Array<number>) {
    var idx = list.indexOf(id);
    return idx < 0 ? false : true;
  }

  isContentSelected(id:number) {
    return this.isSelected(id, this.tour.selectedContents);
  }

  isChallengeSelected(id:number) {
    return this.isSelected(id, this.tour.selectedChallenges);
  }
}
