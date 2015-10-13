import {Inject} from '../utils/di';
declare var tinymce: any;

export class TinyMceComponent {
  private static selector = 'mas-tinymce-component';
  private static template = '<textarea></textarea>'

  private static options = {
    bindToController: {
      imageList: '='
    }
  };

  private imageList: String[];
  // private email: String;
  // private password: String;

  constructor(
    // @Inject('Auth') private Auth,
    // @Inject('$state') private $state
  ) {
  }

  login() {

  }

  getList () {
    return this.imageList;
  }

  private static link($scope, element: JQuery, attributes) {
    var config : any = {};
    // TODO: specifically select only this element
    config.selector = 'textarea';
    config.menu = {};
    config.toolbar = 'undo redo | bold italic | link image';
    config.plugins = 'image';
    config.image_dimensions = false;
    // config.height = 400;

    config.image_list = (success) => {
      console.log($scope.ctrl.imageList);
      success($scope.ctrl.imageList);
    }

    var myEditor = tinymce.init(config);
  }
}
