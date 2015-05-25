var gulp 		= require('gulp'),
	browserify 	= require('browserify')
	source 		= require('vinyl-source-stream'),
	del			= require('del'),
	concat		= require('gulp-concat'),
	ngAnnotate 	= require('browserify-ngannotate'),
	uglify		= require('gulp-uglify'),
	runSequence = require('run-sequence');

gulp.task('clean', ['cleanOutput'], function() {
	return del([
		'./dist',
		'./templates/*.js']);
});

gulp.task('cleanOutput', function() {
	return del(['./output']);
});

gulp.task('browserify', function() {
	return browserify('./js/app.js', { 
			debug: true
		})
		.transform(ngAnnotate)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./output'));
});

gulp.task('package', function() {
	return gulp.src(['./output/*.js'])
		.pipe(concat('n17-tooltip.min.js'))
		.pipe(uglify({ options: { mangle: false } }))
		.pipe(gulp.dest('./dist'))
});

gulp.task('production', function(cb) {
	runSequence('clean', 'browserify', 'package', 'cleanOutput', cb);
});