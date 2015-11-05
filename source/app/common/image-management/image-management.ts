import {makeDirective, makeSelector} from '../../utils/component';
import {ImageLoadDirective} from './image-load';
import {ImageUploadDirective} from './image-upload';
import {ImageFormWrapper} from './image-form-wrapper';

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
    makeDirective(ImageUploadDirective))

.directive(
    makeSelector(ImageFormWrapper),
    makeDirective(ImageFormWrapper));
}
