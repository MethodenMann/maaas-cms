/// <reference path='../../_all.ts' />

module maaas {
  export class ImageDisplayDirective {

    private static template = '';
    private static replace = true;

    private static options = {
      bindToController: {
        imageid: '@',
        width: '@',
        height: '@'
      }
    };

    private imageid: String;
    private width: String;
    private height: String;

    constructor() {
    };


    private static link($scope: ng.IScope, element: JQuery, attributes) {

      var thumbnailTag = angular.element('<div></div>');

      element.append(thumbnailTag);


      thumbnailTag.append($.cloudinary.image(attributes.imageid, {
        format: 'jpg', width: attributes.width, height: attributes.height,
        crop: 'thumb', gravity: 'face', effect: 'saturation:50'
      }));

    }

  }
}
