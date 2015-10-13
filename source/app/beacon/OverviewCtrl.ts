import {Inject} from '../utils/di';
import {IBeacon} from './IBeacon';



export class OverviewCtrl {

  private beacons: IBeacon[] = [];
  private gridOptions: any;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('$location') private $location,
    @Inject('$http') private $http,
    @Inject('Beacon') private Beacon,
    @Inject('KontaktIoService') private KontaktIoService

    ) {

    Beacon.findAll().then((data) => {
      this.beacons = data;
      console.log(data);
      this.gridOptions.data = data;
    });



    this.gridOptions = {
      enableSorting: true,

      enableRowSelection: true,
       headerCellClass: 'ico-ibeacon',
      columnDefs: [
        { name: 'uuid', field: 'description' },
        { name: 'Beschreibung', field: 'description' }
      ],
    };
  }



  private Delete(beacon) {
    console.log('delete', beacon);
    var conf = confirm('really?'); //Todo: Make more sexy
    if (conf) {
      this.Beacon.destroy(this.beacons[0].id);
    }
  }


  private SyncWithKontaktIO() {
    this.KontaktIoService.GetNewBeacons(this.beacons).then(beacons => {
      Array.prototype.push.apply(this.beacons, beacons);
    });
  }

}
