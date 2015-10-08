var gulp = require('gulp');

var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var Config = require('./gulpfile.config');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var size = require('gulp-size');
var browserSync = require('browser-sync').create();

var config = new Config();

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

gulp.task('copyassets', function() {
  //Images
  gulp.src([config.baseSrcPath + '/img/**/*.*'])
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
    config.bowerPath + '/jquery-ui/ui/widget.js',
    config.bowerPath + '/blueimp-file-upload/js/jquery.iframe-transport.js',
    config.bowerPath + '/blueimp-file-upload/js/jquery.fileupload.js',
    config.bowerPath + '/cloudinary/js/jquery.cloudinary.js',
    config.bowerPath + '/tinycolor/tinycolor.js',
    config.bowerPath + '/angular-color-picker/angularjs-color-picker.min.js'


  ]).pipe(gulp.dest(config.libsDestPath));

  gulp.src([
    config.nodeModulesPath + '/systemjs/dist/system.js',
    config.nodeModulesPath + '/systemjs/dist/system-polyfills.js'
  ]).pipe(gulp.dest(config.libsDestPath));

  //Bower CSS
  gulp.src([config.bowerPath + '/bootstrap/dist/css/bootstrap.min.css',
      config.bowerPath + '/metisMenu/dist/metisMenu.min.css',
      config.bowerPath + '/font-awesome/css/font-awesome.min.css',
      config.bowerPath + '/angular-color-picker/angularjs-color-picker.min.css'
    ])
    .pipe(gulp.dest(config.cssDestPath));

  //Fonts
  gulp.src([config.bowerPath + '/bootstrap/fonts/**/*.*',
      config.bowerPath + '/font-awesome/fonts/**/*.*'
    ])
    .pipe(gulp.dest(config.baseDestPath + '/fonts'));
});

gulp.task('watch', function() {
  gulp.watch(config.applicationSrcPath + '/**/*.ts', ['typescript-lint', 'typescript']);
  gulp.watch([config.baseSrcPath + '/**/*.jade', config.baseSrcPath + '/**/*.html'], ['views']);
  gulp.watch(config.sassSrcPath + '/**/*.scss', ['sass']);
  gulp.watch(config.baseSrcPath + '/img/**/*.*', ['copyassets']);
  gulp.watch(config.baseSrcPath + '/app/**/*.json', ['copyassets']);

  gulp.watch([
    config.baseDestPath + '/**/*.*'
  ]).on('change', function(file) {
    gulp.src(file.path)
      .pipe(connect.reload());
  });
});

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: config.baseDestPath,
    livereload: true
  });
});

gulp.task('build', function(callback) {
  runSequence('clean', ['copyassets', 'views', 'sass', 'typescript', 'systemjs-config'], callback);
});

gulp.task('default', function() {
  runSequence('build', 'connect', 'watch');
});
