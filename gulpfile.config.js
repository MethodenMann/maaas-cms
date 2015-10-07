'use strict';
var GulpConfig = (function() {
  function gulpConfig() {
    this.baseSrcPath = 'source';
    this.baseDestPath = 'out';

    this.sassSrcPath = this.baseSrcPath + '/styles';
    this.cssDestPath = this.baseDestPath + '/css';

    this.applicationSrcPath = this.baseSrcPath + '/app';
    this.applicationDestPath = this.baseDestPath + '/app'
    this.bowerPath = './bower_components';
    this.nodeModulesPath = './node_modules';
    this.libsDestPath = this.baseDestPath + '/libs';
  }
  return gulpConfig;
})();
module.exports = GulpConfig;
