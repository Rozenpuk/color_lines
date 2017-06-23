// var gulp = require('gulp');
// var watchLess = require('gulp-watch-less');
// var less = require('gulp-less');
//
// gulp.task('default', function () {
//     return gulp.src('src/style/style.less')
//         .pipe(watchLess('src/style/style.less'))
//         .pipe(less())
//         .pipe(gulp.dest('build/style'));
// });

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var del = require('del');
var imageminPngquant = require('imagemin-pngquant');

gulp.task('clean', function()
{
    del.sync('./build/**/**/*');
});

gulp.task('fonts', function() {
    return gulp.src(['./src/fonts/**'])
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('assets',
 // ['clean'],
  function()
{
    return gulp.src(['./src/assets/**'])
        .pipe(plumber())
        // .pipe(imagemin([
        // 	imagemin.optipng({optimizationLevel: 5})
        // ]))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/assets'));
});

gulp.task('scripts', function() {
    gulp.src('src/main.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(rename('build.js'))
        .pipe(gulp.dest('./build'))
});

gulp.task('index', function()
{
    return gulp.src(['./src/index.html'])
        .pipe(plumber())
        .pipe(gulp.dest('./build'));
});

gulp.task('less', function() {
    return gulp.src('./src/style/style.less')  // only compile the entry file
        .pipe(less())
        .pipe(gulp.dest('./build/style'))
});
gulp.task('watch', function() {
    gulp.watch('./src/**/*', ['less', 'index', 'scripts', 'assets', 'fonts']);  // Watch all the .less files, then run the less task
});

gulp.task('browser-sync', function()
{
    return browserSync({ server:  { baseDir: './build' } });
});

gulp.task('default', ['clean', 'browser-sync', 'watch', 'less', 'index', 'scripts', 'assets', 'fonts']); // Default will run the 'entry' watch task
