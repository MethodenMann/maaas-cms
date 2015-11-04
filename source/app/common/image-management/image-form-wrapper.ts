
export class ImageFormWrapper {
  private static templateUrl = 'app/common/image-management/image-form-wrapper.html';
  private static selector = 'mas-image-wrapper';

  private static options = {
    bindToController: {
      model: '=',
      imageId: '@',
      publicId: '@',
      width: '@',
      height: '@',
      isRequired: '='
    }
  };


  //id : string 1w (random?)
  //model : 2w
  //height: int 1w
  //required : boolean 1w

  private model: any;
  private width: string;
  private height: string;
  private element: JQuery;
  private thumbnailTag: JQuery;
  private uploadId: string;
  private initialMediaId: string;
  private publicId: string;
  private required: Boolean;
  //private url: string;

  constructor(

  ) {}


}
