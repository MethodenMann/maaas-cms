import {Inject} from '../utils/di';
import {IBeacon} from './IBeacon';

export class OverviewCtrl {

  private beacons: IBeacon[] = [];

  constructor(
    @Inject('$scope') private $scope,
    @Inject('$location') private $location,
    @Inject('$http') private $http,
    @Inject('Beacon') private Beacon,
    @Inject('KontaktIoService') private KontaktIoService

    ) {

    Beacon.findAll().then((data) => {
      this.beacons = data;
    });


  }


  SyncWithKontaktIO() {
    this.KontaktIoService.GetNewBeacons(this.beacons).then(beacons => {
      Array.prototype.push.apply(this.beacons, beacons)
    });
  }


}
