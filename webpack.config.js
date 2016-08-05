// import webpack from 'webpack';
// import path from 'path';
var webpack = require('webpack');
var path = require('path');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
	entry: ['./src/index.coffee'],
	output: {
		path: path.resolve('./dist'),
		filename: PROD ? 'please.min.js' : 'please.js'
	},
	module: {
		loaders: [
			{
				test: /\.coffee$/,
				loaders: ['coffee-loader']
			}
		]
	},
	plugins: PROD ? [new webpack.optimize.UglifyJsPlugin({
		compress: {warnings: false}
	})]: []
};