import {loadArea} from './area/Area';
import {loadBeacon} from './beacon/Beacon';
import {loadMaster} from './master/Master';
import {loadJsDataConfig} from './jsDataConfig';
import {loadImageManagement} from './common/imagemanagement/ImageManagement';
import {loadLogin} from './login/Login';
import {loadRegistration} from './registration/Registration';

export function loadApp(app) {
  loadJsDataConfig(app);
  loadMaster(app);
  loadArea(app);
  loadImageManagement(app);
  loadLogin(app);
  loadRegistration(app);
  loadBeacon(app);
}
