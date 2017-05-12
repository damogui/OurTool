var gulp=require('gulp');
var bom = require('gulp-bom');
var rev = require('gulp-rev');//css 文件名 md5
var revCollector = require('gulp-rev-collector'); //路径替换
var config=require("../config").less;
gulp.task("rev-cshtml", function () {
    console.log("rev-cshtml");
    gulp.src([config.rev+"/*.json", "../../../**/**/*.cshtml"])
        .pipe(revCollector()).pipe(bom())
        .pipe(gulp.dest("./build/version"));
});




