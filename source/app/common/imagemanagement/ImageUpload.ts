export class ImageUploadDirective {

  private static selector = 'image-upload';
  private static template = '<div id="uploadbutton" class="fileUpload btn btn-outline btn-success"> Bild Hochladen </div>';
  private static replace = true;

  private static options = {
    bindToController: {
      imageId: '@'
    }
  };

  private static link($scope, element: JQuery, attributes) {
    var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', { cloud_name: 'nmsg' });
    element.find('#uploadbutton').append(imageTag);
    imageTag.bind('cloudinarydone', (e, data) => {
          var emitInfos = {
             id: $scope.ctrl.imageId,
             cloudId: data.result.public_id
          };
          $scope.$emit('imageUploaded', emitInfos);
    });
  }
}
