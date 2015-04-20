var browserify = require('gulp-browserify');
var eslint     = require('gulp-eslint');
var glob       = require('glob');
var gulp       = require('gulp');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var path       = require('path');
var sourcemaps = require('gulp-sourcemaps');
var uncss      = require('gulp-uncss');
var watch      = require('gulp-watch');

gulp.task('html', function () {
  gulp
    .src('./src/html/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./'))
});

gulp.task('css', function () {
  gulp
    .src('./src/less/style.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ],
      filename: 'main.less',
      ru: true
    }))
    .pipe(uncss({
      html: glob.sync('./src/html/**/*.html')
    }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest('./assets/css/'))
});

gulp.task('lint', function () {
  return gulp
    .src('./src/es6/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('js', ['lint'], function () {
  gulp
    .src('./src/es6/main.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('watch', function () {
  gulp.watch(['./src/html/**/*.html'], ['html', 'css']);
  gulp.watch(['./src/less/**/*.less'], ['css']);
  gulp.watch(['./src/es6/**/*.js'], ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'watch']);