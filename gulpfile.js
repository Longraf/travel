const gulp = require('gulp');

const browserSync = require('browser-sync').create(); // live reload
const sass = require('gulp-sass'); //watch sass
const plumber = require('gulp-plumber'); // Отслеживание ошибокnpm
const notify = require("gulp-notify"); //выводит ошибки при сборке Gulp в виде системных сообщений
const autoprefixer = require('gulp-autoprefixer'); // в es5 и кросбраузерность
const sourcemaps = require('gulp-sourcemaps'); // исходные карты
const del = require('del'); // удаляет всё из нужной папки
const runSequence = require('run-sequence'); // Зависимости и последовательность выполнения
const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-html-minifier');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('del', function () {
    return del('./build')
});
gulp.task('del-prod', function () {
    return del('./build')
});
gulp.task('sass', function () {
   return gulp.src('./src/sass/**/*.scss')
       .pipe(plumber({
           errorHandler: function(err) {
               notify.onError({ // Обработка ошибок через gulp-notify
                   title: "Ошибка в CSS/SCSS",
                   message: "<%= error.message %>"
               })(err);
           }
       }))
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('./build/css'))
       .pipe(browserSync.stream())
});
gulp.task('sass-prod', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./prod/css'))
        .pipe(browserSync.stream())
});

gulp.task('fonts', function () { //copy html in build
    return gulp.src('./src/fonts**/*.*')
        .pipe(gulp.dest('./build/fonts'))
        .pipe(browserSync.stream())
});
gulp.task('html', function () { //copy html in build
    return gulp.src('./src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
});
gulp.task('html-prod', function () { //copy html in build
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./prod'))
        .pipe(browserSync.stream())
});
gulp.task('img', function () { //copy img in build/img
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream())
});
gulp.task('img-prod', function () { //copy img in build/img
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('./prod/img'))
        .pipe(browserSync.stream())
});
gulp.task('libs', function() {
    return gulp.src('src/libs/**/*.*')
        .pipe(gulp.dest('./build/libs'))
        .pipe(browserSync.stream());
});
gulp.task('libs-prod', function() {
    return gulp.src('src/libs/**/*.*')
        .pipe(gulp.dest('./prod/libs'))
        .pipe(browserSync.stream());
});


gulp.task('js', function () { //copy js in build/js
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
});
gulp.task('js-prod', function () { //copy js in build/js
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./prod/js'))
        .pipe(browserSync.stream())
});


gulp.task('server', function () {
    browserSync.init({
        server: {baseDir: './build/'}
    });
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['html' ]);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/img/**/*.*', ['img']);
});

gulp.task('dev', function (callback) {
    runSequence(
        'del',
        ['html', 'sass', 'fonts', 'js', 'img', 'libs'],
        'server',
        callback
    );
});
gulp.task('prod', function (callback) {
    runSequence(
        'del-prod',
        ['html-prod', 'sass-prod', 'js-prod', 'img-prod', 'libs-prod'],
        callback
    );
});

// gulp.task('sass:watch', function () {
//     gulp.watch('./src/sass/**/*.scss', ['sass'])
// });