/**
 * CORS helper - returns appropriate CORS headers based on allowed origins
 */
export function getCorsHeaders(requestOrigin?: string): Record<string, string> {
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // In development, allow all origins to ease local testing
  if (process.env.NODE_ENV === "development") {
    return {
      "Access-Control-Allow-Origin": requestOrigin || "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PUT,PATCH,DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }

  if (allowed.length === 0) {
    // No allowed origins configured — default to same-origin only
    return {};
  }

  if (requestOrigin && allowed.includes(requestOrigin)) {
    return {
      "Access-Control-Allow-Origin": requestOrigin,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PUT,PATCH,DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }

  // Not allowed
  return {};
}
