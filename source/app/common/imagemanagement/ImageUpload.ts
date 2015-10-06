/// <reference path='../../_all.ts' />


module maaas {
  export class ImageUploadDirective {

    private static template = '';
    private static replace = true;

    constructor() { };

    private static link($scope: ng.IScope, element: JQuery, attributes: ng.IAttributes) {
      var imageTag = $.cloudinary.unsigned_upload_tag('cy0noj45', { cloud_name: 'nmsg' });

      element.append(imageTag);


      imageTag.bind('cloudinarydone', (e, data) => {
        console.log(data.result.public_id);
      });
    }

  }
}
