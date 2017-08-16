'use strict';

/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass']);

gulp.task('sass', ['compile-sass'], function() {
    gulp.watch(['./scss/**/*.scss', './test/**/*.scss'], ['compile-sass']);
});

gulp.task('compile-sass', function() {
    return gulp.src(['./scss/**/*.scss', './test/**/*.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});