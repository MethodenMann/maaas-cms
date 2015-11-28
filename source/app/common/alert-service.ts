import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class AlertService {

  constructor(@Inject('$http') private $http,
              @Inject('$q') private $q) {
  }

  private alerts:IAlert[] = [];

  public removeAlert(idx) {
    this.alerts.splice(idx, 1);
  }

  public addAlert(alert:IAlert) {
    this.alerts.push(alert);
  }

  public getAlerts() {
    return this.alerts;
  }
}
