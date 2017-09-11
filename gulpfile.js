var gulp = require('gulp');
var jsonminify = require('gulp-jsonminify');
var htmlmin = require('gulp-htmlmin')
var uglify = require('gulp-uglify')
var del =require('del')
var runSequence = require('run-sequence')
var minifycss = require('gulp-minify-css')

gulp.task('clean', () => {
  return del(['./dist/**'])
})


gulp.task('jsonPro',  () => {
  return gulp.src('./src/**/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('templates', () => {
  return gulp.src('./src/**/*.wxml')
    .pipe(gulp.dest('./dist'))
})

gulp.task('templatesPro', () => {
  return gulp.src('./src/**/*.wxml')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      keepClosingSlash: true
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('jsmin', () => {
  return gulp.src('./src/**/*.js')
    .pipe(uglify({
      compress: true,
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('assets', () => {
  return gulp.src('./src/image/**')
    .pipe(gulp.dest('./dist/image'))
})


gulp.task('minifycss', function(){
    gulp.src('src/**/*.wxss')
    .pipe(minifycss())
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', [
  'jsonPro',
  'assets',
  'minifycss',
  'templatesPro',
  'jsmin',

]);

gulp.task('dev', ['clean'], () => {
  runSequence('build');
})













