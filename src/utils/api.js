/**
 * Universal Production-ready API Utility for Cutiepage
 * Always fetches from production Vercel Serverless Functions (/api/...) 
 * with robust fallback handling and CORS support.
 */

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return cleanEndpoint;
};

export const fetchApi = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorText = await response.text();
      return { success: false, status: response.status, error: errorText };
    }
  } catch (error) {
    console.warn(`[API] Failed to fetch from ${url}:`, error.message);
    return { success: false, error: error.message };
  }
};
