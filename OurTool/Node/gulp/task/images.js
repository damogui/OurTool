var gulp=require('gulp');
var config=require('../config').images;
var minimage=require('gulp-imagemin');
gulp.task('images',function(){
	return gulp.src(config.src)
	.pipe(gulp.dest(config.dest))
});
gulp.task('minimage',function(){
	return gulp.src(config.src)
	.pipe(minimage())
	.pipe(gulp.dest(config.dest))
})
