var gulp = require('gulp');
var server = require('gulp-webserver');
var devSass = require('gulp-sass');

// 起服务
gulp.task('server', function() {
	return gulp.src('./')
		.pipe(server({
			port: 9096,
			open: true,
			livereload: true,
			// proxies: [
				// {source:'', target:''},
			// ]
		}));
});

// 编译sass
gulp.task('devSass', function() {
	return gulp.src(['./scss/*.scss', '!./scss/common.scss'])
		.pipe(devSass())
		.pipe(gulp.dest('./css/'))
});

// 监听sass
gulp.task('watch',function() {
	return gulp.watch(['./scss/*.scss', '!./scss/common.scss'],gulp.series('devSass'));
});

// 开发命令
gulp.task('dev',gulp.parallel('watch','server'));