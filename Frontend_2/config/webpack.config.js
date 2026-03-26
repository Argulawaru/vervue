const path = require('path');

module.exports = {
  mode: 'development', // Or 'production' for a production build
  entry: path.resolve(__dirname, 'src', 'index.js'), // Ensure this path is correct for your main entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    filename: 'bundle.js' // Name of the bundled JavaScript file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Apply babel-loader to .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules from transpilation
        use: ['babel-loader']
      },
      // You might need rules for CSS, images, etc., depending on your project.
      // Example for CSS (if you have .css files and import them):
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing these extensions without specifying them
    modules: [
      'node_modules', // Look for modules in node_modules
      path.resolve(__dirname, 'src') // Also look for modules in your src directory
    ],
    // THIS IS THE CRITICAL PART FOR THE ERROR FIX
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "fs": false // 'fs' is a Node.js filesystem module; it's typically not available or needed in a browser. Setting it to 'false' tells Webpack to ignore it.
    }
  },
  // If you are using webpack-dev-server (which 'npm start' often does), you might need this:
  // devServer: {
  //   contentBase: path.join(__dirname, 'public'), // Serve static files from 'public'
  //   compress: true,
  //   port: 3000, // Or your preferred port
  //   historyApiFallback: true, // For client-side routing like React Router
  // },
};