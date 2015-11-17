import {Inject} from '../utils/di';

export class PercentageRibbon {
  private static selector = 'mas-percentage-ribbon';
  // private static template = '<div>{{ctrl.percentage*100}}%</div>'
  private static template = '<span ng-class="ctrl.getClass()">{{(ctrl.percentage*100).toFixed(2)}}%</span>'

  private percentage:number;

  private static options = {
    bindToController: {
      percentage: '='
    }
  };

  constructor(
    @Inject('$scope') private $scope
    ) {

  }

  getClass() {
    if (this.percentage != 1) {
      return ["label", "label-warning"]
    } else {
      return ["label", "label-success"]
    }
  }
}
