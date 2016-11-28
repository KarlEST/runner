import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from '../config/developer';

const srcPath = path.resolve(__dirname, '..', 'src');
const buildPath = path.resolve(__dirname, '..', 'build');

export default {
	devtool: config.devtool || 'source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://0.0.0.0:3000',
		'webpack/hot/dev-server',
		path.join(srcPath, 'index'),
	],
	output: {
		path: buildPath,
		pathinfo: true,
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			query: {
				plugins: [
					'react-hot-loader/babel',
				],
			},
			loader: 'babel-loader',
		}, {
			test: /\.scss/,
			loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap'],
			exclude: /node_modules/,
		}, {
			test: /\.(jpg|jpeg|gif|png|svg|woff|woff2)$/,
			loader: `url?limit=1000000000&name=[path][name].[ext]&context=${__dirname}`,
			exclude: /node_modules/,
		}],
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.join(srcPath, 'index.template.html'),
			favicon: path.join(srcPath, 'gfx/favicon.ico'),
		}),
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
		new webpack.HotModuleReplacementPlugin(),
	],
};
