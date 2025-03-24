// Simple Netlify serverless function for future game statistics tracking
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Number Puzzle Game API",
      status: "running", 
      gameVersion: "1.0.0",
      timestamp: new Date().toISOString()
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };
};