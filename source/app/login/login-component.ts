import {Inject} from '../utils/di';

export class LoginComponent {
  private static selector = 'mas-login-component';
  private static templateUrl = './app/login/login-component.html';

  private email:String;
  private password:String;
  private feedback:string = '';

  constructor(@Inject('Auth') private Auth,
              @Inject('$state') private $state,
              @Inject('$filter') private $filter) {
  }

  login() {
    this.feedback = '';
    var credentials = {
      email: this.email,
      password: this.password
    };


    this.Auth.login(credentials).then((user) => {
      this.$state.go('cms.welcome');
    }, (error) => {
      this.feedback = this.$filter('translate')('login_failed');
    });
  }

  private static link($scope, element:JQuery, attributes) {
    element.bind('keydown keypress', (event) => {
      if (event.which === 13) {
        $scope.ctrl.login();
      }
    });
  }
}
