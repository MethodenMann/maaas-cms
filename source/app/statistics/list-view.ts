import {Inject} from '../utils/di';

export class ListView {
  private static selector = 'mas-statistics-list-view';
  private static templateUrl = './app/statistics/list-view.html';


  constructor(@Inject('ngAnalyticsService') private ngAnalyticsService) {


  }

}
