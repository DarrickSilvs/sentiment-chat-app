/* next.config.js */
    
import webpack from 'webpack';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// export default {
//   webpack: (config) => {
//     // Map environment variables for DefinePlugin
//     const env = Object.keys(process.env).reduce((acc, curr) => {
//       acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
//       return acc;
//     }, {});

//     // Add DefinePlugin to plugins
//     config.plugins.push(new webpack.DefinePlugin(env));

//     // Disable Webpack's filesystem cache
//     config.cache = {
//       type: 'memory',
//     };

//     // Adjust the devtool based on the environment
//     if (!dev) {
//       config.devtool = false; // Disable source maps in production
//     } else {
//       config.devtool = 'source-map'; // Use safer option in development
//     }

//     return config;
//   },  
// };

export default {
  webpack: (config, { isServer, dev }) => {
    // Map environment variables for DefinePlugin
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    // Add DefinePlugin to plugins
    config.plugins.push(new webpack.DefinePlugin(env));

    // Disable Webpack's filesystem cache
    config.cache = {
      type: 'memory',
    };

    // Adjust the devtool based on the environment
    if (!dev) {
      config.devtool = false; // Disable source maps in production
    } else {
      config.devtool = 'source-map'; // Use safer option in development
    }

    return config;
  },
};
