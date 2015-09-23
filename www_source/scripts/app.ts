/// <reference path='_all.ts' />

module maaas {
  'use strict';

  var maaascms = angular.module('maaascms', [])
    .service('TestService', TestService)
    .controller('AreaCtrl', AreaCtrl);
};
