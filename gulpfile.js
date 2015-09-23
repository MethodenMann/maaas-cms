var gulp = require('gulp');

var ts = require('gulp-typescript');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');


var baseSrcPath = 'www_source';
var baseDestPath = "www";
var sassSrcPath = baseSrcPath + '/styles';
var sassDestPath = baseDestPath + "/css";
var libsDestPath = baseDestPath + '/libs';
var typescriptSrcPath = baseSrcPath + '/scripts';
var typescriptDestPath = baseDestPath + 'js'
var jadeSrcPath = baseSrcPath + '/views';
var jadeDestPath = baseDestPath + '/views';
var bowerPath = './bower_components';

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: 'www',
    livereload: true
  });
});


gulp.task('typescript', function() {
  var tsResult = gulp.src(typescriptSrcPath '/app.ts')
    .pipe(ts({
      noImplicitAny: true,
      out: 'app.js'
    }));
  return tsResult.js.pipe(gulp.dest(typescriptDestPath));
});


gulp.task('sass', function() {
  gulp.src(sassSrcPath + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(sassDestPath));
});


gulp.task('jade', function() {
  gulp.src(jadeSrcPath + '/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(jadeDestPath))
});


gulp.task('bowercopy', function() {
  gulp.src(bowerPath + '/angular/angular.js')
    .pipe(gulp.dest(libsDestPath));
});

gulp.task('watch', function() {
  gulp.watch(typescriptSrcPath + '/**/*.ts', ['typescript']);
  gulp.watch(jadeSrcPath + '/**/*.jade', ['jade']);
  gulp.watch(sassSrcPath, ['sass']);

  gulp.watch([
    baseDestPath + '/**/*.html',
    typescriptDestPath + '/**/*.js',
    sassDestPath + '/**/*.css';
  ]).on('change', function(file) {
    gulp.src(file.path)
      .pipe(connect.reload());
  });
});

gulp.task('build', ['bowercopy', 'jade', 'sass', 'typescript'])

gulp.task('default', ['connect', 'watch']);
