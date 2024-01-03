module.exports = {
    apps: [
      {
        name: 'Tiingo Stock Data',
        script: 'tiingo.js', 
        //instances: 'max', // Or the number of instances you want to run
        autorestart: true,
        watch: false, // Set to true for development, false for production
        max_memory_restart: '1G',
        wait_ready: true,
        listen_timeout: 100000,
        env: {
          NODE_ENV: 'development', // Change to 'production' as needed
         // PORT: 3000 // Change to your application's port
        },
        env_production: {
          NODE_ENV: 'production',
          //PORT: 3000
        }
      }
      // Add more app configurations if needed
    ]
  };
  