import {Inject} from '../utils/di';
import {IMuseum} from '../museums/imuseum';

export class ListView {
  private static selector = 'mas-statistics-list-view';
  private static templateUrl = './app/statistics/list-view.html';



  constructor(@Inject('ngAnalyticsService') private ngAnalyticsService,
              @Inject('Auth') private Auth,
              @Inject('Museum') private Museum,
              @Inject('$q') private $q
  ) {
    this.generateCharts();


  }



  private charts = [];

  private generateCharts() {
    this.loadMuseum().then((museum: IMuseum) => {
      var chartTypes = ['Area', 'Quiz', 'Content'];
      if (museum.googleAnalyticsViewKey) {
        chartTypes.forEach((chartType) => {
          this.charts.push({type: chartType.toLowerCase(), details: this.getViewChartDetails(chartType, museum.googleAnalyticsViewKey)});
        });
      }
    });
  }


  public getViewChartDetails(type:string, viewkey: string) {
    return {
      reportType: 'ga',
      query: {
        metrics: 'ga:screenviews,ga:uniqueScreenviews,ga:timeOnScreen,ga:avgScreenviewDuration',
        dimensions: 'ga:screenName',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        'filters':  `ga:screenName=~^${type}.*`,
        'ids':`ga:${viewkey}`
      },
      chart: {
        container: `chart-container-${type}`,
        type: 'TABLE',
        options: {
          width: '100%'
        }
      }
    };
  }


  private loadMuseum() {
    var deferred = this.$q.defer();
    this.Auth.currentUser().then((user) => {
      console.log(user);
      var museumId = user.museum_id;
      this.Museum.find(museumId).then((museum) => {
        deferred.resolve(museum);
      });
    });
    return deferred.promise;
  }

}
