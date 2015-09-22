var env = require('broccoli-env').getEnv();

var compileTypeScript  = require('broccoli-typescript');
var tsTranspiler = require('broccoli-typescript-compiler');
var uglifyJavaScript = require('broccoli-uglify-js');
var compileSass = require('broccoli-sass');
var pickFiles = require('broccoli-static-compiler');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var jade = require('broccoli-jade');


console.log("build for " + env)


function prepareJs() {
  function pickTypeScripts(root) {
    tree = pickFiles(root, {
      srcDir: '/',
      destDir: '/js'
    })
    return tsTranspiler(tree);
  }
  var app = pickTypeScripts('www_source/scripts')

  var sourceTrees = [app]
  // if (env !== 'production') {
  //   var appDev = pickTypeScripts('www_source/dev/js')
  //   sourceTrees.push(appDev)
  // }
  var appJs = new mergeTrees(sourceTrees, { overwrite: true })

  appJs = concat(appJs, {
    inputFiles: [
      '**/*.js'
    ],
    outputFile: '/js/app.js',
    separator: '\n',
    wrapInFunction: true
  })

  if (env === 'production') {
    appJs = uglifyJavaScript(appJs, {})
  }
  return appJs
}





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
      destDir: '/views'
    })
    return templates
  }

  var templates = pickTemplates('/views')

  var sourceTrees = [templates]

  // if (env == "development") {
  //   var templatesDev = pickTemplates('/dev/views')
  //   sourceTrees.push(templatesDev)
  // }

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

function copyNodeModules() {
  return pickFiles('node_modules', {
     srcDir: '/',
     files: ['angular/*.*'],
     destDir: 'node_modules'
  });
}

module.exports = mergeTrees([prepareJs(), prepareTemplates(), prepareCss(), copyRemainingAssets(), copyNodeModules()])
