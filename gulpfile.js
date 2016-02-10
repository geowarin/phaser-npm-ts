var gulp = require('gulp'),
  deploy = require('gulp-gh-pages'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  runSequence = require('run-sequence'),
  connect = require('gulp-connect'),
  open = require('gulp-open'),
  concat = require('gulp-concat'),
  processhtml = require('gulp-processhtml'),
  exec = require('child_process').exec,
  path = require('path');

var paths = {
  assets: path.join(__dirname, 'assets/**/*'),
  index: path.join(__dirname, 'index.html'),
  build: path.join(__dirname, 'build'),
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules')
};

var sources = [
  path.join(paths.build, 'game.js'),
  path.join(paths.node_modules, 'phaser/build/phaser.js')
];

gulp.task('clean', function (cb) {
  return del([paths.build, paths.dist], cb);
});

gulp.task('copyAssets', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + '/assets'));
});

gulp.task('typescript', function (cb) {
  return exec('node_modules/.bin/tsc -p .', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('typescript:watch', function (cb) {
  return exec('node_modules/.bin/tsc -w --sourceMap -p .', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('processhtml', function () {
  return gulp.src(paths.index)
    .pipe(processhtml())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('connect', function () {
  connect.server({
    root: __dirname,
    port: 9000
  });
});

gulp.task('open', function () {
  gulp.src(paths.index)
    .pipe(open('', {url: 'http://localhost:9000'}));
});

gulp.task('minifyJs', ['typescript'], function () {
  return gulp.src(sources)
    .pipe(uglify())
    .pipe(concat('game.min.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('deploy', function () {
  return gulp.src('dist/**/*').pipe(deploy());
});

gulp.task('default', function (cb) {
  runSequence(['typescript:watch', 'open', 'connect'], cb);
});
gulp.task('build', function (cb) {
  runSequence('clean', ['copyAssets', 'typescript', 'minifyJs', 'processhtml'], cb);
});
