import {Inject} from '../utils/di';

export class ListView {
  private static selector = 'mas-statistics-list-view';
  private static templateUrl = './app/statistics/list-view.html';


  constructor(@Inject('ngAnalyticsService') private ngAnalyticsService) {


  }


  private chart  = {
    reportType: 'ga',
    query: {
      metrics: 'ga:screenviews,ga:uniqueScreenviews,ga:timeOnScreen,ga:avgScreenviewDuration',
      dimensions: 'ga:screenName',
      'start-date': '30daysAgo',
      'end-date': 'yesterday',
      'filters': 'ga:screenName=~^Quiz.*',
      'ids': 'ga:111629068'

    },
    chart: {
      container: 'chart-container-1',
      type: 'TABLE',
      options: {
        width: '100%'
      }
    }
  };

}
