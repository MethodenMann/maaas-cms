import {Inject} from '../utils/di';

export class RegistrationComponent {
  private static selector = 'mas-registration-component';
  private static templateUrl = './app/registration/view/registration-component.html';

  private email: String;
  private password: String;
  private passwordConfirmation: String;

  constructor(@Inject('Auth') private Auth) {}

  register() {
    var credentials = {
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation
    };

    this.Auth.register(credentials).then((user) => {

    }, function(error) {

    });
  }

  private static link($scope, element: JQuery, attributes) {}
}
