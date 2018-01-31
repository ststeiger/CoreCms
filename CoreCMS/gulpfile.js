/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    concat = require("gulp-concat"),
    gap = require('gulp-append-prepend'),
    rename = require('gulp-rename'),
    uglify = require("gulp-uglify"),
    cssnano = require("gulp-cssnano"),
    sass = require("gulp-sass"),
    cssbeautify = require('gulp-cssbeautify'),
    cssbeautifyOptions = { indent: '  ', openbrace: 'separate-line', autosemicolon: true },
    jsbeautify = require('gulp-jsbeautify'),
    jsbeautifyOptions = { indentSize: 2 },
    endOfLineNormalizer = require('gulp-line-ending-corrector'),
    // eolc Desired End of Line character. can be CR (\r), LF(\n) (Default), CRLF(\r\n)
    endOfLineSettings = { verbose: true, eolc: 'CRLF', encoding: 'utf8' }, 
    minimizerEndOfLineSettings = { verbose: true, eolc: 'LF', encoding: 'utf8' }, 
    prettyData = require('gulp-pretty-data'),
    minifyDataSettings = { type: 'minify', preserveComments: false, extensions: {'xlf': 'xml', 'svg': 'xml' }  },
    prettifyDataSettings = { type: 'prettify', preserveComments: true, extensions: { 'xlf': 'xml', 'svg': 'xml' } },
    replace = require('gulp-replace'),
    webpack = require("webpack"),
    webpackStream = require("webpack-stream")
;

var author = '"github.com/ststeiger"'
    , currentYear = (new Date()).getFullYear().toString()
    , copyright = 'Copyright © ' + currentYear + ' ' + author + ' \r\n'
        + 'All rights reserved. \r\n\r\n'
        + 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, \r\n'
        + 'EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES \r\n'
        + 'OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. \r\n'
        + 'IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, \r\n'
        + 'DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, \r\n'
        + 'ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE \r\n'
        + 'OR OTHER DEALINGS IN THE SOFTWARE. '
    ;



gulp.task("js:min:all", function ()
{
    return gulp.src(["./wwwroot/app/**/*.js", "!" + "./wwwroot/app/**/*.min.js"
        , "./wwwroot/GeneratedScripts/**/*.js", "!" + "./wwwroot/GeneratedScripts/**/*.min.js"], { base: "." })
        .pipe(concat("./wwwroot/js/myscripts.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});


gulp.task("js:min:each", function ()
{
    return gulp.src(["./wwwroot/app/**/*.js", "!" + "./wwwroot/app/**/*.min.js"
        , "./wwwroot/GeneratedScripts/**/*.js", "!" + "./wwwroot/GeneratedScripts/**/*.min.js"], { base: "." })
        .pipe(uglify())
        .pipe(rename(function (path)
        {
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest("."));
});


// https://www.npmjs.com/package/gulp-pretty-data
gulp.task("xml:min:each", function ()
{
    return gulp.src(["D:/username/Documents/Visual Studio 2017/TFS/COR-Basic-V4/Portal/Portal/images/logo/**/*.{xml,json,svg}", "!" + "D:/Stefan.Steiger/Documents/Visual Studio 2017/TFS/COR-Basic-V4/Portal/Portal/images/logo/**/*.min.{xml,json,svg}"], { base: "." })
        .pipe(endOfLineNormalizer(minimizerEndOfLineSettings))
        .pipe(replace('\n', ' '))
        .pipe(replace(/  +/g, ' '))
        .pipe(prettyData(minifyDataSettings))
        .pipe(rename(function (path)
        {
            path.extname = ".min" + path.extname;
        }))
        .pipe(gulp.dest("."));
});




gulp.task("css:min:all", function ()
{
    return gulp.src(["./wwwroot/app/**/*.css", "!" + "./wwwroot/app/**/*.min.css"
        , "./wwwroot/css/**/*.css", "!" + "./wwwroot/css/**/*.min.css"], { base: "." })
        .pipe(concat("./wwwroot/css/mysite.min.css"))
        .pipe(cssnano())
        .pipe(gulp.dest("."));
});


gulp.task("css:min:each", function ()
{
    return gulp.src(["./wwwroot/app/**/*.css", "!" + "./wwwroot/app/**/*.min.css"
        , "./wwwroot/css/**/*.css", "!" + "./wwwroot/css/**/*.min.css"
        , "./wwwroot/GeneratedScripts/**/*.css", "!" + "./wwwroot/GeneratedScripts/**/*.min.css"
    ], { base: "." })
        .pipe(cssnano())
        .pipe(rename(function (path)
        {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest("."))
        ;
});


gulp.task("css:beautify:each", function ()
{
    return gulp.src(["./wwwroot/app/**/*.css", "!" + "./wwwroot/app/**/*.min.css"
        , "./wwwroot/css/**/*.css", "!" + "./wwwroot/css/**/*.min.css"
        , "./wwwroot/GeneratedScripts/**/*.css", "!" + "./wwwroot/GeneratedScripts/**/*.min.css"
    ], { base: "." })
        .pipe(cssbeautify(cssbeautifyOptions))
        .pipe(endOfLineNormalizer(endOfLineSettings))
        .pipe(gulp.dest("."))
        ;
});


// https://www.npmjs.com/package/gulp-sass
// Maybe TODO: https://www.npmjs.com/package/gulp-watch
gulp.task('css:fromSASS', function ()
{
    return gulp.src('./SASS/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssbeautify(cssbeautifyOptions))

        //.pipe(gap.appendText('<!-- HEADER -->'))
        .pipe(gap.prependText('/* \r\n' + copyright + ' \r\n*/\r\n\r\n'))
        //.pipe(gap.appendText('<!-- FOOTER -->'))
        .pipe(gap.appendText('\r\n/* \r\n' + copyright + ' \r\n*/\r\n'))
        
        .pipe(endOfLineNormalizer(endOfLineSettings))
        .pipe(gulp.dest('./wwwroot/css'));
});


gulp.task('watch:sass', function ()
{
    gulp.watch('SASS/**/*.scss', ['css:fromSASS']);
});




// https://stackoverflow.com/questions/40573196/using-webpack-2-from-gulp-webpack-stream-for-webpack-2
// webpack.config.js: https://www.npmjs.com/package/webpack2-stream-watch
// https://www.npmjs.com/package/gulp-webpack
// https://www.npmjs.com/package/gulp-requirejs-bundler
// statically bundle file with require modules
gulp.task('js:bundle:require', function ()
{
    //return gulp.src('./wwwroot/GeneratedScripts/**/*.js') //, "!" + "./wwwroot/GeneratedScripts/**/*.bundle.js")
    // './wwwroot/GeneratedScripts/Salute.js', 
    return gulp.src('./wwwroot/GeneratedScripts/test.js') //, "!" + "./wwwroot/GeneratedScripts/**/*.bundle.js")
        .pipe(webpackStream({/* options such as require('./webpack.config.js') */ }, webpack))
        .pipe(jsbeautify(jsbeautifyOptions))
        .pipe(endOfLineNormalizer(endOfLineSettings))
        .pipe(uglify())
        //.pipe(rename(function (path)
        //{
        //    path.extname = ".bundle.js";
        //}))
        .pipe(rename("main.js"))
        .pipe(gulp.dest('wwwroot/dist/'));
});


gulp.task('css:SASS:minify', ['css:fromSASS', 'css:min:each'], function ()
{
    // Task that execute css:fromSASS and css:min:each
});


gulp.task('default', function () {
    // place code for your default task here
});
