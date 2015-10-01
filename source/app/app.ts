/// <reference path='_all.ts' />

module maaas {
  var maaasmodule = angular.module('maaas', ['ngResource', 'js-data', 'ui.router', 'Devise']);

  export module maaas {
    export var app = maaasmodule;
  }
};
