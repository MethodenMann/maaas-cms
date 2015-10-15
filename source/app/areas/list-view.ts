import {Inject} from '../utils/di';
import {IArea} from './iarea';

export class ListView {
  public static selector = 'mas-area-list-view';
  public static templateUrl = './app/areas/list-view.html';


  private areas: IArea[] = [];

  constructor(
    @Inject('$location') private $location,
    @Inject('Area') private Area,
    @Inject('Medium') private Medium
    ) {

    // TODO load media differently
    Medium.findAll().then((data) => {
      Area.findAll().then((data) => {
        this.areas = data;
      });
    });
  }
}
