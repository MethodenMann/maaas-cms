/// <reference path='../_all.ts' />

interface JQueryStatic {
  cloudinary: any
}

module maaas {
  'use strict'

  export function ImageLoader(): ng.IDirective {
    return {
      restrict: 'A',
      replace: true,
      link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        $.cloudinary.config({cloud_name: 'nmsg', api_key: '145367384875325'})

        var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', { cloud_name: 'nmsg' })
        var thumbnailTag = angular.element("<div></div>")
        element.append(imageTag)
        element.append(thumbnailTag)

        imageTag.bind('cloudinarydone', (e, data) => {
          thumbnailTag.append($.cloudinary.image(data.result.public_id, {
            format: 'jpg', width: 150, height: 100,
            crop: 'thumb', gravity: 'face', effect: 'saturation:50'
          }))
        })
      }
    }
  }

  maaas.app.directive('imageLoader', <any>ImageLoader);
}
