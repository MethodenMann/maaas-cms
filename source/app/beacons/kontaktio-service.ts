import {Inject} from './../utils/di';
import {IBeacon} from './IBeacon';

export class KontaktIoService {

  constructor(@Inject('$http') private $http,
              @Inject('$q') private $q) {
  }


  private getBeaconById(beacons:IBeacon[], uniqueId:string):IBeacon {
    var result = null;
    beacons.forEach(beacon => {
      if (beacon.uniqueId === uniqueId) {
        result = beacon;
      }
    });
    return result;
  }

  private convertKontaktBeacon(kontaktBeacon):IBeacon {
    var beacon = <IBeacon>{};

    beacon.uuid = kontaktBeacon.proximity;
    beacon.major = kontaktBeacon.major;
    beacon.minor = kontaktBeacon.minor;
    beacon.description = kontaktBeacon.alias;
    beacon.uniqueId = kontaktBeacon.uniqueId;

    return beacon;
  }

  public getNewBeacons(apiKey:string, beacons:Array<IBeacon>) {
    var defer = this.$q.defer();
    var result:IBeacon[] = [];
    this.loadKontaktIoBeacons(apiKey).then(response => {
      var kontaktBeacons = response.data.devices;
      angular.forEach(kontaktBeacons, kontaktBeacon => {
        var b = this.getBeaconById(beacons, kontaktBeacon.uniqueId);
        if (b == null) {
          result.push(this.convertKontaktBeacon(kontaktBeacon));
        }
      });
      return defer.resolve(result);
    });
    return defer.promise;
  }


  private loadKontaktIoBeacons(apiKey:string):any {
    var config = {
      headers: {
        'Accept': 'application/vnd.com.kontakt+json',
        'Api-Key': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: false
    };

    return this.$http.get('https://api.kontakt.io/device', config);
  }
}
