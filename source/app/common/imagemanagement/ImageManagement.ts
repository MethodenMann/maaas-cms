import {makeDirective, makeSelector} from '../../utils/component-utils';
import {ImageLoadDirective} from './ImageLoad'
import {ImageUploadDirective} from './ImageUpload';

export function loadImageManagement(app) {
  interface JQueryStatic {
    cloudinary: any;
  }

  $.cloudinary.config({ cloud_name: 'nmsg', api_key: '145367384875325' });

  // app.directive('imageUpload', makeDirective(ImageUploadDirective));
  // app.directive('imageLoad', makeDirective(ImageLoadDirective));

  app
  .directive(
    makeSelector(ImageLoadDirective),
    makeDirective(ImageLoadDirective))
  .directive(
    makeSelector(ImageUploadDirective),
    makeDirective(ImageUploadDirective));



}
