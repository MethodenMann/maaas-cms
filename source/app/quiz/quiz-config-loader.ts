import {Inject} from '../utils/di';

export class QuizConfigLoader {
  public static selector = 'mas-quiz-config-loader';

  private static options = {
    bindToController: {
      quizType: '@',
      quizConfig: '='
    }
  };


  constructor(
    @Inject('$scope') private $scope,
    @Inject('$compile') private $compile
    ) { }


  private static link($scope, element: JQuery, attributes) {
    console.log("type", attributes)



    attributes.$observe('quizType', function(newVal, oldVal) {
      element.html('');

      $scope.data = { name: "test" };
      console.log(attributes.quizType);
      var htm = `<mas-quiz-${attributes.quizType} quiz-config="ctrl.quizConfig"/>`;
      var compiled = $scope.ctrl.$compile(htm)($scope);

      element.append(compiled);

    });
  };

}
