/// <reference path='_all.ts' />

module maaas {
  maaas.app.config(function (DSProvider, DSHttpAdapterProvider) {
    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: 'http://localhost:3000'
    });
  });

  maaas.app.factory('Beacon', function (DS) {
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

  maaas.app.factory('Area', function (DS) {
    return DS.defineResource({
      name: 'areas',
      relations: {
        hasMany: {
          beacons: {
            foreignKey: 'areaId',
            localField: 'beacons'
          },
          contents: {
            foreignKey: 'areaId',
            localField: 'contents'
          },
          challenges: {
            foreignKey: 'areaId',
            localField: 'challenges'
          }
        }
      }
    });
  });

  maaas.app.factory('Content', function (DS) {
    return DS.defineResource({
      name: 'contents',
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

  maaas.app.factory('Challenge', function (DS) {
    return DS.defineResource({
      name: 'challenges',
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
}