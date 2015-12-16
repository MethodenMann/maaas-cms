import {Inject} from '../utils/di';

export class MasterView {
  public static selector = 'mas-master-view';
  public static templateUrl = './app/master/master-view.html';

  private alerts;
  private loggedInEmail:string = '';

  constructor(@Inject('$window') private $window,
              @Inject('$state') private $state,
              @Inject('$scope') private $scope,
              @Inject('Auth') private Auth,
              @Inject('AlertService') private AlertService) {
    $('#side-menu').metisMenu();


    angular.element($window).bind('load resize', this.resizeHandler);
    this.resizeHandler();

    this.alerts = AlertService.getAlerts();

    Auth.currentUser().then((user) => {
      this.loggedInEmail = user.email;
    });
  }

  protected closeAlert(idx) {
    this.AlertService.removeAlert(idx);
  }


  resizeHandler() {
    var topOffset = 50;
    var width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    if (width < 768) {
      $('div.navbar-collapse').addClass('collapse');
      topOffset = 100; // 2-row-menu
    } else {
      $('div.navbar-collapse').removeClass('collapse');
    }

    var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;
    height = height - topOffset;
    if (height < 1) {
      height = 1;
    }
    if (height > topOffset) {
      $('#page-wrapper').css('min-height', (height) + 'px');
    }
  }

  logout() {
    this.Auth.logout();
    this.$state.go('login');
  }

  goToMuseum() {
    var museumId = this.Auth._currentUser.museum_id;
    this.$state.go('cms.museums.detail.update', {museumId: museumId});
  }

  private searchText;

  search() {
    this.$state.go('cms.search.list');
    this.$scope.$broadcast('mas.search', this.searchText);
  }
}
