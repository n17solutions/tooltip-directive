'use strict';

var webpack 			= require('webpack'),
	ngAnnotatePlugin 	= require('ng-annotate-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: "n17-tooltip.min.js",
		library: "n17tooltip",
		libraryTarget: "umd"
	},
	externals: {
		angular: "angular",
		jquery: "jquery",
		qtip2: "qtip2"
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			jquery: "jquery"
		}),
		new ngAnnotatePlugin({
			add: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};