'use strict';
var GulpConfig = (function() {
  function gulpConfig() {
    this.appPath = 'ionic_app';
    this.baseSrcPath = 'source';
    this.baseDestPath = 'out';

    this.sassSrcPath = this.baseSrcPath + '/styles';
    this.cssDestPath = this.baseDestPath + '/css';

    this.applicationSrcPath = this.baseSrcPath + '/app';
    this.testsSrcPath = this.baseSrcPath + '/tests';
    this.applicationDestPath = this.baseDestPath + '/app'
    this.bowerPath = './bower_components';
    this.fontPath = this.baseSrcPath + '/fonts';
    this.nodeModulesPath = './node_modules';
    this.libsDestPath = this.baseDestPath + '/libs';
  }
  return gulpConfig;
})();
module.exports = GulpConfig;
