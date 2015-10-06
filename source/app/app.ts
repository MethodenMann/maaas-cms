/// <reference path='_all.ts' />

module maaas {
  var maaasmodule = angular.module('maaas', ['ngResource', 'js-data', 'ui.router', 'Devise']);

  maaasmodule.config(function (DSProvider, DSHttpAdapterProvider) {
    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: 'https://maaas-backend.herokuapp.com'
    });
  });


  maaasmodule.factory('Area', function (DS) {
    return DS.defineResource({
      name: 'areas',
      relations: {
        hasMany: {
          beacons: {
            foreignKey: 'areaId',
            localField: 'beacons'
          }
        }
      }
    });
  });

  maaasmodule.factory('Beacon', function (DS) {
    return DS.defineResource({
      name: 'beacons',
      relations: {
        belongsTo: {
          areas: {
            localKey: 'areaId',
            localField: 'area'
          }
        }
      }
    });
  });

  export module maaas {
    export var app = maaasmodule;
  }
};
