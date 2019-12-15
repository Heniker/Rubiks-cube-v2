const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const devtool = mode === 'development' ? 'source-map' : false;

  console.log(`mode: ${mode}`);

  return {
    mode,
    devtool,
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        {
          from: 'public/index.html',
        },
      ]),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@globals$': path.resolve(__dirname, 'src/globals.ts'),
      },
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
