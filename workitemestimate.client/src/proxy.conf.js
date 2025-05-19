const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7217';

const PROXY_CONFIG = [
  {
    "/planningPokerHub": {
      "target": "https://localhost:5001",
      "ws": true,
      "secure": false
    },
    "/api": {
      "target": "https://localhost:5001",
      "secure": false
    }
  }
]

module.exports = PROXY_CONFIG;
