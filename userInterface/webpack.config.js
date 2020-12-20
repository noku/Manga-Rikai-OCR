const CircularDependencyPlugin = require('circular-dependency-plugin')

// Webpack uses this to work with directories
const path = require('path');

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
const config = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './index.js',
  
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /dir/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],
  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file

  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'bundle.js'
  },


  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  mode: 'development'
};

module.exports = config