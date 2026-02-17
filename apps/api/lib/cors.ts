/**
 * CORS headers configuration for API routes
 * Allows the web app on port 3000 to access this API on port 3002
 */

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // In production, use specific origin like "http://localhost:3000"
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * Handle OPTIONS preflight requests
 */
export function handleOptions() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}
