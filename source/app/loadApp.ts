import {loadArea} from './areas/areas';
import {loadBeacon} from './beacons/beacons';
import {loadChallenge} from './challenges/challenge';
import {loadMaster} from './master/master';
import {loadJsDataConfig} from './js-data-config';
import {loadCommon} from './common/common';
import {loadLogin} from './login/login';
import {loadRegistration} from './registration/Registration';
import {loadContent} from './contents/content';
import {loadMuseum} from './museums/museums';
import {loadTour} from './tours/tour';
import {loadTranslations} from './translation/translations';
import {loadStatistic} from './statistics/statistics';
import {loadPreview} from './preview/preview';


export function loadApp(app) {
  loadJsDataConfig(app);
  loadMaster(app);
  loadArea(app);
  loadCommon(app);
  loadLogin(app);
  loadRegistration(app);
  loadContent(app);
  loadBeacon(app);
  loadChallenge(app);
  loadMuseum(app);
  loadTour(app);
  loadTranslations(app);
  loadStatistic(app);
  loadPreview(app);
}
