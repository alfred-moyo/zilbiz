const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(
  path.join(__dirname, '../logs/requests.log'), 
  { flags: 'a' }
);

const requestLogger = (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    ...(req.user && { userId: req.user._id })
  };

  logStream.write(JSON.stringify(logData) + '\n');
  next();
};

module.exports = requestLogger;