(function(gulp) {
    'use strict';
    
    const del = require('del');
    const sass = require('gulp-sass');
    const autoprefixer = require('gulp-autoprefixer');
    const cssmin = require('gulp-cssmin');
    const replace = require('gulp-string-replace');
    const copy = require('gulp-copy');
    const pixrem = require('gulp-pixrem');
    const webpack = require('webpack');
    const gulpWebpack = require('gulp-webpack');
    const webpackConfig = require('./config/bundler.js');
    const livereload = require('gulp-livereload');
    const sitemap = require('gulp-sitemap');
    const rename = require('gulp-rename');
    const fileinclude = require('gulp-file-include');
    const htmlmin = require('gulp-htmlmin');
    
    const browserSupport = ['last 2 version', 'safari >= 5', 'ie >= 11', 'ios >= 8', 'android >= 4.4'];

    const timestamp = Date.now();
    const css = `main${timestamp}.css`;
    const js = `main${timestamp}.js`;

    gulp.task('delFiles', function() {
        return del(['dist/js/**', 'dist/css/**']);
    });

    gulp.task('sass', ['delFiles'], function() {
        return gulp.src('src/sass/main.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(rename({suffix: timestamp}))
            .pipe(gulp.dest('dist/css'));
    });
    
    gulp.task('cssmin', ['sass'], function() {
        return gulp.src('dist/css/*.css')
            .pipe(autoprefixer({
                browsers: browserSupport,
                cascade: false
            }))
            .pipe(cssmin())
            .pipe(pixrem('10px', {
                browsers: browserSupport 
            }))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('include', ['cssmin'], () => {
        gulp.src(['src/index.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: 'src/templates',
                context: {
                    js: `/js/${js}`,
                    css: `/css/${css}`
                }
        }))
        .pipe(gulp.dest('dist'));
    });

    gulp.task('js', ['include'], () => {
        return gulp.src('src/js/main.js')
            .pipe(gulpWebpack(webpackConfig, webpack))
            .pipe(rename((path) => {
                if(path.extname === '.map') {
                    return false;
                }

                path.basename = `main${timestamp}`;
            }))
            .pipe(gulp.dest('dist/js/'));
    });

    gulp.task('whitespace', ['js'], () => {
        return gulp.src(['dist/js/*.js'])
            .pipe(replace(/\\n\s+/g, ''))
            .pipe(gulp.dest('dist/js/'));
    });

    gulp.task('minifyHTML', ['whitespace'], () => {
        return gulp.src('dist/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('copy', ['minifyHTML'], () => {
        return gulp.src(['src/img/**', 'src/*.ico', 'src/*.xml', 'src/*.json'])
            .pipe(copy('dist', {prefix: 1}))
    });
     
    gulp.task('sitemap', ['copy'], () => {
        return gulp.src('dist/*.html', {read: false})
            .pipe(sitemap({siteUrl: 'https://www.kkondratowicz.pl'}))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('default', ['sitemap'], () => {
        gulp.watch(['src/*.html', 'src/js/**', 'src/sass/**', 'src/templates/**'], ['default']);
    });

}(require('gulp')));