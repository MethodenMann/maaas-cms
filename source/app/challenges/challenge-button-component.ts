import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';

export class ChallengeButtonComponent {

  private static templateUrl = './app/challenges/challenge-button-component.html';
  private static selector = 'mas-challenge-button';

  private static options = {
    bindToController: {
      challenge: '='
    }
  };

  private challenge: IChallenge;
}
