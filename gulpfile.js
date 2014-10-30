var gulp        = require('gulp'),
    name        = require('gulp-rename'),
    rework      = require('gulp-rework'),
    reworkNPM   = require('rework-npm'),
    reworkVars  = require('rework-vars'),
    includer    = require('gulp-htmlincluder'),
    classPrefix = require('rework-class-prefix'),
    media       = require('rework-custom-media'),
    size        = require('gulp-size'),
    md          = require('gulp-remarkable');

gulp.task('md', function() {
  return gulp.src('splendor.md')
    .pipe(md({ html: true }))
    .pipe(name('-markdown.html'))
    .pipe(gulp.dest('example'));
});

gulp.task('html', ['md', 'css'], function() {
  return gulp.src('example/*.html')
    .pipe(includer())
    .pipe(gulp.dest('./'));
});

gulp.task('css', function() {
  return gulp.src('index.css')
    .pipe(rework(reworkNPM(), classPrefix('splendor-'), media(), reworkVars()))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(name('splendor.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(['*.md', '*.css'], function() {
    gulp.start('default');
  });
});

gulp.task('default', ['md', 'css', 'html', 'watch']);
