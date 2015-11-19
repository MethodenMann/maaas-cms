var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var Config = require('./gulpfile.config');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var size = require('gulp-size');
var jadelint = require('gulp-jadelint');
var ngConstant = require('gulp-ng-constant');
var server = require( 'gulp-develop-server' );
var bowerSync = require( 'browser-sync' );

var argv = require('yargs').argv;

var config = new Config();

var isProduction = (argv.production === undefined) ? false : true;

function getEnvString(){
  return isProduction ? 'production' : 'development'
}

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('clean', function(callback) {
  return gulp.src(config.baseDestPath)
    .pipe(clean(), callback);
});

gulp.task('typescript-lint', function() {
  return gulp.src(config.applicationSrcPath + '/**/*.ts').pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('systemjs-config', function () {
  return gulp.src(['source/system.config.js'])
    .pipe(gulp.dest('out'));
});

gulp.task('typescript', function() {
  var tsProject = ts.createProject(config.baseSrcPath + '/tsconfig.json');
  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('source/app', 'js');
      path.dirname = path.dirname.replace('source\\app', 'js'); //windows fix
    }))
    .pipe(size({title: 'JS Size:'}))
    .pipe(sourcemaps.write({sourceRoot: '/'}))
    .pipe(gulp.dest('out'));
});

gulp.task('sass', function() {
  gulp.src(config.sassSrcPath + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(config.cssDestPath));
});

gulp.task('views', function() {
  gulp.src([config.baseSrcPath + '/**/*.jade'])
    .pipe(jade({
      pretty: true
    }).on('error', swallowError))
    .pipe(gulp.dest(config.baseDestPath))

  gulp.src(config.baseSrcPath + '/**/*.html')
    .pipe(gulp.dest(config.baseDestPath))
});

gulp.task('jade-lint', function () {
  return gulp
    .src(config.baseSrcPath + '/**/*.jade')
    .pipe(jadelint({ 'UseConsistentQuotes': 'warning' }));
});

gulp.task('template-cache', function () {
  return gulp.src([
      config.baseDestPath + '/**/*.html',
    ])
    .pipe(templateCache('template-cache.js', {
      module: 'maaas.templates',
      standalone: true
    }))
    .pipe(size({title: 'Template Cache Size:'}))
    .pipe(gulp.dest(config.applicationDestPath));

});

gulp.task('copyassets', function() {
  //Images
  gulp.src([
    config.baseSrcPath + '/img/**/*.*'])
    .pipe(gulp.dest(config.baseDestPath + '/img/'));


    //Translations
    gulp.src([config.baseSrcPath + '/app/**/*.json'])
      .pipe(gulp.dest(config.baseDestPath + '/app/'));

  //Bower Libs
  gulp.src([
    config.bowerPath + '/angular/angular.min.js',
    config.bowerPath + '/angular-resource/angular-resource.min.js',
    config.bowerPath + '/angular-cookies/angular-cookies.min.js',
    config.bowerPath + '/angular-translate/angular-translate.min.js',
    config.bowerPath + '/angular-translate-storage-local/angular-translate-storage-local.min.js',
    config.bowerPath + '/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
    config.bowerPath + '/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
    config.bowerPath + '/angular-ui-router/release/angular-ui-router.min.js',
    config.bowerPath + '/jquery/dist/jquery.min.js',
    config.bowerPath + '/js-data/dist/js-data.min.js',
    config.bowerPath + '/js-data-http/dist/js-data-http.min.js',
    config.bowerPath + '/js-data-angular/dist/js-data-angular.min.js',
    config.bowerPath + '/AngularDevise/lib/devise-min.js',
    config.bowerPath + '/bootstrap/dist/js/bootstrap.min.js',
    config.bowerPath + '/metisMenu/dist/metisMenu.min.js',
    config.bowerPath + '/jquery-ui/ui/core.js',
    config.bowerPath + '/jquery-ui/ui/widget.js',
    config.bowerPath + '/jquery-ui/ui/mouse.js',
    config.bowerPath + '/jquery-ui/ui/sortable.js',
    config.bowerPath + '/blueimp-file-upload/js/jquery.iframe-transport.js',
    config.bowerPath + '/blueimp-file-upload/js/jquery.fileupload.js',
    config.bowerPath + '/cloudinary/js/jquery.cloudinary.js',
    config.bowerPath + '/tinycolor/tinycolor.js',
    config.bowerPath + '/angular-color-picker/angularjs-color-picker.min.js',
    config.bowerPath + '/angular-breadcrumb/release/angular-breadcrumb.min.js',
    config.bowerPath + '/angular-ui-tinymce/src/tinymce.js',
    config.bowerPath + '/angular-ui-sortable/sortable.min.js',
    config.bowerPath + '/angular-chart.js/dist/angular-chart.min.js',
    config.bowerPath + '/Chart.js/Chart.min.js',
    config.bowerPath + '/angular-animate/angular-animate.min.js',
    config.bowerPath + '/angular-bootstrap/ui-bootstrap.min.js',
    config.bowerPath + '/angular-bootstrap/ui-bootstrap-tpls.min.js',
    config.bowerPath + '/angular-socket-io/socket.js'
  ]).pipe(gulp.dest(config.libsDestPath));

  gulp.src([
    config.bowerPath + '/tinymce/**/*'
  ]).pipe(gulp.dest(config.libsDestPath + '/tinymce'))

  gulp.src([
    config.nodeModulesPath + '/systemjs/dist/system.js',
    config.nodeModulesPath + '/systemjs/dist/system-polyfills.js'
  ]).pipe(gulp.dest(config.libsDestPath));

  //Bower CSS
  gulp.src([
      config.bowerPath + '/bootstrap/dist/css/bootstrap.min.css',
      config.bowerPath + '/metisMenu/dist/metisMenu.min.css',
      config.bowerPath + '/font-awesome/css/font-awesome.min.css',
      config.bowerPath + '/angular-color-picker/angularjs-color-picker.min.css',
      config.bowerPath + '/tinymce/skins/lightgray/content.min.css',
      config.bowerPath + '/tinymce/skins/lightgray/skin.min.css',
      config.bowerPath + '/angular-chart.js/dist/angular-chart.css'
    ])
    .pipe(gulp.dest(config.cssDestPath));

  //Fonts
  gulp.src([config.bowerPath + '/bootstrap/fonts/**/*.*',
      config.bowerPath + '/font-awesome/fonts/**/*.*',
      config.fontPath + "/**/*.*"
    ])
    .pipe(gulp.dest(config.baseDestPath + '/fonts'));
});

