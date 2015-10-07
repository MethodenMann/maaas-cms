import {Inject} from '../utils/di';

export class LoginComponent {
  private static selector = 'mas-login-component';
  private static templateUrl = './app/login/view/login-component.html';

  private email: String;
  private password: String;

  constructor(
    @Inject('Auth') private Auth,
    @Inject('$state') private $state
  ) {}

  login() {
    var credentials = {
      email: this.email,
      password: this.password
    };

    this.Auth.login(credentials).then((user) => {
      this.$state.go('cms');
    }, function(error) {
        // Authentication failed...
    });
  }

  private static link($scope, element: JQuery, attributes) {}
}
