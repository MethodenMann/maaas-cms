/// <reference path='../../_all.ts' />


module maaas {
  export class ImageUploadDirective {

    private static template = '';
    private static replace = true;

    private static options = {
      bindToController: {
        imageId: '@'
      }
    };

    constructor(){};

    private static link($scope, element: JQuery, attributes) {
      var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', { cloud_name: 'nmsg' });
      element.append(imageTag);
      imageTag.bind('cloudinarydone',(e, data) => {
            var emitInfos = {
               id: $scope.ctrl.imageId,
               cloudId: data.result.public_id
            }
            $scope.$emit('imageUploaded', emitInfos)
      });
    }
  }
}
