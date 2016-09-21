'use strict';

/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass']);

gulp.task('sass', ['compile-sass', 'compile-sass-and-minify-css'], function() {
    gulp.watch(['./scss/**/*.scss', './test/**/*.scss'], ['compile-sass', 'compile-sass-and-minify-css']);
});

gulp.task('compile-sass', function() {
    return gulp.src(['./scss/**/*.scss', './test/**/*.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile-sass-and-minify-css', function() {
    return gulp.src(['./scss/**/*.scss', './test/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});