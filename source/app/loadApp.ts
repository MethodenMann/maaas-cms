import {loadArea} from './areas/areas';
import {loadBeacon} from './beacons/beacons';
import {loadQuiz} from './quiz/quiz';
import {loadMaster} from './master/master';
import {loadJsDataConfig} from './jsDataConfig';
import {loadCommon} from './common/common';
import {loadLogin} from './login/Login';
import {loadRegistration} from './registration/Registration';
import {loadContent} from './contents/Content';

export function loadApp(app) {
  loadJsDataConfig(app);
  loadMaster(app);
  loadArea(app);
  loadCommon(app);
  loadLogin(app);
  loadRegistration(app);
  loadContent(app);
  loadBeacon(app);
  loadQuiz(app);
}
