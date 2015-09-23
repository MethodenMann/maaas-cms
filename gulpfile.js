var gulp = require('gulp');

var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var Config = require('./gulpfile.config');


var config = new Config();

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: 'www',
    livereload: true
  });
});


gulp.task('typescript-lint', function() {
  return gulp.src(config.typescriptSrcPath + '/**/*.ts').pipe(tslint()).pipe(tslint.report('prose'));
});



gulp.task('typescript', function() {
  var tsResult = gulp.src(config.typescriptSrcPath + '/App.ts')
    .pipe(sourcemaps.init())
    .pipe(ts({
      noImplicitAny: true,
      out: 'app.js'
    }));
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.typescriptDestPath));
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


gulp.task('jade', function() {
  gulp.src(config.jadeSrcPath + '/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jadeDestPath))
});


gulp.task('bowercopy', function() {
  gulp.src(config.bowerPath + '/angular/angular.js')
    .pipe(gulp.dest(config.libsDestPath));
  gulp.src(config.bowerPath + '/jquery/dist/jquery.js')
    .pipe(gulp.dest(config.libsDestPath));
  gulp.src(config.bowerPath + '/blueimp-file-upload/js/jquery.fileupload.js')
    .pipe(gulp.dest(config.libsDestPath));
  gulp.src(config.bowerPath + '/blueimp-file-upload/js/jquery.iframe-transport.js')
    .pipe(gulp.dest(config.libsDestPath));
  gulp.src(config.bowerPath + '/cloudinary/js/jquery.cloudinary.js')
    .pipe(gulp.dest(config.libsDestPath));
  gulp.src(config.bowerPath + '/jquery-ui/ui/widget.js')
    .pipe(gulp.dest(config.libsDestPath));
});

gulp.task('watch', function() {
  gulp.watch(config.typescriptSrcPath + '/**/*.ts', ['typescript-lint', 'typescript']);
  gulp.watch(config.jadeSrcPath + '/**/*.jade', ['jade']);
  gulp.watch(config.sassSrcPath, ['sass']);

  gulp.watch([
    config.baseDestPath + '/**/*.html',
    config.typescriptDestPath + '/**/*.js',
    config.sassDestPath + '/**/*.css'
  ]).on('change', function(file) {
    gulp.src(file.path)
      .pipe(connect.reload());
  });
});

gulp.task('build', ['bowercopy', 'jade', 'sass', 'typescript-lint', 'typescript'])

gulp.task('default', ['build', 'connect', 'watch']);
