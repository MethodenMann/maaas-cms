import {Inject} from '../utils/di';

export class ListView {
  public static selector = 'mas-tour-list-view';
  public static templateUrl = './app/tours/list-view.html';
  private area;

  constructor(
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area,
    @Inject('Content') private Content

    ) {
    Content.findAll().then((data) => {
      Area.find(this.$stateParams.areaId).then((data) => {
        this.area = data;
      });
    });
  }
}
