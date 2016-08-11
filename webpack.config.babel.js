import webpack from 'webpack';
import path from 'path';

let PROD = JSON.parse(process.env.PROD_ENV || '0');

export default {
	entry: ['./src/index.js'],
	devtool: 'source-map',
	output: {
		path: path.resolve('./dist'),
		filename: PROD ? 'please.min.js' : 'please.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {compact: true}
			}
		]
	},
	plugins: PROD ? [new webpack.optimize.UglifyJsPlugin({
		compress: {warnings: false}
	})]: []
};