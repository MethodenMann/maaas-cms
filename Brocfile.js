var env = require('broccoli-env').getEnv();

var compileTypeScript  = require('broccoli-typescript');
var uglifyJavaScript = require('broccoli-uglify-js');
var compileSass = require('broccoli-sass');
var pickFiles = require('broccoli-static-compiler');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var jade = require('broccoli-jade');


console.log("build for " + env)






function prepareCss() {
  var styles = pickFiles('www_source', {
    srcDir: '/styles',
    destDir: '/styles'
  })


  return compileSass([styles], '/styles/app.scss', 'css/app.css')
}
function prepareTemplates() {
  function pickTemplates(srcDir) {
    var templates = pickFiles('www_source', {
      srcDir: srcDir,
      files: ['**/*.jade'],
      destDir: '/templates'
    })
    return templates
  }

  var templates = pickTemplates('/templates')

  var sourceTrees = [templates]

  if (env == "development") {
    var templatesDev = pickTemplates('/dev/templates')
    sourceTrees.push(templatesDev)
  }

  var appStyles = new mergeTrees(sourceTrees, { overwrite: true })

  return jade(appStyles, {pretty: true})
}

function copyRemainingAssets() {
  return pickFiles('www_source', {
     srcDir: '/',
     files: ['**/*.html', 'img/**/*.*'],
     destDir: '.'
  });
}

module.exports = mergeTrees([prepareTemplates(), prepareCss(), copyRemainingAssets()])
