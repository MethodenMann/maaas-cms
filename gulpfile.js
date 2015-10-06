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

  //Bower Libs
  gulp.src([
    config.bowerPath + '/angular/angular.min.js',
    config.bowerPath + '/angular-resource/angular-resource.min.js',
    config.bowerPath + '/angular-ui-router/release/angular-ui-router.min.js',
    config.bowerPath + '/jquery/dist/jquery.min.js',
    config.bowerPath + '/js-data/dist/js-data.min.js',
    config.bowerPath + '/js-data-http/dist/js-data-http.min.js',
    config.bowerPath + '/js-data-angular/dist/js-data-angular.min.js',
    config.bowerPath + '/bootstrap/dist/js/bootstrap.min.js',
    config.bowerPath + '/metisMenu/dist/metisMenu.min.js',
    config.bowerPath + '/blueimp-file-upload/js/jquery.fileupload.js',
    config.bowerPath + '/blueimp-file-upload/js/jquery.iframe-transport.js',
    config.bowerPath + '/cloudinary/js/jquery.cloudinary.js',
    config.bowerPath + '/jquery-ui/ui/widget.js'
  ]).pipe(gulp.dest(config.libsDestPath));

  //Bower CSS
  gulp.src([config.bowerPath + '/bootstrap/dist/css/bootstrap.min.css',
      config.bowerPath + '/metisMenu/dist/metisMenu.min.css',
      config.bowerPath + '/font-awesome/css/font-awesome.min.css'
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

  gulp.watch([
    config.baseDestPath + '/**/*.html',
    config.baseDestPath + '/**/*.js',
    config.baseDestPath + '/**/*.css'
  ]).on('change', function(file) {
    gulp.src(file.path)
      .pipe(connect.reload());
  });
});

gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: ['out'],
      routes: {
        "/node_modules": "node_modules"
      }
    },
    files: ['out/**/*'],
    port: 1337,
    open: false
  });
});

gulp.task('build', function(callback) {
  runSequence('clean', ['copyassets', 'views', 'sass', 'typescript', 'systemjs-config'], callback);
});

gulp.task('default', function() {
  runSequence('build', 'serve', 'watch');
});
