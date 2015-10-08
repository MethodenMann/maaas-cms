import {Inject} from './../utils/di';
import {IBeacon} from './IBeacon';

export class KontaktIoService {

  constructor(
    @Inject('$http') private $http,
    @Inject('$q') private $q
    ) { }


  private GetBeaconById(beacons: IBeacon[], uniqueId: string): IBeacon {
    var result = null;
    beacons.forEach(beacon => {
      if (beacon.uniqueId === uniqueId) {
        result = beacon;
      }
    });
    return result;
  }

  private ConvertKontaktBeacon(kontaktBeacon): IBeacon {
    var beacon = <IBeacon>{};

    beacon.uuid = kontaktBeacon.proximity;
    beacon.major = kontaktBeacon.major;
    beacon.minor = kontaktBeacon.minor;
    beacon.description = kontaktBeacon.alias;
    beacon.uniqueId = kontaktBeacon.uniqueId;

    return beacon;
  }

  public GetNewBeacons(beacons: Array<IBeacon>) {
    var defer = this.$q.defer();
    var result: IBeacon[] = [];
    this.LoadKontaktIoBeacons().then(response => {
      var kontaktBeacons = response.data.devices;
      angular.forEach(kontaktBeacons, kontaktBeacon => {
        var b = this.GetBeaconById(beacons, kontaktBeacon.uniqueId)
        if (b == null) {
          result.push(this.ConvertKontaktBeacon(kontaktBeacon));
        }
      });
      return defer.resolve(result);
    });

    return defer.promise;
  }



  private LoadKontaktIoBeacons(): any {
    var config = {
      headers: {
        'Accept': 'application/vnd.com.kontakt+json;version=5',
        'Api-Key': 'EKydvSwiljOwVAfpSPzyMPGgPZFTASQu',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return this.$http.get('https://api.kontakt.io/device', config);

  }

}