gulp.task('constants', function () {
  var myConfig = require('./' + config.applicationSrcPath + '/config-consts.json');
  var consts = myConfig[getEnvString()];
  return ngConstant({
    name: 'maaas.config',
    wrap: 'amd',
    constants: consts,
    stream: true
  }).pipe(gulp.dest(config.applicationDestPath));
});

gulp.task('watch', function() {
  gulp.watch(config.applicationSrcPath + '/**/*.ts', ['typescript-lint', 'typescript', 'bowerSyncReload']);
  gulp.watch(config.testsSrcPath + '/**/*.ts', ['typescript-lint', 'typescript', 'bowerSyncReload']);
  gulp.watch([config.baseSrcPath + '/**/*.jade', config.baseSrcPath + '/**/*.html'], ['views', 'jade-lint', 'bowerSyncReload']);
  gulp.watch(config.sassSrcPath + '/**/*.scss', ['sass', 'bowerSyncReload']);
  gulp.watch(config.baseSrcPath + '/img/**/*.*', ['copyassets', 'bowerSyncReload']);
  gulp.watch(config.baseSrcPath + '/app/**/*.json', ['copyassets', 'bowerSyncReload']);

  gulp.watch( devServerOptions.server.path, [ 'server:restart' ] )
});

gulp.task('copy-ionicapp', function() {
  gulp.src([config.appPath + '/**/*.*'])
    .pipe(gulp.dest(config.baseDestPath + '/ionic-app/'));
});


gulp.task('bowerSyncReload', function() {
  bowerSync.reload();
});


var devServerOptions = {
  server: {
    path: './app.js'
  },
  bs: {
    port: 3001,
    ghostMode: false,
    proxy: 'http://localhost:1338',
    ui: {
      port: 3002
    }
  }
};


gulp.task('server:start', function() {
  server.listen( devServerOptions.server, function(error ) {
    if( ! error ) bowerSync( devServerOptions.bs );
  });
});


gulp.task('server:restart', function() {
  server.restart( function( error ) {
    if( ! error ) bowerSync.reload();
  });
});


gulp.task('lint', ['typescript-lint', 'jade-lint']);

gulp.task('build', function(callback) {
  runSequence('clean', ['copyassets', 'views', 'sass', 'typescript', 'constants', 'systemjs-config', 'copy-ionicapp'],  'template-cache', callback);
});

gulp.task('default', function() {
  runSequence('build', 'server:start', 'watch');
});
