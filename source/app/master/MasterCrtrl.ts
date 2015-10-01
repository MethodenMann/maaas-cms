/// <reference path='../_all.ts' />

module maaas {
  export class MasterCtrl {
    private title = 'maaas';
    constructor(
      @Inject('$window') private $window
      ) {
      $('#side-menu').metisMenu();


      angular.element($window).bind('load resize', this.resizeHandler);
      this.resizeHandler();
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



  }
}
