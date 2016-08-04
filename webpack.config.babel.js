import webpack from 'webpack';
import path from 'path';

let PROD = JSON.parse(process.env.PROD_ENV || '0');

export default {
	entry: ['./src/main.coffee'],
	output: {
		path: path.resolve('./dist'),
		filename: PROD ? 'please.min.js' : 'please.js'
	},
	module: {
		loaders: [
			{
				test: /\.coffee$/,
				loaders: ['babel-loader','coffee-loader']
			}
		]
	},
	plugins: PROD ? [new webpack.optimize.UglifyJsPlugin({
		compress: {warnings: false}
	})]: []
};