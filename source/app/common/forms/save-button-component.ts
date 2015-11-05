import {Inject} from '../../utils/di';

export class SaveButtonComponent {
  private static selector = 'mas-save-button';
  private static templateUrl = './app/common/forms/save-button-component.html';

  private animationClass;
  private iconClass;
  private disabled;
  private feedbackMessage = '';


  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$timeout') protected $timeout
  ) {

    this.showDefault();

    $scope.$on('mas.saveprogess', (e, status) => {
      if (status === 'in-progress'){
       this.showInProgress()
      }
      else if (status === 'rejected'){
        this.showRejected()
      }
      else if (status === 'successfully'){
        $timeout(() => {
          this.showSuccessfully()
        }, 500);

      }
    });
  }


  showDefault(){
    this.animationClass = '';
    this.iconClass = 'fa-save';
    this.disabled = false;
  }

  showSuccessfully(){
    this.showDefault();

    var currentdate = new Date();
    var time = `${currentdate.getHours()}:${currentdate.getMinutes()}`;


    this.feedbackMessage = 'Zuletzt gespeichert um ' + time + ' Uhr';
  }

  showInProgress(){
    this.animationClass = 'spinning';
    this.iconClass = 'fa-spinner';
    this.disabled = true;
  }

  showRejected(){
    this.showDefault();
  }
}