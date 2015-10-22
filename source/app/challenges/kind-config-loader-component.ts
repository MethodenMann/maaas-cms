import {Inject} from '../utils/di';

export class KindConfigLoader {
  public static selector = 'mas-challenges-kind-config-loader';

  private static options = {
    bindToController: {
      kind: '@',
      data: '='
    }
  };


  constructor(
    @Inject('$scope') private $scope,
    @Inject('$compile') private $compile
    ) { }


  private static link($scope, element: JQuery, attributes) {
    console.log('kind', attributes);


    attributes.$observe('kind', function() {
      element.html('');
      var htm = `<mas-challenges-${attributes.kind} data="ctrl.data"/>`;
      var compiled = $scope.ctrl.$compile(htm)($scope);

      element.append(compiled);

    });
  };

}
