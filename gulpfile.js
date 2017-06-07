(function(gulp) {
    'use strict';
    
    const del = require('del');
    const sass = require('gulp-sass');
    const autoprefixer = require('gulp-autoprefixer');
    const cssmin = require('gulp-cssmin');
    const fileinclude = require('gulp-file-include');
    const closureCompiler = require('gulp-closure-compiler');
    const htmlmin = require('gulp-htmlmin');
    const copy = require('gulp-copy');
    const sitemap = require('gulp-sitemap');
    const rename = require('gulp-rename');
    
    const timestamp = Date.now();
    const css = `main${timestamp}.css`;
    const js = `scripts${timestamp}.js`;

    gulp.task('delFiles', function() {
        return del(['dist/js/**', 'dist/css/**']);
    });
    
    gulp.task('sass', ['delFiles'], function() {
        return gulp.src('src/sass/main.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(rename({suffix: timestamp}))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('autoprefixer', ['sass'], function() {
        return gulp.src('dist/css/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('cssmin', ['autoprefixer'], function() {
        return gulp.src('dist/css/*.css')
            .pipe(cssmin())
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('include', ['cssmin'], function() {
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
    
    gulp.task('jsCompiler', ['include'], function() {
        return gulp.src('src/js/*.js')
            .pipe(closureCompiler({fileName: js,
                                   compilerFlags: {
                                       compilation_level: 'SIMPLE_OPTIMIZATIONS',
                                       language_in: 'ECMASCRIPT6_STRICT',
                                       language_out: 'ECMASCRIPT5_STRICT'
                                   }
                                  }))
            .pipe(gulp.dest('dist/js'));
    });
    
    gulp.task('minifyHTML', ['jsCompiler'], function() {
        return gulp.src('dist/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist'));
    });
    
    
    gulp.task('copy', ['minifyHTML'], function() {
       return gulp.src(['src/img/**', 'src/*.ico', 'src/*.xml', 'src/*.json'])
           .pipe(copy('dist', {prefix: 1}))
    });
    
    gulp.task('default', ['copy'], function () {
        return gulp.src('dist/*.html', {read: false})
            .pipe(sitemap({siteUrl: 'http://www.kkondratowicz.pl'}))
            .pipe(gulp.dest('dist'));
    });
    
    gulp.watch(['src/*.html', 'src/js/**', 'src/sass/**', 'src/templates/**'], ['default']);
    
}(require('gulp')));