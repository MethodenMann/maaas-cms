import {Inject} from '../utils/di';

export class ContentDetailComponent {
  private static selector = 'mas-content-detail-component';
  private static templateUrl = './app/content/content-detail-component.html';

  private imageList: Object[] = [];
  private backgroundImageId: String;
  private ids: String[] = [];

  constructor(
    // @Inject('Auth') private Auth,
    // @Inject('$state') private $state
    @Inject('$scope') private $scope
  ) {
    this.imageList.push({title: 'Dog', value: 'mydog.jpg'});
    this.imageList.push({title: 'Cat', value: 'mycat.jpg'});

    this.ids.push("ud0ouj3bzzqekslmxcil");
    this.ids.push("pizbmhgxfwpyylxhjdmq");
  }
}
