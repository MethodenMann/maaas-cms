'use strict';
var GulpConfig = (function() {
  function gulpConfig() {
    this.baseSrcPath = 'www_source';
    this.baseDestPath = "www";
    this.sassSrcPath = this.baseSrcPath + '/styles';
    this.sassDestPath = this.baseDestPath + "/css";
    this.libsDestPath = this.baseDestPath + '/libs';
    this.typescriptSrcPath = this.baseSrcPath + '/scripts';
    this.typescriptDestPath = this.baseDestPath + '/js'
    this.jadeSrcPath = this.baseSrcPath + '/views';
    this.jadeDestPath = this.baseDestPath + '/views';
    this.bowerPath = './bower_components';
  }
  return gulpConfig;
})();
module.exports = GulpConfig;
