import {loadArea} from './areas/Area';
import {loadBeacon} from './beacon/Beacon';
import {loadMaster} from './master/Master';
import {loadJsDataConfig} from './jsDataConfig';
import {loadImageManagement} from './common/imagemanagement/ImageManagement';
import {loadLogin} from './login/Login';
import {loadRegistration} from './registration/Registration';
import {loadContent} from './contents/Content';

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
