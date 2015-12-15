import {Inject} from '../utils/di';

export class RegistrationComponent {
  private static selector = 'mas-registration-component';
  private static templateUrl = './app/registration/registration-component.html';

  private email:String;
  private password:String;
  private passwordConfirmation:String;
  private errors:any;

  constructor(@Inject('Auth') private Auth,
              @Inject('$state') private $state,
              @Inject('DS') private DS) {
    this.Auth.logout();
    DS.clear();
  }

  register() {
    var credentials = {
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation
    };

    this.Auth.register(credentials).then((user) => {
      this.errors = undefined;
      this.$state.go('cms.welcome');
    }, (error) => {
      this.errors = error.data.errors;
    });
  }

  private static link($scope, element:JQuery, attributes) {
    element.bind('keydown keypress', (event) => {
      if (event.which === 13) {
        $scope.ctrl.register();
      }
    });
  }
}
