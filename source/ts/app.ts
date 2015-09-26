/// <reference path='_all.ts' />

module maaas {
  'use strict';


  var maaas = angular.module('maaas', ['ngRoute']);


  angular.module('maaas').config(['$routeProvider',
    function routes($routeProvider) { // *** $routeProvider is typed with ng.route.IRouteProvider ***
        $routeProvider
            .when('/', {
                templateUrl: 'views/MyView.html',
                controller: 'app.controllers.MyController'
            })
            .otherwise({
                redirectTo: '/ttttest'
            });
    }
]);

  export module Bar {
    export var app = maaas;
  }
};
