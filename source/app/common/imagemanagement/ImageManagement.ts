import {app} from '../../app';
import {makeDirective} from '../../util/MakeDirective';
import {ImageUploadDirective} from './ImageUpload';
import {ImageLoadDirective} from './ImageLoad'

interface JQueryStatic {
  cloudinary: any;
}

$.cloudinary.config({ cloud_name: 'nmsg', api_key: '145367384875325' });

app.directive('imageUpload', makeDirective(ImageUploadDirective));
app.directive('imageLoad', makeDirective(ImageLoadDirective));
