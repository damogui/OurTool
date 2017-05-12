var gulp=require('gulp');
var config=require('../config').js;
var webpackConfig = require('../../webpack.config');
var path = require('path');
var rev = require('gulp-rev');
var revFormat = require('gulp-rev-format');
var clean = require('gulp-clean');
/*var WebpackDevServer = require('webpack-dev-server');*/
var webpacks=require('webpack');
var handleErrors = require('../util/handleErrors');
gulp.task('js',["sui-mobile","dep",'zepto'], function () {
    // console.log(config.js)
    return gulp.src(config.js).pipe(gulp.dest(config.dest))
});
gulp.task('sui-mobile',function(){
    return gulp.src("./src/SUI-Mobile/**/*.*").pipe(gulp.dest('./build/dep/SUI-Mobile/'));
});
gulp.task('dep', function () {
   return gulp.src("./src/dep/**/*.*").pipe(gulp.dest('./build/dep/'));
});
gulp.task('zepto', function () {
    return gulp.src(config.zepto).pipe(gulp.dest('./build/js/'));
});
gulp.task('webpack', function () {
    return webpacks(webpackConfig,function(err, stats) {
               // console.log(stats.toString());
    })
});
gulp.task('minjs', function () {
    var min = new webpacks.optimize.UglifyJsPlugin({
        compress: { warnings: false },except: ['$super', '$', 'exports', 'require'],comments: false 
    })
    webpackConfig.devtool = null;
    webpackConfig.plugins.push(min);
    console.log(webpackConfig.plugins)
    webpacks(webpackConfig, function (err, stats) {
        //console.log(stats.toString());
        gulp.start("rev-js");
    });
    console.log("js ugify completed");


});
gulp.task('rev-js', function () {
    //版本化扫描生成后的js，生成对应MD5文件名
    gulp.src(path.join(config.dest, "/*/*.js"))
        .pipe(gulp.dest(config.dest)).pipe(clean()).pipe(rev())
        //.pipe(revFormat({  
        //    prefix: '.',  
        //    suffix: '.cache',
        //    lastExt: false  
        //}))  
        .pipe(gulp.dest(config.dest))
        .pipe(rev.manifest('js-rev.json'))
        .pipe(gulp.dest(config.rev));
});
