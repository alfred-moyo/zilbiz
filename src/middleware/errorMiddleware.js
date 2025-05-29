const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message;
  
    res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode,
        message: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
      }
    });
  };
  
  const notFound = (req, res) => {
    res.status(404).json({
      success: false,
      error: {
        code: 404,
        message: 'Endpoint not found'
      }
    });
  };
  
  module.exports = { errorHandler, notFound };