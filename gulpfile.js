'use strict';

var gulp 		= require('gulp'),
	del 		= require('del'),
	path 		= require('path'),
	webpack 	= require('gulp-webpack-build'),
	runSequence = require('run-sequence'),
	app = {
		src: {
			js: './src/js',
			css: './src/css'
		},
		output: './output',
		dist: './dist',
		webpack: {
			options: {
				debug: true,
				devtool: '#source-map',
				watchDelay: 200
			},
			config: {
				useMemoryFs: true,
				progress: true
			},
			files: {
				production: './webpack.config-production.js'
			}
		}
	};

gulp.task('clean', function() {
	return del(app.dist);
});

gulp.task('build-production', [], function() {
	return gulp.src(app.webpack.files.production)
		.pipe(webpack.init(app.webpack.config))
		.pipe(webpack.props(app.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format({
			version: false,
			timings: true
		}))
		.pipe(webpack.failAfter({
			errors: true,
			warnings: true
		}))
		.pipe(gulp.dest(app.dist));
});

gulp.task('copy-css', [], function() {
	return gulp.src(app.src.css + '/*.css')
		.pipe(gulp.dest(app.dist));
});

//gulp.task('production', ['webpack', 'copy-css']);
gulp.task('production', [], function(cb) {
	runSequence('clean', 'build-production', 'copy-css', cb);
});