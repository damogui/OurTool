var src='./src';
var dest='./build';
module.exports = {
	less:{
		 all: src + "/less/**/*.less",  //所有less  //需要编译的less  src: src + "/less/*.less", 
         src: [src + "/less/**/*.less",'!'+src+'/less/comm/**/*.less','!'+src+'/less/student/**/*.less'], 
         dest: dest + "/css", //输出目录
		 rev:dest+"/rev"
	},
	images:{
		src:src+"/img/**/*",
		dest:dest+"/img"
	},
	js:{
	    src: src + "/js/**/*",
	    js: [src + '/LUI/jquery-3.1.1.min.js', src + '/LUI/jquery.tmpl.min.js', src + '/LUI/waterbubble.js', src + '/zip/*.js'],
	    zepto:src+'/LUI/zepto.min.js',
		dest:dest+"/js",
		rev:dest+"/rev"
	},

	tpl:{
		src:src+"/tpl/**/*",
	},
	clean:{
		src:dest
	},

}