// Netlify serverless function for game statistics tracking
exports.handler = async function(event, context) {
  // Get request method and path
  const { httpMethod, path, queryStringParameters, body } = event;
  
  // Handle different API routes
  if (httpMethod === "GET") {
    // API status check
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Number Puzzle Game API",
        status: "running", 
        gameVersion: "1.0.0",
        timestamp: new Date().toISOString(),
        targetSequence: "80135606",
        info: "Use POST to /api/game-stats to submit completion statistics"
      }),
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    };
  } 
  else if (httpMethod === "POST" && body) {
    try {
      // For future implementation: store game completion stats
      // This could be connected to a database in the future
      const stats = JSON.parse(body);
      
      // Just log the stats for now and return success
      console.log("Game stats received:", stats);
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Game statistics recorded successfully",
          received: stats
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid request body" }),
        headers: {
          "Content-Type": "application/json"
        }
      };
    }
  }
  
  // Handle unsupported methods
  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
    headers: {
      "Content-Type": "application/json",
      "Allow": "GET, POST"
    }
  };
};