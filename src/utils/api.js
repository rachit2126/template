/**
 * Universal Production-ready API Utility for Cutiepage
 * Always fetches fresh data from production Vercel Serverless Functions (/api/...) 
 * with no-store caching headers and 5-second AbortController timeout.
 */

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return cleanEndpoint;
};

export const fetchApi = async (endpoint, options = {}, timeoutMs = 5000) => {
  const url = getApiUrl(endpoint);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache'
  };

  console.log(`[API Request] URL: ${url} Method: ${options.method || 'GET'} Payload:`, options.body);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    clearTimeout(timeoutId);
    console.log(`[API Response Status] ${url} -> ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`[API Response Body] Success from ${url}:`, data);
      return { success: true, status: response.status, data };
    } else {
      const errorText = await response.text();
      console.warn(`[API Response Error] ${url} (${response.status}):`, errorText);
      return { success: false, status: response.status, error: errorText };
    }
  } catch (error) {
    clearTimeout(timeoutId);
    const isTimeout = error.name === 'AbortError';
    const errorMsg = isTimeout ? 'Request timeout (5s limit exceeded)' : error.message;
    console.warn(`[API Client Catch] ${url} error:`, errorMsg);
    return { success: false, error: errorMsg };
  }
};
