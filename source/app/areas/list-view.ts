import {Inject} from '../utils/di';
import {IArea} from './iarea';

export class ListView {
  public static selector = 'mas-area-list-view';
  public static templateUrl = './app/areas/list-view.html';

  private areas:IArea[] = [];

  constructor(@Inject('$location') private $location,
              @Inject('Area') private Area,
              @Inject('$scope') private $scope,
              @Inject('Medium') private Medium) {
    // TODO load media differently
    Area.refreshAll();
    Medium.findAll().then((data) => {
      Area.findAll().then((data) => {
        this.areas = data;
      });
    });

    $scope.$on('deleteArea', (e, areaId) => {
      console.log('bc ree');
      this.deleteArea(areaId);
    });
  }

  protected deleteArea(id) {
    console.log('Delete Area rea', id);
  }

}
