var gulp 		= require('gulp'),
	browserify 	= require('browserify')
	source 		= require('vinyl-source-stream'),
	del			= require('del'),
	concat		= require('gulp-concat'),
	ngAnnotate 	= require('browserify-ngannotate'),
	uglify		= require('gulp-uglify'),
	rename 		= require('gulp-rename'),
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
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./output'));
});

gulp.task('package', function() {
	return gulp.src(['./output/*.js'])
		.pipe(concat('n17-tooltip.js'))
		.pipe(gulp.dest('./dist'))
});

gulp.task('minify', function() {
	return gulp.src('./dist/n17-tooltip.js')
		.pipe(uglify({
			options: {
				mangle: false
			}
		}))
		.pipe(rename(function(path) {
			path.extname = ".min.js"
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('production', function(cb) {
	runSequence('clean', 'browserify', 'package', 'minify', 'cleanOutput', cb);
});