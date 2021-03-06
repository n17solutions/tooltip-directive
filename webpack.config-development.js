'use strict';

var webpack 			= require('webpack'),
	ngAnnotatePlugin 	= require('ng-annotate-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: "n17-tooltip.js",
		library: "n17tooltip",
		libraryTarget: "umd"
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			jquery: "jquery"
		}),
		new ngAnnotatePlugin({
			add: true
		})
	]
};