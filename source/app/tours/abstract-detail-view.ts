import {Inject} from '../utils/di';
import {ITour} from './itour';
import {IArea} from '../areas/iarea';
// import {IContent} from '../contents/icontent';
// import {IChallenge} from '../challenges/ichallenge';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';

export class AbstractDetailView {
  private static selector = 'mas-tour-detail-view';
  private static templateUrl = './app/tours/abstract-detail-view.html';

  // private availableAreas:Array<IArea>;
  private areas:Array<IArea> = [];
  private selectedArea:IArea;
  // private areaToAdd:any;

  // private selectedAreas: Array<{
  //   areaId:number,
  //   selectedContents:Array<{contentId:number}>,
  //   selectedChallenges:Array<{challengeId:number}>
  // }>;

  private selectedContents:Array<number> = [];
  private selectedChallenges:Array<number> = [];

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('Area') protected Area,
    @Inject('Content') protected Content,
    @Inject('Challenge') protected Challenge,
    @Inject('Medium') protected Medium,
    @Inject('$stateParams') protected $stateParams,
    @Inject('$state') protected $state,
    @Inject('$q') protected $q
  ) {
    this.$q.all(Content.findAll(), Challenge.findAll()).then(() => {
      this.Area.findAll().then((areas) => {
        // this.availableAreas = areas;
        this.areas = areas;
      })
    })

    this.constructorHook();
  }

  protected constructorHook() {}

  // addArea() {
  //   this.areas.push(this.areaToAdd);
  // }

  selectArea(index:number) {
    this.selectedArea = this.areas[index];
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
    this.handleCheckboxChecked(id, this.selectedContents, event);
  }

  selectChallenge(id:number, event) {
    this.handleCheckboxChecked(id, this.selectedChallenges, event);
  }

  isSelected(id:number, list:Array<number>) {
    var idx = list.indexOf(id)
    return idx < 0 ? false : true;
  }

  isContentSelected(id:number) {
    return this.isSelected(id, this.selectedContents);
  }

  isChallengeSelected(id:number) {
    return this.isSelected(id, this.selectedChallenges);
  }
}
