import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class AlertService {

  constructor(@Inject('$http') private $http,
              @Inject('$timeout') private $timeout,
              @Inject('$q') private $q) {
  }

  private alerts:IAlert[] = [];

  public removeAlert(idx) {
    this.alerts.splice(idx, 1);

  }

  public addAlert(alert:IAlert) {
    this.alerts.push(alert);
    this.autoRemove();
  }

  private autoRemove() {
      this.$timeout( () => {
        if (this.alerts.length >= 0) {
          this.removeAlert(0);
        }
      }, 5000);
  }

  public getAlerts() {
    return this.alerts;
  }
}
