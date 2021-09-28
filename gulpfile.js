/* global require, exports */

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    del = require('del'),
    paths = {
        css: {
            src: ['src/css/my-bootstrap.css', 'src/css/**/*.css'],  // multiple source
            dest: 'dist/css/'
        },
        sass: {
            src: 'src/sass/files/**/*.sass',
            dest: 'dist/css/'
        },
        js: {
            src: ['src/js/jquery-3.5.1.min.js', 'src/js/**/*.js'],
            dest: 'dist/js/'
        },
        html: {
            src: 'src/index.html',
            dest: 'dist/'
        },
        fonts: {
            src: 'src/fonts/**',
            dest: 'dist/fonts/'
        },
        images: {
            src: 'src/images/**',
            dest: 'dist/images/'
        }
    };
function clean() {
    'use strict';
    return del(['dist/**', '!dist']);
}

function css_fun() {
    'use strict';
    return gulp.src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(csso({
            restructure: true,
            sourceMap: true,
            debug: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest));
}

function sass_fun() {
    'use strict';
    return gulp.src(paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.sass'))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.sass.dest));
}

function html_fun() {
    'use strict';
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest));
}

function fonts_fun() {
    'use strict';
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

function javascript_fun() {
    'use strict';
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest));
}

function images_fun() {
    'use strict';
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

function watch_fun() {
    'use strict';
    gulp.watch(paths.js.src, javascript_fun);
    gulp.watch(paths.css.src, css_fun);
    gulp.watch(paths.sass.src, sass_fun);
    gulp.watch(paths.html.src, html_fun);
    gulp.watch(paths.fonts.src, fonts_fun);
    gulp.watch(paths.images.src, images_fun);
}


exports.default = gulp.series(clean, html_fun, css_fun, javascript_fun, sass_fun, fonts_fun, images_fun, gulp.parallel(watch_fun));
