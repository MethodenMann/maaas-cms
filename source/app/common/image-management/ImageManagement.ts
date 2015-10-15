import {makeDirective, makeSelector} from '../../utils/component';
import {ImageLoadDirective} from './ImageLoad';
import {ImageUploadDirective} from './ImageUpload';

export function loadImageManagement(app) {
  $.cloudinary.config({ cloud_name: 'nmsg', api_key: '145367384875325' });

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('common/image-management');
  });

  app
  .directive(
    makeSelector(ImageLoadDirective),
    makeDirective(ImageLoadDirective))
  .directive(
    makeSelector(ImageUploadDirective),
    makeDirective(ImageUploadDirective));
}
