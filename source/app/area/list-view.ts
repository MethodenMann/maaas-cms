import {Inject} from '../utils/di';
import {IArea} from './iarea';

export class ListView {
  private static selector = 'mas-area-list-view';
  private static templateUrl = './app/area/list-view.html';


  private areas: IArea[] = [];

  constructor(
    @Inject('$location') private $location,
    @Inject('Area') private Area
    ) {

    Area.findAll().then((data) => {
      this.areas = data;
    });
  }
}
