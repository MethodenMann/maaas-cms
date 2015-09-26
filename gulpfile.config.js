'use strict';
var GulpConfig = (function() {
  function gulpConfig() {
    this.baseSrcPath = 'source';
    this.baseDestPath = "out";

    this.sassSrcPath = this.baseSrcPath + '/styles';
    this.sassDestPath = this.baseDestPath + "/css";

    this.applicationSrcPath = this.baseSrcPath + '/app';
    this.applicationDestPath = this.baseDestPath + '/app'
    this.bowerPath = './bower_components';
    this.libsDestPath = this.baseDestPath + '/libs';
  }
  return gulpConfig;
})();
module.exports = GulpConfig;
