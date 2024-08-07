module.exports = {
    apps: [
      {
        name: 'nextjs-app',
        script: 'server.js',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  