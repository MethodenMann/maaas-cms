import {Inject} from '../utils/di';
import {IBeacon} from './IBeacon';
import {IArea} from '../areas/iarea';
import {IMuseum} from '../museums/imuseum';

export class ListView {
  private static selector = 'mas-beacon-list-view';
  private static templateUrl = './app/beacons/list-view.html';


  private museum: IMuseum;
  private beacons: IBeacon[] = [];
  private areas: IArea[] = [];
  private gridOptions: any;
  private gridApi: any;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Beacon') private Beacon,
    @Inject('Area') private Area,
    @Inject('Museum') private Museum,
    @Inject('Auth') private Auth,
    @Inject('KontaktIoService') private KontaktIoService

    ) {

    this.loadData();
  }

  private loadData() {
    this.Beacon.findAll().then((beacons) => {
      this.beacons = beacons;
    });

    this.Area.findAll().then((areas) => {
      this.areas = areas;
    });

    var museumId = this.Auth._currentUser.museum_id;

    this.Museum.find(museumId).then((museum) => {
      this.museum = museum;
    })
  }


  private editBeacon(beacon:IBeacon) {
    this.Beacon.update(beacon.id, {beacon: beacon});
  }

  private removeBeacon(beacon:IBeacon) {
    this.Beacon.destroy(beacon.id);
    this.beacons.splice(this.beacons.indexOf(beacon), 1);
  }

  private getAreaNameById(areaId:number) {
    var res = '';
    this.areas.forEach((area:IArea) => {
      if (area.id === areaId) {
        res = area.name;
      }
    });
    return res;
  }


  private syncWithKontaktIO() {
    this.KontaktIoService.getNewBeacons(this.museum.kontaktIoApiKey, this.beacons).then(beacons => {
      var conf = confirm(beacons.length + ' Beacon(s) werden hinzugefügt'); //Todo: Make more sexy
      if (conf) {
        beacons.forEach((b) => {
          this.Beacon.create({ beacon: b }).then( (createdBeacon) => {
            this.beacons.push(createdBeacon);
          });

        });

      }
    });
  }


}
