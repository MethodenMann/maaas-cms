/// <reference path='../../_all.ts' />
/// <reference path='./ImageDisplay.ts'/>
/// <reference path='./ImageUpload.ts'/>


interface JQueryStatic {
  cloudinary: any;
}


module maaas {
  $.cloudinary.config({ cloud_name: 'nmsg', api_key: '145367384875325' });

  maaas.app.directive('imageUpload', makeDirective(ImageUploadDirective));
  maaas.app.directive('imageDisplay', makeDirective(ImageDisplayDirective));
}
