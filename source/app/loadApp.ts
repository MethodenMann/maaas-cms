import {loadArea} from './areas/areas';
import {loadBeacon} from './beacons/beacons';
import {loadMaster} from './master/Master';
import {loadJsDataConfig} from './jsDataConfig';
import {loadImageManagement} from './common/imagemanagement/ImageManagement';
import {loadLogin} from './login/Login';
import {loadRegistration} from './registration/Registration';
import {loadContent} from './content/Content';

export function loadApp(app) {
  loadJsDataConfig(app);
  loadMaster(app);
  loadArea(app);
  loadImageManagement(app);
  loadLogin(app);
  loadRegistration(app);
  loadContent(app);
  loadBeacon(app);
}
