const path = require('path');


module.exports = (env, argv) => {
	const mode = argv.mode || 'development'
	const devtool = mode === 'development' ? 'source-map' : false

	console.log(`mode: ${mode}`)

	return {
		mode,
		devtool,
		entry: './src/ts/index.ts',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist')
		}
	}
}