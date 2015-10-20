import {Inject} from '../utils/di';

export class KindConfigLoader {
  public static selector = 'mas-challenges-kind-config-loader';

  private static options = {
    bindToController: {
      type: '@',
      config: '='
    }
  };


  constructor(
    @Inject('$scope') private $scope,
    @Inject('$compile') private $compile
    ) { }


  private static link($scope, element: JQuery, attributes) {
    console.log("type", attributes)



    attributes.$observe('type', function() {
      element.html('');

      console.log(attributes.type);
      var htm = `<mas-challenges-${attributes.type} quiz-config="ctrl.config"/>`;
      var compiled = $scope.ctrl.$compile(htm)($scope);

      element.append(compiled);

    });
  };

}
