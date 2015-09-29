var gulp = require('gulp');

var rename = require('gulp-rename');
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

var config = new Config();

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: config.baseDestPath,
    livereload: true
  });
});


gulp.task('clean', function(callback) {
  return gulp.src(config.baseDestPath)
    .pipe(clean(), callback);
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
  gulp.src([config.bowerPath + '/angular/angular.min.js',
      config.bowerPath + '/angular-route/angular-route.min.js',
      config.bowerPath + '/jquery/dist/jquery.min.js',
      config.bowerPath + '/bootstrap/dist/js/bootstrap.min.js',
      config.bowerPath + '/metisMenu/dist/metisMenu.min.js'
    ])
    .pipe(gulp.dest(config.libsDestPath));

  //sb admin js with rename
  gulp.src(config.bowerPath + '/sb-admin-2/index.js')
    .pipe(rename('sb-admin.js'))
    .pipe(gulp.dest(config.libsDestPath));

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

gulp.task('build', function(callback) {
  runSequence('clean', ['copyassets', 'views', 'sass', 'typescript'], callback);
});

gulp.task('default', function() {
  runSequence('build', 'connect', 'watch');
});
