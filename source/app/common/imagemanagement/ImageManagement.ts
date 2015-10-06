/// <reference path='../../_all.ts' />
/// <reference path='./ImageLoad.ts'/>
/// <reference path='./ImageUpload.ts'/>


interface JQueryStatic {
  cloudinary: any;
}


module maaas {
  $.cloudinary.config({ cloud_name: 'nmsg', api_key: '145367384875325' });

  maaas.app.directive('imageUpload', makeDirective(ImageUploadDirective));
  maaas.app.directive('imageLoad', makeDirective(ImageLoadDirective));
}
