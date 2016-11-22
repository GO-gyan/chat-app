var path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: ['./client/client'],
	output: {
		path: path.resolve('./client/assets'),
		filename: 'bundle.js',
		publicPath: '/' 
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-1', 'react']
				}
			},
			{
  				test: /\.css$/,
  				loader: 'style!css?modules',
  				include: /flexboxgrid/
			}
		]
	},
	resolve: {
		extensions: ['.js','.jsx', 'index.js', 'index', '']
	}
}