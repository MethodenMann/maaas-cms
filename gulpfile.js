var gulp = require('gulp');

var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var open = require('gulp-open');
var Config = require('./gulpfile.config');


var config = new Config();

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: config.baseDestPath,
    livereload: true
  });
  gulp.src('').pipe(open({uri: 'http://localhost:1337'}));
});



gulp.task('typescript-lint', function() {
  return gulp.src(config.applicationSrcPath + '/**/*.ts').pipe(tslint()).pipe(tslint.report('prose'));
});


gulp.task('typescript', function() {
  var tsProject = ts.createProject(config.baseSrcPath + '/tsconfig.json');
  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(gulp.dest(config.applicationDestPath));
});


gulp.task('sass', function() {
  gulp.src(config.sassSrcPath + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(config.sassDestPath));
});


gulp.task('views', function() {
  gulp.src([config.applicationSrcPath + '/**/*.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.applicationDestPath))

    gulp.src(config.baseSrcPath + '/**/*.html')
    .pipe(gulp.dest(config.baseDestPath))
});


gulp.task('bowercopy', function() {
  gulp.src([config.bowerPath + '/angular/angular.min.js', config.bowerPath + '/angular-route/angular-route.min.js'])
    .pipe(gulp.dest(config.libsDestPath));
});

gulp.task('watch', function() {
  gulp.watch(config.applicationSrcPath + '/**/*.ts', ['typescript-lint', 'typescript']);
  gulp.watch([config.applicationSrcPath + '/**/*.jade', config.baseSrcPath + '/**/*.html'], ['views']);
  gulp.watch(config.sassSrcPath, ['sass']);

  gulp.watch([
    config.baseDestPath + '/**/*.html',
    config.baseDestPath + '/**/*.js',
    config.baseDestPath + '/**/*.css'
  ]).on('change', function(file) {
    gulp.src(file.path)
      .pipe(connect.reload());
  });
});

gulp.task('build', ['bowercopy', 'views', 'sass', 'typescript-lint', 'typescript'])

gulp.task('default', ['build', 'connect', 'watch']);
