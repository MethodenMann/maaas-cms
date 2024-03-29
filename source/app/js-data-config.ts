export function loadJsDataConfig(app) {
  app.config(function (DSProvider, DSHttpAdapterProvider, BACKEND_BASEURL) {
    angular.extend(DSHttpAdapterProvider.defaults, {
      basePath: BACKEND_BASEURL
    });
  });

  app.factory('Beacon', function (DS) {
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

  app.factory('Area', function (DS) {
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
          },
          media: {
            foreignKey: 'mediumableId',
            localField: 'media',
            get: function (Area, relationDef, area, orig) {
              return DS.filter('media', {
                mediumableId: area.id,
                mediumableType: 'Area'
              });
            }
          }
        },
        hasOne: {
          media: [{
            localKey: 'backgroundImageId',
            localField: 'backgroundImage'
          }, {
            localKey: 'stickerImageId',
            localField: 'stickerImage'
          }]
        }
      }
    });
  });

  app.factory('Content', function (DS) {
    return DS.defineResource({
      name: 'contents',
      relations: {
        belongsTo: {
          areas: {
            localKey: 'areaId',
            localField: 'area'
          }
        },
        hasMany: {
          media: {
            localField: 'media',
            foreignKey: 'mediumableId',
            get: function (Content, relationDef, content, orig) {
              return DS.filter('media', {
                mediumableId: content.id,
                mediumableType: 'Content'
              });
            }
          }
        }
      }
    });
  });

  app.factory('Challenge', function (DS) {
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

  app.factory('Medium', function (DS) {
    return DS.defineResource({
      name: 'media'
    });
  });

  app.factory('Museum', function (DS) {
    return DS.defineResource({
      name: 'museums'
    });
  });

  app.factory('Tour', function (DS) {
    return DS.defineResource({
      name: 'tours'
    });
  });

  app.factory('Invitation', function (DS) {
    return DS.defineResource({
      name: 'invitations'
    });
  });
}
