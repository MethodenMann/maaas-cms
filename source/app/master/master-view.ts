import {Inject} from '../utils/di';

export class MasterView {
  public static selector = 'mas-master-view';
  public static templateUrl = './app/master/master-view.html';



  constructor(
    @Inject('$window') private $window,
    @Inject('$state') private $state,
    @Inject('Auth') private Auth
    ) {
    $('#side-menu').metisMenu();


    angular.element($window).bind('load resize', this.resizeHandler);
    this.resizeHandler();


    this.$state.go('cms.welcome');
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
}
