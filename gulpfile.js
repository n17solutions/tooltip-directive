var gulp 		= require('gulp'),
	del			= require('del'),
	browserify 	= require('browserify'),
	derequire 	= require('gulp-derequire'),
	source 		= require('vinyl-source-stream'),
	concat		= require('gulp-concat'),
	uglify		= require('gulp-uglify'),
	rename 		= require('gulp-rename'),
	runSequence	= require('run-sequence');

var app = {
	src: {
		js: './src/js'
	},
	output: './output',
	dist: './dist'
};

gulp.task('clean', ['cleanOutput'], function() {
	return del(app.dist);
});

gulp.task('cleanOutput', function() {
	return(del(app.output));
});

gulp.task('browserify', function() {
	return browserify({
			entries: app.src.js + '/app.js',
			standalone: 'n17tooltip'
		})
		.require('angular')
		.bundle()
		.pipe(source('app.js'))
		.pipe(derequire())
		.pipe(gulp.dest(app.output));
});

gulp.task('package', function() {
	return gulp.src(app.output + '/*.js')
		.pipe(concat('n17-tooltip.js'))
		.pipe(gulp.dest(app.dist));
});

gulp.task('minify', function() {
	return gulp.src(app.dist + '/n17-tooltip.js')
		.pipe(uglify({
			options: {
				mangle: false
			}
		}))
		.pipe(rename(function(path) {
			path.extname = ".min.js";
		}))
		.pipe(gulp.dest(app.dist));
});

gulp.task('production', function(cb) {
	runSequence('clean', 'browserify', 'package', 'minify', 'cleanOutput', cb);
});