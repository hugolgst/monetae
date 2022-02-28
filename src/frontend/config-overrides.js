const { removeModuleScopePlugin } = require('customize-cra')

module.exports = {
  webpack: function (config, env) {
    if (!config.plugins) {
      config.plugins = []
    }
    removeModuleScopePlugin()(config)
    
    return config
  },

  devServer: function (configFunction) {
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost)

      config.proxy = {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api',
          }, 
        }
      }

      return config
    }
  }
}