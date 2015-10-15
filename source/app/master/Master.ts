// import {app} from '../app';
import {MasterCtrl} from './MasterCrtrl';

export function loadMaster(app) {
  app.controller('MasterCtrl', MasterCtrl);


  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/cms');

    $stateProvider
      .state('cms', {
      url: '/cms',
      templateUrl: './app/master/view/master.html',
      controller: 'MasterCtrl',
      controllerAs: 'ctrl',
      ncyBreadcrumb: {
        label: 'CMS'
      }
    });
  });
}
