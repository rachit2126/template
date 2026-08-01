/**
 * Universal Production-ready API Utility for Cutiepage
 * Always fetches fresh data from production Vercel Serverless Functions (/api/...) 
 * with no-store caching headers to prevent stale cache inconsistency.
 */

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return cleanEndpoint;
};

export const fetchApi = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache'
  };

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`[API Client] Success from ${url}:`, Array.isArray(data) ? `${data.length} items` : 'Object');
      return { success: true, data };
    } else {
      const errorText = await response.text();
      return { success: false, status: response.status, error: errorText };
    }
  } catch (error) {
    console.warn(`[API Client] Failed to fetch from ${url}:`, error.message);
    return { success: false, error: error.message };
  }
};
