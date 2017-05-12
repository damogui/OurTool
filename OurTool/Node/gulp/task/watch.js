var gulp=require('gulp');
var watch=require('gulp-watch');
var config=require('../config');

gulp.task('watch',function(){
	watch(config.less.all,function(){
		gulp.start('less');
	})
	watch(config.images.src,function(){
		gulp.start('images');
	})
	watch(config.js.src,function(){
		gulp.start('webpack');
	})
	watch(config.tpl.src,function(){
		gulp.start('webpack');
	})
})
