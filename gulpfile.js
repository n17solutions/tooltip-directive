'use strict';

var _ 			= require('lodash'),
	gulp 		= require('gulp'),
	del 		= require('del'),
	path 		= require('path'),
	webpack 	= require('gulp-webpack-build'),
	runSequence = require('run-sequence'),
	app = {
		src: {
			js: './src/js',
			css: './src/css'
		},
		dist: {
			root: './dist',
			withoutFrameworks: './dist/no-frameworks',
			withFrameworks: './dist/inc-frameworks'
		},
		webpack: {
			options: {
				watchDelay: 200
			},
			config: {
				useMemoryFs: true,
				progress: true
			},
			format: {
				version: false,
				timings: true
			},
			failAfter: {
				errors: true,
				warnings: true
			},
			files: {
				production: './webpack.config-production.js',
				productionMin: './webpack.config-production.min.js',
				development: './webpack.config-development.js',
				developmentMin: './webpack.config-development.min.js'
			}
		}
	};

function buildWebpackOptions(mode) {
	switch (mode) {
		case "development":
			_.extend(app.webpack.options, {
				debug: true,
				devtool: '#source-map'
			});
			break;
	}
}

gulp.task('clean', function() {
	return del(app.dist.root);
});

gulp.task('build-production', [], function() {
	buildWebpackOptions('production');

	gulp.src(app.webpack.files.productionMin)
		.pipe(webpack.init(app.webpack.config))
		.pipe(webpack.props(app.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(app.webpack.format))
		.pipe(webpack.failAfter(app.webpack.failAfter))
		.pipe(gulp.dest(app.dist.withoutFrameworks));

	return gulp.src(app.webpack.files.production)
		.pipe(webpack.init(app.webpack.config))
		.pipe(webpack.props(app.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(app.webpack.format))
		.pipe(webpack.failAfter(app.webpack.failAfter))
		.pipe(gulp.dest(app.dist.withoutFrameworks));
});

gulp.task('build-production-inc-frameworks', [], function() {
	buildWebpackOptions('production');

	gulp.src(app.webpack.files.developmentMin)
		.pipe(webpack.init(app.webpack.config))
		.pipe(webpack.props(app.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(app.webpack.format))
		.pipe(webpack.failAfter(app.webpack.failAfter))
		.pipe(gulp.dest(app.dist.withFrameworks));

	return gulp.src(app.webpack.files.development)
		.pipe(webpack.init(app.webpack.config))
		.pipe(webpack.props(app.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(app.webpack.format))
		.pipe(webpack.failAfter(app.webpack.failAfter))
		.pipe(gulp.dest(app.dist.withFrameworks));
});

gulp.task('build-development', [], function() {
	buildWebpackOptions('development');

	return gulp.src(app.webpack.files.development)
		.pipe(webpack.init(app.webpack.config))
		.pipe(webpack.props(app.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(app.webpack.format))
		.pipe(webpack.failAfter(app.webpack.failAfter))
		.pipe(gulp.dest(app.dist.withFrameworks));
});

gulp.task('copy-css', [], function() {
	return gulp.src(app.src.css + '/*.css')
		.pipe(gulp.dest(app.dist.root));
});

gulp.task('production', [], function(cb) {
	runSequence('clean', 'build-production', 'build-production-inc-frameworks', 'copy-css', cb);
});