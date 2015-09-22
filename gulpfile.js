var gulp = require('gulp');

var ts = require('gulp-typescript');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var connect = require('gulp-connect');


var baseSrcPath = 'www_source';
var baseDestPath = "www";
var sassSrcPath = baseSrcPath + '/styles/**/*.scss';
var sassDestPath = baseDestPath + "/css";
var libsDestPath = baseDestPath+ '/libs';

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});


gulp.task('typescript', function() {
  var tsResult = gulp.src('www_source/scripts/app.ts')
    .pipe(ts({
      noImplicitAny: true,
      out: 'app.js'
    }));
  return tsResult.js.pipe(gulp.dest('www/js'));
});


gulp.task('sass', function() {
  gulp.src(sassSrcPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(sassDestPath));
});


gulp.task('jade', function() {
  gulp.src('www_source/views/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./www/views'))
});


gulp.task('bowercopy', function() {
  gulp.src('./bower_components/angular/angular.js')
    .pipe(gulp.dest(libsDestPath));
});

gulp.task('watch', function() {
  gulp.watch('www_source/scripts/**/*.ts', ['typescript']);
  gulp.watch('www_source/views/**/*.jade', ['jade']);
  gulp.watch(sassSrcPath, ['sass']);

  gulp.watch([
    baseDestPath +'/**/*.html',
    baseDestPath +'/js/**/*.js'
  ]).on('change', function(file) {
    gulp.src(file.path)
      .pipe(connect.reload());
  });
});

gulp.task('build', ['bowercopy', 'jade', 'sass', 'typescript'])

gulp.task('default', ['connect', 'watch']);
