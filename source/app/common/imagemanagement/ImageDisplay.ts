/// <reference path='../../_all.ts' />

module maaas {
  export class ImageDisplayDirective {

    private static template = '';
    private static replace = true;

    private static options = {
      bindToController: {
        imageId: '@',
        width: '@',
        height: '@'
      }
    };

    private imageid: String;
    private width: String;
    private height: String;

    constructor() {
    };


    private static link($scope, element: JQuery, attributes) {

      var thumbnailTag = angular.element('<div></div>');

      element.append(thumbnailTag);

      $scope.$watch('ctrl.imageId', function(newValue, oldValue) {
        if ($scope.ctrl.imageId && $scope.ctrl != "") {
          thumbnailTag.html("");
          thumbnailTag.append($.cloudinary.image($scope.ctrl.imageId, {
            format: 'jpg', width: $scope.ctrl.width, height: $scope.ctrl.height,
            crop: 'thumb', gravity: 'face', effect: 'saturation:50'
          }));
        }
      });
    }
  }
