var gulp=require('gulp');
var gulpsync=require('gulp-sync')(gulp);
gulp.task('default',gulpsync.sync(['clean',['less','images','js','webpack'],'watch']));
gulp.task('package', gulpsync.sync(['clean', ['minless', 'minimage', 'js', 'minjs'],'rev-cshtml']));