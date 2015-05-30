'use strict';

var webpack 			= require('webpack'),
	ngAnnotatePlugin 	= require('ng-annotate-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: "webpack.js",
		library: "MyLibrary",
		libraryTarget: "umd"
	},
	externals: {
		angular: "angular"
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